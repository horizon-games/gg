"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Archetype = /** @class */ (function () {
    function Archetype(id, filters) {
        if (filters === void 0) { filters = []; }
        this.entities = [];
        this.id = id;
        this.filters = filters;
    }
    Archetype.prototype.matchesEntity = function (entity) {
        return this.filters.every(function (filter) { return filter(entity); });
    };
    Archetype.prototype.hasEntity = function (entity) {
        return this.entities.indexOf(entity) !== -1;
    };
    Archetype.prototype.handleEntityComponentChange = function (entity) {
        if (this.hasEntity(entity)) {
            // Does this entity need to be removed
            if (!this.matchesEntity(entity)) {
                this.handleEntityRemove(entity);
            }
        }
        else {
            // Does this entity need to be added
            if (this.matchesEntity(entity)) {
                this.handleEntityAdd(entity);
            }
        }
    };
    Archetype.prototype.handleEntityAdd = function (entity) {
        if (this.matchesEntity(entity)) {
            if (!this.hasEntity(entity)) {
                this.entities.push(entity);
            }
        }
    };
    Archetype.prototype.handleEntityRemove = function (entity) {
        if (this.hasEntity(entity)) {
            var idx = this.entities.indexOf(entity);
            if (idx !== -1) {
                this.entities.splice(idx, 1);
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
        return function (entity) { return !entity.hasComponents.apply(entity, componentTypes); };
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
    return Archetype;
}());
exports.default = Archetype;
//# sourceMappingURL=Archetype.js.map