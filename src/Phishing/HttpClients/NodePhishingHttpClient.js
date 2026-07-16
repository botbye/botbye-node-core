"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodePhishingHttpClient = void 0;
var http = __importStar(require("http"));
var https = __importStar(require("https"));
var Utils_1 = require("../../Shared/Global/Utils");
var Constants_1 = require("../../Shared/Http/Constants");
var Utils_2 = require("../../Shared/Http/Utils");
var httpsKeepAliveAgent = new https.Agent({ keepAlive: true });
var httpKeepAliveAgent = new http.Agent({ keepAlive: true });
var normalizeHeaders = function (raw) {
    var headers = {};
    Object.keys(raw).forEach(function (key) {
        var value = raw[key];
        if (Array.isArray(value)) {
            headers[key] = value.join(", ");
        }
        else if (value !== undefined) {
            headers[key] = value;
        }
    });
    return headers;
};
var nodePhishingHttpClient = {
    type: "nodePhishingHttpClient",
    call: function (baseUrl, init) {
        var activeRequest = null;
        var aborted = false;
        var abort = function () {
            aborted = true;
            if (activeRequest && !activeRequest.destroyed) {
                activeRequest.destroy(new Error(Constants_1.REQUEST_ERROR_CODE));
            }
        };
        var result = new Promise(function (resolve, reject) {
            var url = new URL(baseUrl);
            var isHttps = url.protocol === "https:";
            var transport = isHttps ? https : http;
            var requestOptions = {
                hostname: url.hostname,
                port: url.port || undefined,
                path: url.pathname + url.search,
                method: init.method,
                headers: init.headers,
                agent: isHttps ? httpsKeepAliveAgent : httpKeepAliveAgent,
            };
            var attempt = function (retriesLeft) {
                var request = transport.request(requestOptions, function (response) {
                    var chunks = [];
                    response.on("data", function (chunk) {
                        chunks.push(chunk);
                    });
                    response.on("end", function () {
                        var _a;
                        resolve({
                            status: (_a = response.statusCode) !== null && _a !== void 0 ? _a : 0,
                            headers: normalizeHeaders(response.headers),
                            body: new Uint8Array(Buffer.concat(chunks)),
                        });
                    });
                    response.on("error", function (e) {
                        reject(new Error("".concat(Constants_1.REQUEST_ERROR_CODE, " ").concat((0, Utils_1.extractMessageFromError)(e))));
                    });
                });
                request.on("error", function (e) {
                    if (!aborted && retriesLeft > 0) {
                        attempt(retriesLeft - 1);
                        return;
                    }
                    reject(new Error("".concat(Constants_1.REQUEST_ERROR_CODE, " ").concat((0, Utils_1.extractMessageFromError)(e))));
                });
                activeRequest = request;
                request.end((0, Utils_2.bodyToJson)(init.body));
            };
            attempt(1);
        });
        return {
            result: result,
            abort: abort,
        };
    },
};
exports.nodePhishingHttpClient = nodePhishingHttpClient;
