"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adaptEvaluateConfig = exports.FALLBACK_EVENT_EVALUATE_CONFIG = void 0;
var Utils_1 = require("../../Global/Utils");
var Utils_2 = require("../Utils");
var FALLBACK_EVENT_EVALUATE_CONFIG = {};
exports.FALLBACK_EVENT_EVALUATE_CONFIG = FALLBACK_EVENT_EVALUATE_CONFIG;
var toBoolean = function (value) { return Boolean(value); };
var adaptEvaluateConfig = function (baseConfig, global) {
    if (!(0, Utils_1.isPlainObject)(baseConfig)) {
        return FALLBACK_EVENT_EVALUATE_CONFIG;
    }
    var adaptedConfig = {};
    (0, Utils_2.sanitizeIfNotNil)(baseConfig, adaptedConfig, "bypassBotValidation", "bypass_bot_validation", toBoolean, global);
    return adaptedConfig;
};
exports.adaptEvaluateConfig = adaptEvaluateConfig;
