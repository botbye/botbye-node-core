"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendInitCall = void 0;
var Utils_1 = require("../../Shared/Global/Utils");
var INVALID_JSON_MESSAGE = "Invalid JSON in the server response";
var sendInitCall = function (_a) {
    var global = _a.global;
    var _b = global.httpClient.call(global.url + "/init-request/v1", {
        method: "POST",
        headers: (0, Utils_1.getModuleHeaders)(global),
        body: {
            serverKey: global.serverKey,
        },
    }), baseResult = _b.result, abort = _b.abort;
    var result = baseResult
        .then(function (r) {
        var parsed = { error: "Unknown error" };
        try {
            parsed = JSON.parse(r);
        }
        catch (_a) {
            throw new Error(INVALID_JSON_MESSAGE);
        }
        if (!(0, Utils_1.isPlainObject)(parsed)) {
            throw new Error(INVALID_JSON_MESSAGE);
        }
        if ("status" in parsed && parsed.status === "ok") {
            return "";
        }
        if ("error" in parsed) {
            throw new Error(parsed.error);
        }
        return "";
    });
    return {
        result: result,
        abort: abort,
    };
};
exports.sendInitCall = sendInitCall;
