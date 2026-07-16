"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.phishingErrorStatus = exports.PHISHING_REQUEST_TIMEOUT = exports.DEFAULT_PHISHING_ENDPOINT = void 0;
var ErrorCodes_1 = require("../Shared/ErrorCodes");
var DEFAULT_PHISHING_ENDPOINT = "https://verify.botbye.com";
exports.DEFAULT_PHISHING_ENDPOINT = DEFAULT_PHISHING_ENDPOINT;
var PHISHING_REQUEST_TIMEOUT = 5000;
exports.PHISHING_REQUEST_TIMEOUT = PHISHING_REQUEST_TIMEOUT;
var PHISHING_GATEWAY_TIMEOUT_STATUS = 504;
var PHISHING_BAD_GATEWAY_STATUS = 502;
var phishingErrorStatus = function (errorCode) {
    return errorCode === ErrorCodes_1.TIMEOUT_ERROR ? PHISHING_GATEWAY_TIMEOUT_STATUS : PHISHING_BAD_GATEWAY_STATUS;
};
exports.phishingErrorStatus = phishingErrorStatus;
