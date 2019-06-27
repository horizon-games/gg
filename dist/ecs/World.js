"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var EntityManager_1 = __importDefault(require("./EntityManager"));
var World = /** @class */ (function () {
    function World(_a) {
        var poolSize = (_a === void 0 ? { poolSize: 1000 } : _a).poolSize;
        this.manager = new EntityManager_1.default();
        this.systems = new Map();
        this.manager = new EntityManager_1.default({ poolSize: poolSize });
    }
    Object.defineProperty(World.prototype, "systemTypes", {
        get: function () {
            return Array.from(this.systems.keys());
        },
        enumerable: true,
        configurable: true
    });
    World.prototype.addSystem = function (system) {
        if (!this.systems.has(system.type)) {
            this.systems.set(system.type, system);
            system.init(this.manager);
        }
        else {
            throw new Error("World: Could not add system as '" + system.type + "' already exists.");
        }
    };
    World.prototype.addSystems = function () {
        var _this = this;
        var systems = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            systems[_i] = arguments[_i];
        }
        systems.forEach(function (system) { return _this.addSystem(system); });
    };
    World.prototype.removeSystem = function (type) {
        var system = this.systems.get(type);
        if (system) {
            this.systems.delete(type);
            return system;
        }
        else {
            throw new Error("World: Could not delete system as '" + type + "' does not exists.");
        }
    };
    World.prototype.hasSystem = function (type) {
        return this.systems.has(type);
    };
    World.prototype.getSystem = function (type) {
        var system = this.systems.get(type);
        if (system) {
            return system;
        }
        else {
            throw new Error("World: Could not get system as '" + type + "' does not exists.");
        }
    };
    World.prototype.addArchetype = function (archetype) {
        this.manager.addArchetype(archetype);
    };
    World.prototype.removeArchetype = function (archetypeID) {
        this.manager.removeArchetype(archetypeID);
    };
    World.prototype.hasArchetype = function (archetypeID) {
        return this.manager.hasArchetype(archetypeID);
    };
    World.prototype.getArchetype = function (archetypeID) {
        return this.manager.getArchetype(archetypeID);
    };
    World.prototype.createEntity = function (components) {
        if (components === void 0) { components = []; }
        return this.manager.renewEntity(components);
    };
    World.prototype.removeEntity = function (entityId) {
        var entity = this.getEntity(entityId);
        if (entity) {
            this.manager.releaseEntity(entity);
        }
    };
    World.prototype.getEntity = function (entityId) {
        return this.manager.getEntity(entityId);
    };
    World.prototype.getEntities = function (entityIds) {
        return entityIds.map(this.getEntity.bind(this));
    };
    World.prototype.update = function (dt, time) {
        var _this = this;
        this.systems.forEach(function (system) {
            if (system.enabled) {
                system.update(_this.manager, dt, time);
            }
        });
    };
    return World;
}());
exports.default = World;
//# sourceMappingURL=World.js.map