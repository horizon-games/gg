"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ComponentTypeRegExp = /Component$/;
exports.getComponentTypeFromClass = function (klass) {
    return klass.name.charAt(0).toLowerCase() +
        klass.name.slice(1).replace(ComponentTypeRegExp, '');
};
var Component = /** @class */ (function () {
    function Component(value) {
        this.type = exports.getComponentTypeFromClass(this.constructor);
        this.value = value;
    }
    Component.prototype.onAttach = function (entity) {
        // stub
    };
    Component.prototype.onDetach = function (entity) {
        // stub
    };
    return Component;
}());
exports.default = Component;
//# sourceMappingURL=Component.js.map