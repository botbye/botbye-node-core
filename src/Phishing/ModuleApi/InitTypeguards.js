"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertInitOptions = exports.isTimeoutsValid = void 0;
var Utils_1 = require("../../Shared/Global/Utils");
var isTimeoutsValid = function (timeouts) {
    if (!(0, Utils_1.isPlainObject)(timeouts)) {
        return false;
    }
    if ("fetchCatcher" in timeouts && !(0, Utils_1.isNumber)(timeouts.fetchCatcher)) {
        return false;
    }
    return true;
};
exports.isTimeoutsValid = isTimeoutsValid;
var assertInitOptions = function (options) {
    if (!(0, Utils_1.isPlainObject)(options)) {
        throw new Error("initOptions must be an object");
    }
    if (!(0, Utils_1.isString)(options.clientKey) || options.clientKey.length === 0) {
        throw new Error("initOptions.clientKey must be a non-empty string");
    }
    if (options.url != null) {
        if (!(0, Utils_1.isString)(options.url) || options.url.length === 0) {
            throw new Error("initOptions.url must be a non-empty string");
        }
    }
};
exports.assertInitOptions = assertInitOptions;
