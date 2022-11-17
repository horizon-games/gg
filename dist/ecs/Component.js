"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComponentTypeFromClass = void 0;
const ComponentTypeRegExp = /_?Component$/;
exports.getComponentTypeFromClass = (klass) => klass.name.charAt(0).toLowerCase() +
    klass.name.slice(1).replace(ComponentTypeRegExp, '');
class Component {
    constructor(value) {
        this.value = value;
        this.type = exports.getComponentTypeFromClass(this.constructor);
    }
    onAttach(entity) {
        // stub
    }
    onDetach(entity) {
        // stub
    }
}
exports.default = Component;
// export type ComponentTypes = {}
//# sourceMappingURL=Component.js.map