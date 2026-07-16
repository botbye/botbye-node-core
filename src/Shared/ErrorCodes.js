"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classifyRequestError = exports.SDK_ERROR = exports.JSON_ERROR = exports.CONNECTION_ERROR = exports.TIMEOUT_ERROR = exports.UNKNOWN_ERROR = void 0;
var Utils_1 = require("./Global/Utils");
var Constants_1 = require("./Http/Constants");
var UNKNOWN_ERROR = "unknown error";
exports.UNKNOWN_ERROR = UNKNOWN_ERROR;
var TIMEOUT_ERROR = "timeout";
exports.TIMEOUT_ERROR = TIMEOUT_ERROR;
var CONNECTION_ERROR = "connection error";
exports.CONNECTION_ERROR = CONNECTION_ERROR;
var JSON_ERROR = "invalid json response";
exports.JSON_ERROR = JSON_ERROR;
var SDK_ERROR = "SDK error";
exports.SDK_ERROR = SDK_ERROR;
var extractErrorMessage = function (e) {
    if ((0, Utils_1.isString)(e)) {
        return e;
    }
    if (e instanceof Error) {
        return e.message;
    }
    return "UNKNOWN";
};
var classifyRequestError = function (e) {
    var message = extractErrorMessage(e);
    if (message.includes(Constants_1.REQUEST_TIMEOUT_ERROR_CODE)) {
        return TIMEOUT_ERROR;
    }
    if (message.includes(Constants_1.REQUEST_ERROR_CODE)) {
        return CONNECTION_ERROR;
    }
    return UNKNOWN_ERROR;
};
exports.classifyRequestError = classifyRequestError;
