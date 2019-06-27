"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Archetype = /** @class */ (function () {
    function Archetype(id, filters) {
        if (filters === void 0) { filters = []; }
        this.entities = [];
        this.onChangeListeners = new Set();
        this.id = id;
        this.filters = filters;
    }
    Archetype.prototype.onChange = function (listener) {
        var _this = this;
        this.onChangeListeners.add(listener);
        return function () { return _this.onChangeListeners.delete(listener); };
    };
    Archetype.prototype.matchesEntity = function (entity) {
        return this.filters.every(function (filter) { return filter(entity); });
    };
    Archetype.prototype.hasEntity = function (entity) {
        return this.entities.indexOf(entity) !== -1;
    };
    Archetype.prototype.handleEntityChange = function (entity, component) {
        if (this.hasEntity(entity)) {
            // Does this entity need to be removed
            if (!this.matchesEntity(entity)) {
                this.handleEntityRemove(entity, component);
            }
        }
        else {
            // Does this entity need to be added
            if (this.matchesEntity(entity)) {
                this.handleEntityAdd(entity, component);
            }
        }
    };
    Archetype.prototype.handleEntityAdd = function (entity, component) {
        var _this = this;
        if (this.matchesEntity(entity)) {
            if (!this.hasEntity(entity)) {
                this.entities.push(entity);
                this.onChangeListeners.forEach(function (listener) {
                    return listener({ type: 'add', archetype: _this, entity: entity, component: component });
                });
            }
        }
    };
    Archetype.prototype.handleEntityRemove = function (entity, component) {
        var _this = this;
        if (this.hasEntity(entity)) {
            var idx = this.entities.indexOf(entity);
            if (idx !== -1) {
                this.entities.splice(idx, 1);
                this.onChangeListeners.forEach(function (listener) {
                    return listener({ type: 'remove', archetype: _this, entity: entity, component: component });
                });
            }
        }
    };
    Archetype.include = function () {
        var componentTypes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            componentTypes[_i] = arguments[_i];
        }
        return function (entity) { return entity.hasComponents.apply(entity, componentTypes); };
    };
    Archetype.exclude = function () {
        var componentTypes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            componentTypes[_i] = arguments[_i];
        }
        return function (entity) {
            return componentTypes.every(function (type) { return !entity.hasComponent(type); });
        };
    };
    Archetype.only = function () {
        var componentTypes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            componentTypes[_i] = arguments[_i];
        }
        return function (entity) {
            return componentTypes.length === entity.componentTypes.length && entity.hasComponents.apply(entity, componentTypes);
        };
    };
    Archetype.any = function () {
        var componentTypes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            componentTypes[_i] = arguments[_i];
        }
        return function (entity) {
            return componentTypes.some(function (type) { return entity.hasComponent(type); });
        };
    };
    return Archetype;
}());
exports.default = Archetype;
//# sourceMappingURL=Archetype.js.map