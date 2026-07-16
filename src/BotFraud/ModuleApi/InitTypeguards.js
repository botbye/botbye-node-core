"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTimeoutsValid = exports.assertInitOptions = void 0;
var Utils_1 = require("../../Shared/Global/Utils");
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
var assertInitOptions = function (options) {
    if (!(0, Utils_1.isPlainObject)(options)) {
        throw new Error("initOptions must be an object");
    }
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
