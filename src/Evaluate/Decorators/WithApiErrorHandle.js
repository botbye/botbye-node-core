"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withApiErrorHandle = void 0;
var Constants_1 = require("../../HttpClients/Constants");
var Utils_1 = require("../../Global/Utils");
var Types_1 = require("../Types");
var ErrorCodes_1 = require("../ErrorCodes");
var Utils_2 = require("../Utils");
var isValidResponse = function (response) {
    if (!(0, Utils_1.isPlainObject)(response)) {
        return false;
    }
    if (!("request_id" in response) || !(0, Utils_1.isString)(response.request_id)) {
        return false;
    }
    if (!("decision" in response) || !(0, Utils_1.isString)(response.decision) || !Types_1.EVALUATE_DECISIONS.includes(response.decision)) {
        return false;
    }
    if (!("risk_score" in response) || !(0, Utils_1.isNumber)(response.risk_score)) {
        return false;
    }
    if (!("signals" in response) || !Array.isArray(response.signals)) {
        return false;
    }
    if (!("scores" in response) || !(0, Utils_1.isPlainObject)(response.scores)) {
        return false;
    }
    if (!("config" in response) || !(0, Utils_1.isPlainObject)(response.config)) {
        return false;
    }
    return true;
};
var extractMessage = function (e) {
    if ((0, Utils_1.isString)(e)) {
        return e;
    }
    if (e instanceof Error) {
        return e.message;
    }
    return "UNKNOWN";
};
var withApiErrorHandle = function (factory, _global) { return new Promise(function (res) {
    try {
        factory().result
            .then(function (v) {
            var parsed = null;
            try {
                parsed = JSON.parse(v);
            }
            catch (e) {
                res((0, Utils_2.createFallbackEvaluationResult)(ErrorCodes_1.JSON_ERROR));
                return;
            }
            if (!isValidResponse(parsed)) {
                res((0, Utils_2.createFallbackEvaluationResult)(ErrorCodes_1.JSON_ERROR));
                return;
            }
            res(parsed);
        }).catch(function (e) {
            var message = extractMessage(e);
            if (message.includes(Constants_1.REQUEST_TIMEOUT_ERROR_CODE)) {
                res((0, Utils_2.createFallbackEvaluationResult)(ErrorCodes_1.TIMEOUT_ERROR));
                return;
            }
            if (message.includes(Constants_1.REQUEST_ERROR_CODE)) {
                res((0, Utils_2.createFallbackEvaluationResult)(ErrorCodes_1.CONNECTION_ERROR));
                return;
            }
            res((0, Utils_2.createFallbackEvaluationResult)(ErrorCodes_1.UNKNOWN_ERROR));
        });
    }
    catch (e) {
        res((0, Utils_2.createFallbackEvaluationResult)(ErrorCodes_1.SDK_ERROR));
    }
}); };
exports.withApiErrorHandle = withApiErrorHandle;
