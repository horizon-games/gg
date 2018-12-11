"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Component_1 = require("./Component");
var instanceIdx = 0;
var Entity = /** @class */ (function () {
    function Entity(components) {
        if (components === void 0) { components = []; }
        var _this = this;
        this.components = {};
        this.componentChangeListeners = new Set();
        this.addComponent = function (component) {
            if (!_this.hasComponent(component.type)) {
                _this.components[component.type] = component;
                component.onAttach(_this);
                _this.componentChangeListeners.forEach(function (listener) {
                    return listener({ type: 'add', entity: _this, componentType: component.type });
                });
            }
            else {
                throw new Error("Entity already contains component of type " + component.type + ".");
            }
        };
        this.add = this.addComponent;
        this.removeComponent = function (type) {
            if (_this.hasComponent(type)) {
                _this.components[type].onDetach(_this);
                delete _this.components[type];
                _this.componentChangeListeners.forEach(function (listener) {
                    return listener({ type: 'remove', entity: _this, componentType: type });
                });
            }
        };
        this.remove = this.removeComponent;
        this.has = this.hasComponent;
        this.hasComponents = function () {
            var types = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                types[_i] = arguments[_i];
            }
            return types.every(function (type) { return _this.hasComponent(type); });
        };
        this.get = this.getComponent;
        this.set = this.setComponent;
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
        var _this = this;
        Object.keys(this.components).forEach(function (type) {
            _this.removeComponent(type);
        });
        this.id = ++instanceIdx;
        this.componentChangeListeners = new Set();
        return this;
    };
    Entity.prototype.onComponentChange = function (listener) {
        var _this = this;
        this.componentChangeListeners.add(listener);
        return function () { return _this.componentChangeListeners.delete(listener); };
    };
    Entity.prototype.hasComponent = function (type) {
        return !!this.components[type];
    };
    Entity.prototype.getComponent = function (type) {
        if (this.hasComponent(type)) {
            return this.components[type].value;
        }
        else {
            throw new Error("Entity does not contain component of " + type + ".");
        }
    };
    Entity.prototype.setComponent = function (type, value) {
        if (this.hasComponent(type)) {
            if (typeof value === 'object') {
                Object.assign(this.getComponent(type), value);
            }
            else {
                this.components[type].value = value;
            }
        }
        else {
            throw new Error("Entity does not contain component of type " + type + ".");
        }
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
    return Entity;
}());
exports.default = Entity;
//# sourceMappingURL=Entity.js.map