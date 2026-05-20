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
exports.sendEvaluateCall = void 0;
var Utils_1 = require("./Utils");
var EVALUATE_PATH = "/api/v1/protect/evaluate";
var sendEvaluateCall = function (_a) {
    var _b;
    var global = _a.global, event = _a.event;
    var baseUrl = "".concat(global.url).concat(EVALUATE_PATH);
    try {
        var withToken = new URL("".concat(baseUrl, "?").concat((_b = event.request.token) !== null && _b !== void 0 ? _b : ""));
        baseUrl = withToken.href;
    }
    catch (_c) {
    }
    return global.httpClient.call(baseUrl, {
        method: "POST",
        headers: (0, Utils_1.getModuleHeaders)(global),
        body: __assign(__assign({}, event), { server_key: global.serverKey }),
    });
};
exports.sendEvaluateCall = sendEvaluateCall;
