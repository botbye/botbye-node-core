"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withApiErrorHandle = void 0;
var Utils_1 = require("../../../Shared/Global/Utils");
var ErrorCodes_1 = require("../../../Shared/ErrorCodes");
var Types_1 = require("../Types");
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
    if ("botbye_result" in response && !(0, Utils_1.isString)(response.botbye_result)) {
        return false;
    }
    if ("challenge" in response && (!(0, Utils_1.isPlainObject)(response.challenge) || !(0, Utils_1.isString)(response.challenge.type))) {
        return false;
    }
    return true;
};
var withApiErrorHandle = function (factory, _global) {
    return new Promise(function (res) {
        try {
            factory()
                .result.then(function (v) {
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
            })
                .catch(function (e) {
                res((0, Utils_2.createFallbackEvaluationResult)((0, ErrorCodes_1.classifyRequestError)(e)));
            });
        }
        catch (e) {
            res((0, Utils_2.createFallbackEvaluationResult)(ErrorCodes_1.SDK_ERROR));
        }
    });
};
exports.withApiErrorHandle = withApiErrorHandle;
