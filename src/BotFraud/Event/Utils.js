"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fieldRequiredLog = exports.sanitizeIfPlainObject = exports.sanitizeIfTruthy = exports.sanitizeIfNotNil = exports.sanitize = void 0;
var Utils_1 = require("../../Shared/Global/Utils");
var sanitize = function (row, sanitized, sourceKey, targetKey, valueSanitize, global, initial) {
    if ((0, Utils_1.isKeyExist)(row, sourceKey)) {
        sanitized[targetKey] = valueSanitize(row[sourceKey], global);
        return;
    }
    if (initial) {
        sanitized[targetKey] = initial;
    }
};
exports.sanitize = sanitize;
var sanitizeIfNotNil = function (row, sanitized, sourceKey, targetKey, valueSanitize, global, initial) {
    if ((0, Utils_1.isNotNil)(row[sourceKey])) {
        sanitize(row, sanitized, sourceKey, targetKey, valueSanitize, global, initial);
        return;
    }
    if (initial) {
        sanitized[targetKey] = initial;
    }
};
exports.sanitizeIfNotNil = sanitizeIfNotNil;
var sanitizeIfTruthy = function (row, sanitized, sourceKey, targetKey, valueSanitize, global, initial) {
    if (row[sourceKey]) {
        sanitized[targetKey] = valueSanitize(row[sourceKey], global);
        return;
    }
    if (initial) {
        sanitized[targetKey] = initial;
    }
};
exports.sanitizeIfTruthy = sanitizeIfTruthy;
var sanitizeIfPlainObject = function (row, sanitized, sourceKey, targetKey, valueSanitize, global, initial) {
    if ((0, Utils_1.isPlainObject)(row[sourceKey])) {
        sanitized[targetKey] = valueSanitize(row[sourceKey], global);
        return;
    }
    if (initial) {
        sanitized[targetKey] = initial;
    }
};
exports.sanitizeIfPlainObject = sanitizeIfPlainObject;
var fieldRequiredLog = function (object, logger, field, parent) {
    if (!object[field]) {
        logger.warn("Field ".concat(field, " is required in ").concat(parent));
    }
};
exports.fieldRequiredLog = fieldRequiredLog;
