"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggerValid = exports.isLoggerLevelValid = exports.isTimeoutsValid = exports.assertInitOptions = void 0;
var Utils_1 = require("../Global/Utils");
var Types_1 = require("../Logger/Types");
var isLoggerValid = function (logger) {
    if (!(0, Utils_1.isPlainObject)(logger)) {
        return false;
    }
    return Types_1.LOGGER_LEVELS.every(function (level) { return typeof logger[level] === "function"; });
};
exports.isLoggerValid = isLoggerValid;
var isTimeoutsValid = function (timeouts) {
    if (!(0, Utils_1.isPlainObject)(timeouts)) {
        return false;
    }
    if ("evaluate" in timeouts && !(0, Utils_1.isNumber)(timeouts.evaluate)) {
        return false;
    }
    return true;
};
exports.isTimeoutsValid = isTimeoutsValid;
var isLoggerLevelValid = function (level) {
    if (!(0, Utils_1.isString)(level)) {
        return false;
    }
    return Types_1.LOGGER_LEVELS.includes(level);
};
exports.isLoggerLevelValid = isLoggerLevelValid;
var assertInitOptions = function (options) {
    if (!(0, Utils_1.isString)(options.serverKey) || options.serverKey.length === 0) {
        throw new Error("initOptions.serverKey must be a non-empty string");
    }
    if (options.url != null) {
        if (!(0, Utils_1.isString)(options.url) || options.url.length === 0) {
            throw new Error("initOptions.url must be a non-empty string");
        }
    }
};
exports.assertInitOptions = assertInitOptions;
