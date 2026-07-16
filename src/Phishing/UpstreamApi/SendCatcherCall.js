"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPhishingCatcherCall = void 0;
var Utils_1 = require("../../Shared/Global/Utils");
var Constants_1 = require("../../Shared/Http/Constants");
var ErrorCodes_1 = require("../../Shared/ErrorCodes");
var Constants_2 = require("../Constants");
var getHeaderValue = function (headers, header) {
    var _a;
    var value = (_a = headers[header]) !== null && _a !== void 0 ? _a : headers[header.toLowerCase()];
    if (!(0, Utils_1.isString)(value)) {
        return null;
    }
    var trimmed = value.trim();
    if (trimmed === "" || trimmed.toLowerCase() === "null") {
        return null;
    }
    return trimmed;
};
var buildHeaders = function (global, options) {
    var _a;
    var base = (0, Utils_1.getModuleHeaders)(global);
    var incoming = (_a = options.headers) !== null && _a !== void 0 ? _a : {};
    var origin = getHeaderValue(incoming, "Origin");
    var referrer = getHeaderValue(incoming, "Referer");
    if (origin) {
        base["Origin"] = origin;
    }
    if (referrer) {
        base["Referer"] = referrer;
    }
    return base;
};
var sendPhishingCatcherCall = function (global, options) {
    var _a, _b;
    var base = new URL("".concat(global.url, "/api/v1/phishing/image/").concat(encodeURIComponent(global.clientKey), "/server"));
    base.searchParams.set("format", options.format);
    if (options.format === "svg") {
        base.searchParams.set("image_id", options.innerPngUrl);
    }
    var _c = global.httpClient.call(base.toString(), {
        method: "GET",
        headers: buildHeaders(global, options),
    }), result = _c.result, abort = _c.abort;
    return (0, Utils_1.withTimeout)(result, (_b = (_a = global.timeouts) === null || _a === void 0 ? void 0 : _a.fetchCatcher) !== null && _b !== void 0 ? _b : Constants_2.PHISHING_REQUEST_TIMEOUT, Constants_1.REQUEST_TIMEOUT_ERROR_CODE).catch(function (e) {
        if (e === Constants_1.REQUEST_TIMEOUT_ERROR_CODE) {
            abort();
        }
        var errorCode = (0, ErrorCodes_1.classifyRequestError)(e);
        global.logger.warn("Phishing catcher fetch failed: ".concat(errorCode));
        return {
            status: (0, Constants_2.phishingErrorStatus)(errorCode),
            headers: {},
            body: new Uint8Array(0),
            error: { message: errorCode },
        };
    });
};
exports.sendPhishingCatcherCall = sendPhishingCatcherCall;
