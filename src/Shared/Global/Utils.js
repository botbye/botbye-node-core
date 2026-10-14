"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getModuleHeaders = exports.once = exports.getIpFromHeaders = exports.extractMessageFromError = exports.isObject = exports.isNumber = exports.withTimeout = exports.isKeyExist = exports.toString = exports.isNotNil = exports.isPlainObject = exports.isString = void 0;
var isTypeof = function (value, type) { return typeof value === type; };
var isNil = function (value) { return value === undefined || value === null; };
var isNotNil = function (value) { return !isNil(value); };
exports.isNotNil = isNotNil;
var isString = function (value) { return isTypeof(value, "string"); };
exports.isString = isString;
var isNumber = function (value) { return isTypeof(value, "number") && !Number.isNaN(value); };
exports.isNumber = isNumber;
var isObject = function (value) {
    if (typeof value !== "object" || value === null) {
        return false;
    }
    return true;
};
exports.isObject = isObject;
var isPlainObject = function (value) {
    if (typeof value !== "object" || value === null) {
        return false;
    }
    var proto = Object.getPrototypeOf(value);
    return proto === Object.prototype || proto === null;
};
exports.isPlainObject = isPlainObject;
var toString = function (value) { return (isString(value) ? value : String(value)); };
exports.toString = toString;
var isKeyExist = function (obj, key) { return isObject(obj) && key in obj; };
exports.isKeyExist = isKeyExist;
var withTimeout = function (promise, timeoutMs, errorCode) {
    var timeoutPromise = new Promise(function (_, rej) {
        return setTimeout(function () {
            rej(errorCode);
        }, timeoutMs);
    });
    return Promise.race([promise, timeoutPromise]);
};
exports.withTimeout = withTimeout;
var extractMessageFromError = function (e) {
    var message = "Unknown error";
    if (e instanceof Error) {
        message = e.message;
    }
    return message;
};
exports.extractMessageFromError = extractMessageFromError;
var extractFirstIpFromHeaderValue = function (value) {
    var _a;
    var raw = Array.isArray(value) ? value[0] : value;
    if (!isString(raw)) {
        return null;
    }
    var ip = (_a = raw.split(",")[0]) === null || _a === void 0 ? void 0 : _a.trim();
    return ip || null;
};
var getIpFromHeaders = function (headers) {
    var _a;
    if (!isObject(headers)) {
        return null;
    }
    return ((_a = extractFirstIpFromHeaderValue(headers["x-forwarded-for"])) !== null && _a !== void 0 ? _a : extractFirstIpFromHeaderValue(headers["x-real-ip"]));
};
exports.getIpFromHeaders = getIpFromHeaders;
var once = function (cb) {
    var called = false;
    return (function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (called) {
            return;
        }
        called = true;
        cb.apply(void 0, args);
    });
};
exports.once = once;
var getModuleHeaders = function (options) {
    var _a;
    return (_a = {},
        _a["Module-Name"] = options.module.name,
        _a["Module-Version"] = options.module.version,
        _a);
};
exports.getModuleHeaders = getModuleHeaders;
