"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SystemTypeRegExp = /System$/;
var getSystemTypeFromClass = function (klass) {
    return klass.name.charAt(0).toLowerCase() +
        klass.name.slice(1).replace(SystemTypeRegExp, '');
};
var System = /** @class */ (function () {
    function System(options) {
        if (options === void 0) { options = {}; }
        this.type = getSystemTypeFromClass(this.constructor);
        this.enabled = true;
        Object.assign(this, options);
    }
    System.prototype.init = function (_) {
        // stub
    };
    System.prototype.enable = function () {
        this.enabled = true;
    };
    System.prototype.disable = function () {
        this.enabled = false;
    };
    return System;
}());
exports.default = System;
//# sourceMappingURL=System.js.map