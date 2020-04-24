"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Component_1 = require("./Component");
var instanceIdx = 0;
var Entity = /** @class */ (function () {
    function Entity(components) {
        var _this = this;
        if (components === void 0) { components = []; }
        this.components = {};
        this.onChangeListeners = new Set();
        // tslint:disable-next-line
        this.has = this.hasComponent;
        this.hasComponents = function () {
            var types = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                types[_i] = arguments[_i];
            }
            return types.every(function (type) { return _this.hasComponent(type); });
        };
        this.addComponent = function (component) {
            if (!_this.hasComponent(component.type)) {
                _this.components[component.type] = component;
                component.onAttach(_this);
                _this.onChangeListeners.forEach(function (listener) {
                    return listener({ type: 'add', entity: _this, component: component });
                });
            }
            else {
                throw new Error("Entity already contains component of type " + component.type + ".");
            }
        };
        // tslint:disable-next-line
        this.add = this.addComponent;
        this.removeComponent = function (type) {
            if (_this.hasComponent(type)) {
                var component_1 = _this.components[type];
                delete _this.components[type];
                component_1.onDetach(_this);
                _this.onChangeListeners.forEach(function (listener) {
                    return listener({ type: 'remove', entity: _this, component: component_1 });
                });
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
    Object.defineProperty(Entity.prototype, "componentTypes", {
        get: function () {
            return Object.keys(this.components);
        },
        enumerable: true,
        configurable: true
    });
    Entity.prototype.renew = function (components) {
        if (components === void 0) { components = []; }
        components.forEach(this.addComponent);
        return this;
    };
    Entity.prototype.reset = function () {
        this.componentTypes.reverse().forEach(this.removeComponent);
        this.id = ++instanceIdx;
        this.onChangeListeners = new Set();
        return this;
    };
    Entity.prototype.onChange = function (listener) {
        var _this = this;
        this.onChangeListeners.add(listener);
        return function () { return _this.onChangeListeners.delete(listener); };
    };
    Entity.prototype.removeOnChange = function (listener) {
        if (this.onChangeListeners.has(listener)) {
            this.onChangeListeners.delete(listener);
        }
    };
    Entity.prototype.hasComponent = function (type) {
        return !!this.components[type];
    };
    Entity.prototype.toggleComponent = function (componentClass, predicate) {
        var componentType = Component_1.getComponentTypeFromClass(componentClass);
        if (predicate) {
            if (!this.hasComponent(componentType)) {
                this.addComponent(new componentClass());
            }
        }
        else {
            this.removeComponent(componentType);
        }
    };
    // Get component instance
    Entity.prototype.getComponent = function (type) {
        return this.components[type];
    };
    Entity.prototype.getComponentValue = function (type) {
        if (this.hasComponent(type)) {
            return this.components[type].value;
        }
        else {
            throw new Error("Entity does not contain component of type " + type + ".");
        }
    };
    Entity.prototype.setComponentValue = function (type, value) {
        if (this.hasComponent(type)) {
            if (typeof value === 'object' && !Array.isArray(value)) {
                Object.assign(this.components[type].value, value);
            }
            else {
                this.components[type].value = value;
            }
        }
        else {
            throw new Error("Entity does not contain component of type " + type + ".");
        }
    };
    return Entity;
}());
exports.default = Entity;
//# sourceMappingURL=Entity.js.map