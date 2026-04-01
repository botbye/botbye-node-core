"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initPackageInfo = initPackageInfo;
exports.init = init;
exports.validateRequest = validateRequest;
var https = require("https");
var SERVER_KEY = null;
var PACKAGE_INFO = {
    name: "NODE_CORE",
    version: "1.0.8",
};
var requestHeaders = {};
requestHeaders["Module-Name"] = PACKAGE_INFO.name;
requestHeaders["Module-Version"] = PACKAGE_INFO.version;
function initPackageInfo(packageInfo) {
    PACKAGE_INFO.name = packageInfo.name;
    PACKAGE_INFO.version = packageInfo.version;
    requestHeaders["Module-Name"] = PACKAGE_INFO.name;
    requestHeaders["Module-Version"] = PACKAGE_INFO.version;
}
function getNetworkErrorResponse(message) {
    return {
        reqId: "00000000-0000-0000-0000-000000000000",
        result: {
            isAllowed: true,
        },
        error: {
            message: "[BotBye] " + message,
        },
    };
}
function makeRequest(options, requestData, apiOptions) {
    apiOptions = apiOptions || {};
    return new Promise(function (resolve, reject) {
        var settled = false;
        function safeResolve(value) {
            if (!settled) {
                settled = true;
                resolve(value);
            }
        }
        function safeReject(reason) {
            if (!settled) {
                settled = true;
                reject(reason);
            }
        }
        var request = https.request(options, function (response) {
            var data = "";
            if (apiOptions.encoding) {
                response.setEncoding(apiOptions.encoding);
            }
            response.on("data", function (chunk) {
                apiOptions.onData && apiOptions.onData(chunk);
                data += chunk;
            });
            response.on("end", function () {
                safeResolve(data);
            });
        });
        request.on("error", function (e) {
            safeReject(e);
        });
        request.on("close", function () {
            safeReject(new Error("Connection closed"));
        });
        if (requestData) {
            request.write(requestData);
        }
        request.end();
        apiOptions.addAbortCb && apiOptions.addAbortCb(function () {
            if (!request.destroyed) {
                request.destroy();
            }
        });
    });
}
var url = "verify.botbye.com";
var validatePath = "/validate-request/v2";
function sendInitCall(serverKey) {
    var callOptions = {
        hostname: url,
        path: "/init-request/v1",
        method: "POST",
        headers: requestHeaders
    };
    var postData = JSON.stringify({
        serverKey: serverKey,
    });
    void makeRequest(callOptions, postData);
}
function init(options) {
    SERVER_KEY = options.serverKey;
    sendInitCall(SERVER_KEY);
    return validateRequest;
}
var keepAliveAgent = new https.Agent({
    keepAlive: true,
});
function validateRequest(options) {
    if (SERVER_KEY === null) {
        return Promise.reject(new Error("[BotBye] Init script wasn't called"));
    }
    var requestData = JSON.stringify({
        request_info: options.requestInfo,
        headers: options.headers,
        server_key: SERVER_KEY,
        token: options.token,
        custom_fields: options.customFields || {},
    });
    return new Promise(function (resolve) {
        var requestOptions = {
            hostname: url,
            path: validatePath + "?" + encodeURI(options.token || ""),
            method: "POST",
            headers: requestHeaders,
            agent: keepAliveAgent,
        };
        var abortCbs = [];
        var timer = setTimeout(function () {
            resolve(getNetworkErrorResponse("Connection timeout"));
            abortCbs.forEach(function (cb) {
                cb();
            });
        }, 300);
        makeRequest(requestOptions, requestData, {
            onData: function () {
                clearTimeout(timer);
            },
            addAbortCb: function (cb) {
                abortCbs.push(cb);
            },
        }).then(function (data) {
            clearTimeout(timer);
            try {
                resolve(JSON.parse(data));
            }
            catch (e) {
                var message = "";
                if (e instanceof Error) {
                    message = e.message;
                }
                resolve(getNetworkErrorResponse(message));
            }
        }).catch(function (e) {
            clearTimeout(timer);
            resolve(getNetworkErrorResponse((e === null || e === void 0 ? void 0 : e.message) || "Unexpected error"));
        });
    });
}

