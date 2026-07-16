"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adaptRequestInfoWithOptionalHeaders = exports.adaptRequestInfoWithRequiredHeaders = exports.FALLBACK_EVENT_REQUEST_INFO = void 0;
var Utils_1 = require("../../../Shared/Global/Utils");
var Utils_2 = require("../Utils");
var FALLBACK_EVENT_REQUEST_INFO_IP = "0.0.0.0";
var FALLBACK_EVENT_REQUEST_INFO_HEADERS = {};
var FALLBACK_EVENT_REQUEST_INFO = {
    ip: FALLBACK_EVENT_REQUEST_INFO_IP,
    headers: FALLBACK_EVENT_REQUEST_INFO_HEADERS,
};
exports.FALLBACK_EVENT_REQUEST_INFO = FALLBACK_EVENT_REQUEST_INFO;
var adaptHeaders = function (headers) {
    if (!(0, Utils_1.isPlainObject)(headers)) {
        return FALLBACK_EVENT_REQUEST_INFO_HEADERS;
    }
    var adaptedHeaders = {};
    for (var _i = 0, _a = Object.keys(headers); _i < _a.length; _i++) {
        var key = _a[_i];
        adaptedHeaders[key] = (0, Utils_1.toString)(headers[key]);
    }
    return adaptedHeaders;
};
var adaptRequestInfoFactory = function (isHeadersNeeded) {
    return function (baseRequestInfo, global) {
        var row = (0, Utils_1.isPlainObject)(baseRequestInfo) ? baseRequestInfo : {};
        var adaptedRequestInfo = {};
        (0, Utils_2.fieldRequiredLog)(row, global.logger, "ip", "evaluateEvent.request");
        if (isHeadersNeeded) {
            (0, Utils_2.fieldRequiredLog)(row, global.logger, "headers", "evaluateEvent.request");
        }
        (0, Utils_2.sanitizeIfTruthy)(row, adaptedRequestInfo, "ip", "ip", Utils_1.toString, global, FALLBACK_EVENT_REQUEST_INFO_IP);
        (0, Utils_2.sanitizeIfNotNil)(row, adaptedRequestInfo, "token", "token", Utils_1.toString, global);
        (0, Utils_2.sanitizeIfPlainObject)(row, adaptedRequestInfo, "headers", "headers", adaptHeaders, global, {});
        (0, Utils_2.sanitizeIfNotNil)(row, adaptedRequestInfo, "requestMethod", "request_method", Utils_1.toString, global);
        (0, Utils_2.sanitizeIfNotNil)(row, adaptedRequestInfo, "requestUri", "request_uri", Utils_1.toString, global);
        return adaptedRequestInfo;
    };
};
var adaptRequestInfoWithRequiredHeaders = adaptRequestInfoFactory(true);
exports.adaptRequestInfoWithRequiredHeaders = adaptRequestInfoWithRequiredHeaders;
var adaptRequestInfoWithOptionalHeaders = adaptRequestInfoFactory(false);
exports.adaptRequestInfoWithOptionalHeaders = adaptRequestInfoWithOptionalHeaders;
