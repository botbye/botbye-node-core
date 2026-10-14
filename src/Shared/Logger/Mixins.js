"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_LOG_LEVEL = exports.isLoggerLevelValid = exports.redeclareLogger = exports.decorateLogger = void 0;
var Utils_1 = require("../Global/Utils");
var Types_1 = require("./Types");
var voidFn = function () { return void 0; };
var decorate = function (decoratorFactory, baseLogger) {
    return Types_1.LOGGER_LEVELS.reduce(function (acc, level) {
        var _a;
        var baseCall = ((_a = baseLogger[level]) !== null && _a !== void 0 ? _a : voidFn).bind(baseLogger);
        acc[level] = decoratorFactory(level, baseCall);
        return acc;
    }, baseLogger);
};
var withSafeMixins = function (logger) {
    return Types_1.LOGGER_LEVELS.reduce(function (acc, level) {
        var base = (0, Utils_1.isObject)(logger) ? logger[level] : undefined;
        acc[level] = (base !== null && base !== void 0 ? base : voidFn).bind(logger);
        return acc;
    }, {});
};
var withPackageName = function (logger) {
    var decoratorFactory = function (_, baseCall) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            baseCall.apply(void 0, __spreadArray(["[BotBye!]"], args, false));
        };
    };
    return decorate(decoratorFactory, logger);
};
var withLogLevel = function (logger) {
    var isShouldLog = function (level, calledLevel) {
        return Types_1.LOGGER_LEVELS.indexOf(calledLevel) <= Types_1.LOGGER_LEVELS.indexOf(level);
    };
    var decoratorFactory = function (level, baseCall) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (isShouldLog(this.level, level)) {
                baseCall.apply(void 0, args);
            }
        };
    };
    var decorated = decorate(decoratorFactory, logger);
    decorated.setLevel = function (level) {
        this.level = level;
    };
    return decorated;
};
var withTryCatch = function (logger) {
    var decoratorFactory = function (_, baseCall) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            try {
                baseCall.apply(void 0, args);
            }
            catch (_a) { }
        };
    };
    return decorate(decoratorFactory, logger);
};
var DEFAULT_LOG_LEVEL = "info";
exports.DEFAULT_LOG_LEVEL = DEFAULT_LOG_LEVEL;
var decorateLogger = function (logger) { return withTryCatch(withLogLevel(withPackageName(withSafeMixins(logger)))); };
exports.decorateLogger = decorateLogger;
var isLoggerValid = function (logger) {
    if (!(0, Utils_1.isPlainObject)(logger)) {
        return false;
    }
    return Types_1.LOGGER_LEVELS.every(function (level) { return typeof logger[level] === "function"; });
};
var redeclareLogger = function (newLogger, defaultLogger) {
    return isLoggerValid(newLogger) ? decorateLogger(newLogger) : defaultLogger;
};
exports.redeclareLogger = redeclareLogger;
var isLoggerLevelValid = function (level) {
    if (!(0, Utils_1.isString)(level)) {
        return false;
    }
    return Types_1.LOGGER_LEVELS.includes(level);
};
exports.isLoggerLevelValid = isLoggerLevelValid;
