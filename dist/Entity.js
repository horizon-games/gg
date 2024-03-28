"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Component_1 = require("./Component");
const UNDEFINED_ID = -1;
let instanceIdx = 0;
class Entity {
    constructor(components = []) {
        this.id = UNDEFINED_ID;
        this.components = {};
        this.onChangeListeners = new Set();
        // tslint:disable-next-line
        this.has = this.hasComponent;
        this.hasComponents = (...types) => {
            return types.every((type) => this.hasComponent(type));
        };
        this.addComponent = (component) => {
            if (!this.hasComponent(component.type)) {
                this.components[component.type] = component;
                component.onAttach(this);
                for (const listener of this.onChangeListeners) {
                    listener({ type: 'add', entity: this, component });
                }
            }
            else {
                throw new Error(`Entity already contains component of type ${component.type}.`);
            }
        };
        // tslint:disable-next-line
        this.add = this.addComponent;
        this.removeComponent = (type) => {
            if (this.hasComponent(type)) {
                const component = this.components[type];
                delete this.components[type];
                component.onDetach(this);
                for (const listener of this.onChangeListeners) {
                    listener({ type: 'remove', entity: this, component });
                }
            }
        };
        // tslint:disable-next-line
        this.remove = this.removeComponent;
        // tslint:disable-next-line
        this.toggle = this.toggleComponent;
        // tslint:disable-next-line
        this.get = this.getComponentValue;
        // tslint:disable-next-line
        this.set = this.setComponentValue;
        this.reset();
        this.renew(components);
    }
    get componentTypes() {
        return Object.keys(this.components);
    }
    renew(components = []) {
        for (const component of components) {
            this.addComponent(component);
        }
        return this;
    }
    reset() {
        for (const type of this.componentTypes.reverse()) {
            this.removeComponent(type);
        }
        this.id = ++instanceIdx;
        this.onChangeListeners = new Set();
        return this;
    }
    onChange(listener) {
        this.onChangeListeners.add(listener);
        return () => this.onChangeListeners.delete(listener);
    }
    removeOnChange(listener) {
        if (this.onChangeListeners.has(listener)) {
            this.onChangeListeners.delete(listener);
        }
    }
    hasComponent(type) {
        return !!this.components[type];
    }
    toggleComponent(componentClass, predicate) {
        const componentType = Component_1.getComponentTypeFromClass(componentClass);
        if (predicate) {
            if (!this.hasComponent(componentType)) {
                this.addComponent(new componentClass());
            }
        }
        else {
            this.removeComponent(componentType);
        }
    }
    // Get component instance
    getComponent(type) {
        return this.components[type];
    }
    getComponentValue(type) {
        if (this.hasComponent(type)) {
            return this.components[type].value;
        }
        else {
            throw new Error(`Entity does not contain component of type ${type}.`);
        }
    }
    setComponentValue(type, value) {
        if (this.hasComponent(type)) {
            if (typeof value === 'object' && !Array.isArray(value)) {
                Object.assign(this.components[type].value, value);
            }
            else {
                this.components[type].value = value;
            }
        }
        else {
            throw new Error(`Entity does not contain component of type ${type}.`);
        }
    }
}
exports.default = Entity;
//# sourceMappingURL=Entity.js.map