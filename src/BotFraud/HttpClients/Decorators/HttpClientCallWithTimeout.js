"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpClientCallWithTimeout = void 0;
var Utils_1 = require("../../../Shared/Global/Utils");
var Constants_1 = require("../../../Shared/Http/Constants");
var Constants_2 = require("../Constants");
var httpClientCallWithTimeout = function (callResult, global, timeoutMs, meta) {
    if (timeoutMs === void 0) { timeoutMs = Constants_2.BASE_REQUEST_TIMEOUT; }
    var result = (0, Utils_1.withTimeout)(callResult.result, timeoutMs, Constants_1.REQUEST_TIMEOUT_ERROR_CODE).catch(function (reason) {
        var _a;
        if (reason === Constants_1.REQUEST_TIMEOUT_ERROR_CODE) {
            global.logger.debug("The request ".concat((_a = meta === null || meta === void 0 ? void 0 : meta.name) !== null && _a !== void 0 ? _a : "", " was interrupted by a timeout"));
            callResult.abort();
        }
        throw reason;
    });
    return {
        result: result,
        abort: callResult.abort,
    };
};
exports.httpClientCallWithTimeout = httpClientCallWithTimeout;
