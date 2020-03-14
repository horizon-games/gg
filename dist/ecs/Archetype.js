"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Archetype = /** @class */ (function () {
    function Archetype() {
        this.include = function () {
            var componentTypes = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                componentTypes[_i] = arguments[_i];
            }
            return function (entity) { return entity.hasComponents.apply(entity, componentTypes); };
        };
        this.exclude = function () {
            var componentTypes = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                componentTypes[_i] = arguments[_i];
            }
            return function (entity) { return componentTypes.every(function (type) { return !entity.hasComponent(type); }); };
        };
        this.only = function () {
            var componentTypes = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                componentTypes[_i] = arguments[_i];
            }
            return function (entity) {
                return componentTypes.length === entity.componentTypes.length && entity.hasComponents.apply(entity, componentTypes);
            };
        };
        this.any = function () {
            var componentTypes = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                componentTypes[_i] = arguments[_i];
            }
            return function (entity) { return componentTypes.some(function (type) { return entity.hasComponent(type); }); };
        };
        this.filters = [];
        this.entities = [];
        this.onChangeListeners = new Set();
        this.onAddListeners = new Set();
        this.onRemoveListeners = new Set();
    }
    Archetype.prototype.onChange = function (listener) {
        var _this = this;
        this.onChangeListeners.add(listener);
        return function () { return _this.onChangeListeners.delete(listener); };
    };
    Archetype.prototype.onAdd = function (listener) {
        var _this = this;
        this.onAddListeners.add(listener);
        return function () { return _this.onAddListeners.delete(listener); };
    };
    Archetype.prototype.onRemove = function (listener) {
        var _this = this;
        this.onRemoveListeners.add(listener);
        return function () { return _this.onRemoveListeners.delete(listener); };
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
        if (this.matchesEntity(entity)) {
            if (!this.hasEntity(entity)) {
                var ev_1 = {
                    type: 'add',
                    archetype: this,
                    entity: entity,
                    component: component
                };
                this.entities.push(entity);
                this.onAddListeners.forEach(function (listener) { return listener(ev_1); });
                this.onChangeListeners.forEach(function (listener) { return listener(ev_1); });
            }
        }
    };
    Archetype.prototype.handleEntityRemove = function (entity, component) {
        if (this.hasEntity(entity)) {
            var idx = this.entities.indexOf(entity);
            if (idx !== -1) {
                var ev_2 = {
                    type: 'remove',
                    archetype: this,
                    entity: entity,
                    component: component
                };
                this.entities.splice(idx, 1);
                this.onRemoveListeners.forEach(function (listener) { return listener(ev_2); });
                this.onChangeListeners.forEach(function (listener) { return listener(ev_2); });
            }
        }
    };
    return Archetype;
}());
exports.default = Archetype;
//# sourceMappingURL=Archetype.js.map