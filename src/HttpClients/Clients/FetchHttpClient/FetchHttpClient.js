"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchHttpClient = void 0;
var Utils_1 = require("../../../Global/Utils");
var Utils_2 = require("../../Utils");
var Constants_1 = require("../../Constants");
var fetchHttpClient = {
    type: "fetchHttpClient",
    call: function (baseUrl, init) {
        var controller = new AbortController();
        var abort = function () {
            controller.abort();
        };
        var result = fetch(baseUrl, {
            method: init.method,
            body: (0, Utils_2.bodyToJson)(init.body),
            headers: init.headers,
            keepalive: init.keepalive,
            signal: controller.signal,
        }).then(function (r) {
            var _a;
            if (!r.ok) {
                void ((_a = r.body) === null || _a === void 0 ? void 0 : _a.cancel());
                throw new Error(Constants_1.REQUEST_ERROR_CODE);
            }
            return r.text();
        }).catch(function (e) {
            throw new Error("".concat(Constants_1.REQUEST_ERROR_CODE, " ").concat((0, Utils_1.extractMessageFromError)(e)));
        });
        return {
            result: result,
            abort: abort,
        };
    },
};
exports.fetchHttpClient = fetchHttpClient;
