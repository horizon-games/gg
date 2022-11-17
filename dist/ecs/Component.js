"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComponentTypeFromClass = void 0;
const ComponentTypeRegExp = /Component$/;
function getComponentTypeFromClass(klass) {
    const name = klass.name;
    const noUnderscoreName = name.replace(/^_?/, '');
    return noUnderscoreName.charAt(0).toLowerCase() +
        noUnderscoreName.slice(1).replace(ComponentTypeRegExp, '');
}
exports.getComponentTypeFromClass = getComponentTypeFromClass;
class Component {
    constructor(value) {
        this.value = value;
        this.type = getComponentTypeFromClass(this.constructor);
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