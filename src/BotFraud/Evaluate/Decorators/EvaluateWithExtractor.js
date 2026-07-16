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
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluateWithExtractorFactory = void 0;
var Utils_1 = require("../../../Shared/Global/Utils");
var isExtendedRequest = function (value) { return (0, Utils_1.isKeyExist)(value, "request"); };
var evaluateWithExtractorFactory = function (extractor, baseEvaluate, global) {
    return function (event) {
        var _a;
        if (isExtendedRequest(event.request)) {
            var extracted = extractor(event.request.request, global);
            event.request = __assign(__assign({}, extracted), { token: (_a = event.request.token) !== null && _a !== void 0 ? _a : extracted.token });
        }
        return baseEvaluate(event);
    };
};
exports.evaluateWithExtractorFactory = evaluateWithExtractorFactory;
