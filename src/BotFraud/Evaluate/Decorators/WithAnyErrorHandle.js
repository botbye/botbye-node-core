"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withAnyErrorHandle = void 0;
var ErrorCodes_1 = require("../../../Shared/ErrorCodes");
var Utils_1 = require("../Utils");
var withAnyErrorHandle = function (baseEvaluate) {
    return function (event) {
        return new Promise(function (res) {
            try {
                res(baseEvaluate(event));
            }
            catch (_a) {
                res((0, Utils_1.createFallbackEvaluationResult)(ErrorCodes_1.SDK_ERROR));
            }
        });
    };
};
exports.withAnyErrorHandle = withAnyErrorHandle;
