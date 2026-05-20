"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adaptUserInfo = exports.FALLBACK_EVENT_USER_INFO = void 0;
var Utils_1 = require("../../Global/Utils");
var Utils_2 = require("../Utils");
var FALLBACK_EVENT_USER_INFO_ACCOUNT_ID = "00000000-0000-0000-0000-000000000000";
var FALLBACK_EVENT_USER_INFO = {
    account_id: FALLBACK_EVENT_USER_INFO_ACCOUNT_ID,
};
exports.FALLBACK_EVENT_USER_INFO = FALLBACK_EVENT_USER_INFO;
var adaptUserInfo = function (baseUserInfo, global) {
    var row = (0, Utils_1.isPlainObject)(baseUserInfo) ? baseUserInfo : {};
    var adaptedUserInfo = {};
    (0, Utils_2.fieldRequiredLog)(row, global.logger, "accountId", "evaluateEvent.user");
    (0, Utils_2.sanitizeIfTruthy)(row, adaptedUserInfo, "accountId", "account_id", Utils_1.toString, global, FALLBACK_EVENT_USER_INFO_ACCOUNT_ID);
    (0, Utils_2.sanitizeIfNotNil)(row, adaptedUserInfo, "username", "username", Utils_1.toString, global);
    (0, Utils_2.sanitizeIfNotNil)(row, adaptedUserInfo, "email", "email", Utils_1.toString, global);
    (0, Utils_2.sanitizeIfNotNil)(row, adaptedUserInfo, "phone", "phone", Utils_1.toString, global);
    return adaptedUserInfo;
};
exports.adaptUserInfo = adaptUserInfo;
