"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moduleApiFactory = void 0;
var Mixins_1 = require("../../Shared/Logger/Mixins");
var Utils_1 = require("../../Shared/Global/Utils");
var ModuleInfo_1 = require("../../Shared/ModuleInfo");
var SendInitCall_1 = require("../UpstreamApi/SendInitCall");
var Evaluate_1 = require("../Evaluate/Evaluate");
var EvaluateWithExtractor_1 = require("../Evaluate/Decorators/EvaluateWithExtractor");
var WithAnyErrorHandle_1 = require("../Evaluate/Decorators/WithAnyErrorHandle");
var InitTypeguards_1 = require("./InitTypeguards");
var moduleApiFactory = function (options) {
    var _a;
    var logger = (0, Mixins_1.decorateLogger)(console);
    logger.setLevel(Mixins_1.DEFAULT_LOG_LEVEL);
    var GLOBAL_OPTIONS = {
        url: (_a = options.url) !== null && _a !== void 0 ? _a : "https://verify.botbye.com",
        serverKey: "",
        module: options.module || { name: ModuleInfo_1.MODULE_NAME, version: ModuleInfo_1.MODULE_VERSION },
        httpClient: options.httpClient,
        logger: logger,
    };
    var evaluate = (0, Evaluate_1.evaluateFactory)(GLOBAL_OPTIONS);
    if (options.requestInfoExtractor) {
        var extractor = options.requestInfoExtractor;
        evaluate = (0, EvaluateWithExtractor_1.evaluateWithExtractorFactory)(extractor, evaluate, GLOBAL_OPTIONS);
    }
    var initCall = (0, Utils_1.once)(function () {
        (0, SendInitCall_1.sendInitCall)({ global: GLOBAL_OPTIONS }).result
            .then(function () {
            GLOBAL_OPTIONS.logger.info("Inited successfully");
        }).catch(function (e) {
            GLOBAL_OPTIONS.logger.warn("Can't send init call: ".concat((0, Utils_1.extractMessageFromError)(e)));
        });
    });
    return {
        init: (0, Utils_1.once)(function (initOptions) {
            var _a, _b;
            (0, InitTypeguards_1.assertInitOptions)(initOptions);
            GLOBAL_OPTIONS.url = initOptions.url || GLOBAL_OPTIONS.url;
            GLOBAL_OPTIONS.serverKey = initOptions.serverKey;
            logger = (0, Mixins_1.redeclareLogger)((_a = initOptions.logger) === null || _a === void 0 ? void 0 : _a.logger, logger);
            GLOBAL_OPTIONS.logger = logger;
            logger.setLevel((0, Mixins_1.isLoggerLevelValid)((_b = initOptions.logger) === null || _b === void 0 ? void 0 : _b.level) ? initOptions.logger.level : Mixins_1.DEFAULT_LOG_LEVEL);
            GLOBAL_OPTIONS.timeouts = (0, InitTypeguards_1.isTimeoutsValid)(initOptions.timeouts) ? initOptions.timeouts : undefined;
            if (!options.skipInitCall) {
                initCall();
            }
        }),
        evaluate: (0, WithAnyErrorHandle_1.withAnyErrorHandle)(evaluate),
        dev: {
            setLoggerLevel: function (level) {
                if ((0, Mixins_1.isLoggerLevelValid)(level)) {
                    logger.setLevel(level);
                }
            },
            sendInitCall: initCall,
            getLogger: function () { return logger; },
        },
    };
};
exports.moduleApiFactory = moduleApiFactory;
