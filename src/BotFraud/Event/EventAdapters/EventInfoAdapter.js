"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adaptEventInfo = exports.FALLBACK_EVENT_EVENT_INFO = void 0;
var Utils_1 = require("../../../Shared/Global/Utils");
var Types_1 = require("../Types");
var Utils_2 = require("../Utils");
var FALLBACK_EVENT_EVENT_INFO_STATUS = "UNKNOWN";
var FALLBACK_EVENT_EVENT_INFO_TYPE = "UNKNOWN";
var FALLBACK_EVENT_EVENT_INFO = {
    type: FALLBACK_EVENT_EVENT_INFO_TYPE,
    status: FALLBACK_EVENT_EVENT_INFO_STATUS,
};
exports.FALLBACK_EVENT_EVENT_INFO = FALLBACK_EVENT_EVENT_INFO;
var eventInfoStatusNormalizer = function (v, global) {
    var stringValue = (0, Utils_1.toString)(v).trim().toUpperCase();
    if (Types_1.EVENT_INFO_EVENT_STATUSES.includes(stringValue)) {
        return stringValue;
    }
    global.logger.warn("Event status should be one of: ".concat(Types_1.EVENT_INFO_EVENT_STATUSES.join(" || ")));
    return FALLBACK_EVENT_EVENT_INFO_STATUS;
};
var adaptEventInfo = function (baseEventInfo, global) {
    var rowEventInfo = (0, Utils_1.isPlainObject)(baseEventInfo) ? baseEventInfo : {};
    var adaptedEventInfo = {};
    (0, Utils_2.fieldRequiredLog)(rowEventInfo, global.logger, "type", "evaluateEvent.event");
    (0, Utils_2.fieldRequiredLog)(rowEventInfo, global.logger, "status", "evaluateEvent.event");
    (0, Utils_2.sanitize)(rowEventInfo, adaptedEventInfo, "type", "type", Utils_1.toString, global, FALLBACK_EVENT_EVENT_INFO_TYPE);
    (0, Utils_2.sanitizeIfTruthy)(rowEventInfo, adaptedEventInfo, "status", "status", eventInfoStatusNormalizer, global, FALLBACK_EVENT_EVENT_INFO_STATUS);
    return adaptedEventInfo;
};
exports.adaptEventInfo = adaptEventInfo;
