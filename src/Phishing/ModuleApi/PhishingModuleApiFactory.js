"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.phishingModuleApiFactory = void 0;
var ModuleInfo_1 = require("../../Shared/ModuleInfo");
var Mixins_1 = require("../../Shared/Logger/Mixins");
var Utils_1 = require("../../Shared/Global/Utils");
var ErrorCodes_1 = require("../../Shared/ErrorCodes");
var Constants_1 = require("../Constants");
var SendInitCall_1 = require("../UpstreamApi/SendInitCall");
var SendCatcherCall_1 = require("../UpstreamApi/SendCatcherCall");
var InitTypeguards_1 = require("./InitTypeguards");
var FALLBACK_RESPONSE = {
    status: (0, Constants_1.phishingErrorStatus)(ErrorCodes_1.SDK_ERROR),
    headers: {},
    body: new Uint8Array(0),
    error: { message: ErrorCodes_1.SDK_ERROR },
};
var phishingModuleApiFactory = function (options) {
    var _a;
    var logger = (0, Mixins_1.decorateLogger)(console);
    logger.setLevel(Mixins_1.DEFAULT_LOG_LEVEL);
    var GLOBAL_OPTIONS = {
        url: (_a = options.url) !== null && _a !== void 0 ? _a : Constants_1.DEFAULT_PHISHING_ENDPOINT,
        clientKey: "",
        module: options.module || { name: ModuleInfo_1.MODULE_NAME, version: ModuleInfo_1.MODULE_VERSION },
        httpClient: options.httpClient,
        logger: logger,
    };
    var sendInitCallOnce = (0, Utils_1.once)(function () {
        (0, SendInitCall_1.sendPhishingInitCall)({ global: GLOBAL_OPTIONS })
            .result.then(function () {
            GLOBAL_OPTIONS.logger.info("Phishing inited successfully");
        })
            .catch(function (e) {
            GLOBAL_OPTIONS.logger.warn("Can't send phishing init call: ".concat((0, Utils_1.extractMessageFromError)(e)));
        });
    });
    var initCall = function () {
        if (!GLOBAL_OPTIONS.clientKey) {
            GLOBAL_OPTIONS.logger.warn("Phishing init call skipped: clientKey is not set. Check the init function call.");
            return;
        }
        sendInitCallOnce();
    };
    var init = (0, Utils_1.once)(function (initOptions) {
        var _a, _b;
        (0, InitTypeguards_1.assertInitOptions)(initOptions);
        GLOBAL_OPTIONS.url = initOptions.url || GLOBAL_OPTIONS.url;
        GLOBAL_OPTIONS.clientKey = initOptions.clientKey;
        logger = (0, Mixins_1.redeclareLogger)((_a = initOptions.logger) === null || _a === void 0 ? void 0 : _a.logger, logger);
        GLOBAL_OPTIONS.logger = logger;
        logger.setLevel((0, Mixins_1.isLoggerLevelValid)((_b = initOptions.logger) === null || _b === void 0 ? void 0 : _b.level) ? initOptions.logger.level : Mixins_1.DEFAULT_LOG_LEVEL);
        GLOBAL_OPTIONS.timeouts = (0, InitTypeguards_1.isTimeoutsValid)(initOptions.timeouts) ? initOptions.timeouts : undefined;
        if (!options.skipInitCall) {
            initCall();
        }
    });
    var fetchCatcher = function (fetchOptions) {
        try {
            if (!GLOBAL_OPTIONS.clientKey) {
                GLOBAL_OPTIONS.logger.error("fetchCatcher called before init; call init({ clientKey }) first");
                return Promise.resolve(FALLBACK_RESPONSE);
            }
            var upstreamOptions = void 0;
            if (options.catcherRequestInfoExtractor && (0, Utils_1.isKeyExist)(fetchOptions, "request")) {
                var _a = fetchOptions, request = _a.request, base = __rest(_a, ["request"]);
                var headers = options.catcherRequestInfoExtractor(request, GLOBAL_OPTIONS).headers;
                upstreamOptions = __assign(__assign({}, base), { headers: headers });
            }
            else {
                upstreamOptions = fetchOptions;
            }
            return (0, SendCatcherCall_1.sendPhishingCatcherCall)(GLOBAL_OPTIONS, upstreamOptions);
        }
        catch (e) {
            GLOBAL_OPTIONS.logger.error("fetchCatcher failed unexpectedly: ".concat((0, Utils_1.extractMessageFromError)(e)));
            return Promise.resolve(FALLBACK_RESPONSE);
        }
    };
    return {
        fetchCatcher: fetchCatcher,
        init: init,
        dev: {
            sendInitCall: initCall,
            getLogger: function () { return logger; },
            setLoggerLevel: function (level) {
                if ((0, Mixins_1.isLoggerLevelValid)(level)) {
                    logger.setLevel(level);
                }
            },
        },
    };
};
exports.phishingModuleApiFactory = phishingModuleApiFactory;
