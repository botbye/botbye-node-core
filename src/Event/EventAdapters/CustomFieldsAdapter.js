"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adaptCustomFields = void 0;
var Utils_1 = require("../../Global/Utils");
var FALLBACK_CUSTOM_FIELDS = {};
var adaptCustomFields = function (baseCustomFields, _global) {
    if (!(0, Utils_1.isPlainObject)(baseCustomFields)) {
        return FALLBACK_CUSTOM_FIELDS;
    }
    var adaptedCustomFields = {};
    for (var _i = 0, _a = Object.keys(baseCustomFields); _i < _a.length; _i++) {
        var key = _a[_i];
        adaptedCustomFields[key] = (0, Utils_1.toString)(baseCustomFields[key]);
    }
    return adaptedCustomFields;
};
exports.adaptCustomFields = adaptCustomFields;
