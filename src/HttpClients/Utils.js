"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyToJson = void 0;
var bodyToJson = function (body) {
    if (body === null || body === undefined) {
        return undefined;
    }
    if (typeof body === "string") {
        return body;
    }
    return JSON.stringify(body);
};
exports.bodyToJson = bodyToJson;
