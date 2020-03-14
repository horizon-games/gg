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
        var type = system.constructor.name;
        if (!this.systems.has(type)) {
            this.systems.set(type, system);
            system.init(this.manager);
        }
        else {
            throw new Error("World: Could not add system as '" + type + "' already exists.");
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
    World.prototype.removeSystem = function (klass) {
        var system = this.systems.get(klass.name);
        if (system) {
            this.systems.delete(klass.name);
            return system;
        }
        else {
            throw new Error("World: Could not delete system as '" + klass.name + "' does not exists.");
        }
    };
    World.prototype.hasSystem = function (klass) {
        return this.systems.has(klass.name);
    };
    World.prototype.getSystem = function (klass) {
        var system = this.systems.get(klass.name);
        if (system) {
            return system;
        }
        else {
            throw new Error("World: Could not get system as '" + klass.name + "' does not exists.");
        }
    };
    World.prototype.addArchetype = function (klass) {
        return this.manager.addArchetype(klass);
    };
    World.prototype.removeArchetype = function (klass) {
        return this.manager.removeArchetype(klass);
    };
    World.prototype.hasArchetype = function (klass) {
        return this.manager.hasArchetype(klass);
    };
    World.prototype.getArchetype = function (klass) {
        return this.manager.getArchetype(klass);
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