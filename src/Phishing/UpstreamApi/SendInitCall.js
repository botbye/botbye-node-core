"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPhishingInitCall = void 0;
var ErrorCodes_1 = require("../../Shared/ErrorCodes");
var Utils_1 = require("../../Shared/Global/Utils");
var sendPhishingInitCall = function (_a) {
    var global = _a.global;
    var _b = global.httpClient.call(global.url + "/api/v1/phishing/init-request/v1/".concat(encodeURIComponent(global.clientKey)), {
        method: "POST",
        headers: (0, Utils_1.getModuleHeaders)(global),
    }), result = _b.result, abort = _b.abort;
    result
        .then(function (response) {
        if (response.status < 200 || response.status >= 300) {
            global.logger.warn("phishing init-request returned HTTP ".concat(response.status));
        }
    })
        .catch(function (e) {
        global.logger.warn("phishing init-request failed: ".concat((0, ErrorCodes_1.classifyRequestError)(e)));
    });
    return {
        result: result,
        abort: abort,
    };
};
exports.sendPhishingInitCall = sendPhishingInitCall;
