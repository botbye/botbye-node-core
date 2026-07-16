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
exports.nodeHttpClient = void 0;
var http = __importStar(require("http"));
var https = __importStar(require("https"));
var Utils_1 = require("../../../../Shared/Global/Utils");
var Constants_1 = require("../../../../Shared/Http/Constants");
var Utils_2 = require("../../../../Shared/Http/Utils");
var keepAliveAgent = new https.Agent({
    keepAlive: true,
});
var nodeHttpClient = {
    type: "nodeHttpClient",
    call: function (baseUrl, init) {
        var abort = function () { return void 0; };
        var result = new Promise(function (resolve, reject) {
            var url = new URL(baseUrl);
            var body = (0, Utils_2.bodyToJson)(init.body);
            var transport = url.protocol === "https:" ? https : http;
            var requestOptions = {
                hostname: url.hostname,
                port: url.port || undefined,
                path: url.pathname + url.search,
                method: init.method,
                headers: init.headers,
                agent: init.keepalive ? keepAliveAgent : undefined,
            };
            var request = transport.request(requestOptions, function (response) {
                var data = "";
                if (response.statusCode !== 200) {
                    reject(new Error(Constants_1.REQUEST_ERROR_CODE));
                    response.resume();
                    return;
                }
                response.on("data", function (chunk) {
                    data += chunk;
                });
                response.on("end", function () {
                    resolve(data);
                });
                response.on("error", function (e) {
                    reject(new Error("".concat(Constants_1.REQUEST_ERROR_CODE, " ").concat((0, Utils_1.extractMessageFromError)(e))));
                });
            });
            request.on("error", function () {
                reject(new Error(Constants_1.REQUEST_ERROR_CODE));
            });
            request.end(body);
            abort = function () {
                if (!request.destroyed) {
                    request.destroy(new Error(Constants_1.REQUEST_ERROR_CODE));
                }
            };
        });
        return ({
            abort: abort,
            result: result,
        });
    },
};
exports.nodeHttpClient = nodeHttpClient;
