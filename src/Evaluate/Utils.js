"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFallbackEvaluationResult = void 0;
var createFallbackEvaluationResult = function (message) { return ({
    decision: "ALLOW",
    error: {
        message: message,
    },
}); };
exports.createFallbackEvaluationResult = createFallbackEvaluationResult;
