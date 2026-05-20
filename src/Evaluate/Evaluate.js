"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluateFactory = void 0;
var SendEvaluateCall_1 = require("../UpstreamApi/SendEvaluateCall");
var AdaptEvent_1 = require("../Event/AdaptEvent");
var HttpClientCallWithTimeout_1 = require("../HttpClients/Decorators/HttpClientCallWithTimeout");
var Constants_1 = require("../HttpClients/Constants");
var Utils_1 = require("../Global/Utils");
var WithApiErrorHandle_1 = require("./Decorators/WithApiErrorHandle");
var Utils_2 = require("./Utils");
var ErrorCodes_1 = require("./ErrorCodes");
var evaluateFactory = function (global) {
    return function (event) {
        if (!global.serverKey) {
            global.logger.error("serverKey is not set. Check the init function call.");
            return Promise.resolve((0, Utils_2.createFallbackEvaluationResult)(ErrorCodes_1.SDK_ERROR));
        }
        return (0, WithApiErrorHandle_1.withApiErrorHandle)(function () {
            var _a;
            return (0, HttpClientCallWithTimeout_1.httpClientCallWithTimeout)((0, SendEvaluateCall_1.sendEvaluateCall)({
                global: global,
                event: (0, AdaptEvent_1.adaptEvent)(event, global),
            }), global, (0, Utils_1.isNumber)((_a = global.timeouts) === null || _a === void 0 ? void 0 : _a.evaluate) ? global.timeouts.evaluate : Constants_1.BASE_REQUEST_TIMEOUT, {
                name: "EVALUATE",
            });
        }, global);
    };
};
exports.evaluateFactory = evaluateFactory;
