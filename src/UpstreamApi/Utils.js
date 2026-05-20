"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getModuleHeaders = void 0;
var getModuleHeaders = function (options) {
    var _a;
    return (_a = {},
        _a["Module-Name"] = options.module.name,
        _a["Module-Version"] = options.module.version,
        _a);
};
exports.getModuleHeaders = getModuleHeaders;
