"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFallbackEvaluationResult = void 0;
var createFallbackEvaluationResult = function (message) { return ({
    decision: "ALLOW",
    config: {
        "bypass_bot_validation": true,
    },
    error: {
        message: message,
    },
}); };
exports.createFallbackEvaluationResult = createFallbackEvaluationResult;
