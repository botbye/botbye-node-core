"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adaptEvent = void 0;
var Utils_1 = require("../../Shared/Global/Utils");
var Types_1 = require("./Types");
var Utils_2 = require("./Utils");
var RequestInfoAdapter_1 = require("./EventAdapters/RequestInfoAdapter");
var EventInfoAdapter_1 = require("./EventAdapters/EventInfoAdapter");
var UserInfoAdapter_1 = require("./EventAdapters/UserInfoAdapter");
var CustomFieldsAdapter_1 = require("./EventAdapters/CustomFieldsAdapter");
var adaptEvent = function (baseEvent, global) {
    var row = (0, Utils_1.isPlainObject)(baseEvent) ? baseEvent : {};
    var adaptedEvent = {};
    var eventType = String(row["type"]).trim().toLowerCase();
    if (!Types_1.EVENT_VALIDATION_TYPE.includes(eventType)) {
        global.logger.warn("Event type should be one of: ".concat(Types_1.EVENT_VALIDATION_TYPE.join(" || ")));
        eventType = "validate";
    }
    adaptedEvent.type = eventType;
    if (eventType === "validate") {
        (0, Utils_2.fieldRequiredLog)(row, global.logger, "request", "validate event");
        (0, Utils_2.sanitize)(row, adaptedEvent, "request", "request", RequestInfoAdapter_1.adaptRequestInfoWithRequiredHeaders, global, RequestInfoAdapter_1.FALLBACK_EVENT_REQUEST_INFO);
        (0, Utils_2.sanitizeIfNotNil)(row, adaptedEvent, "customFields", "custom_fields", CustomFieldsAdapter_1.adaptCustomFields, global);
    }
    if (eventType === "full" || eventType === "risk") {
        (0, Utils_2.fieldRequiredLog)(row, global.logger, "request", "".concat(eventType, " event"));
        (0, Utils_2.fieldRequiredLog)(row, global.logger, "event", "".concat(eventType, " event"));
        (0, Utils_2.fieldRequiredLog)(row, global.logger, "user", "".concat(eventType, " event"));
        var requestAdapter = eventType === "risk" ? RequestInfoAdapter_1.adaptRequestInfoWithOptionalHeaders : RequestInfoAdapter_1.adaptRequestInfoWithRequiredHeaders;
        (0, Utils_2.sanitize)(row, adaptedEvent, "request", "request", requestAdapter, global, RequestInfoAdapter_1.FALLBACK_EVENT_REQUEST_INFO);
        (0, Utils_2.sanitize)(row, adaptedEvent, "event", "event", EventInfoAdapter_1.adaptEventInfo, global, EventInfoAdapter_1.FALLBACK_EVENT_EVENT_INFO);
        (0, Utils_2.sanitize)(row, adaptedEvent, "user", "user", UserInfoAdapter_1.adaptUserInfo, global, UserInfoAdapter_1.FALLBACK_EVENT_USER_INFO);
        (0, Utils_2.sanitizeIfNotNil)(row, adaptedEvent, "customFields", "custom_fields", CustomFieldsAdapter_1.adaptCustomFields, global);
    }
    if (eventType === "risk") {
        (0, Utils_2.sanitizeIfNotNil)(row, adaptedEvent, "botbyeResult", "botbye_result", Utils_1.toString, global);
    }
    return adaptedEvent;
};
exports.adaptEvent = adaptEvent;
