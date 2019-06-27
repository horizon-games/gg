"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var EntityPool_1 = __importDefault(require("./EntityPool"));
var EntityManager = /** @class */ (function () {
    function EntityManager(_a) {
        var poolSize = (_a === void 0 ? { poolSize: 1000 } : _a).poolSize;
        this.entities = new Map();
        this.archetypes = new Map();
        this.entityChangeDisposers = new Map();
        this.entityPool = new EntityPool_1.default(poolSize);
    }
    EntityManager.prototype.filter = function (types) {
        return Array.from(this.entities.values()).filter(function (entity) {
            return entity.hasComponents.apply(entity, types);
        });
    };
    EntityManager.prototype.addEntity = function (entity) {
        var _this = this;
        if (!this.entities.has(entity.id)) {
            this.entities.set(entity.id, entity);
            // Add entity listener
            this.entityChangeDisposers.set(entity.id, entity.onChange(function (ev) {
                var type = ev.type, entity = ev.entity, component = ev.component;
                switch (type) {
                    case 'add':
                        _this.handleEntityAddComponent(entity, component);
                        break;
                    case 'remove':
                        _this.handleEntityRemoveComponent(entity, component);
                }
            }));
            // Add entity to archetypes
            this.archetypes.forEach(function (archetype) {
                archetype.handleEntityAdd(entity);
            });
        }
    };
    EntityManager.prototype.removeEntity = function (entity) {
        if (this.entities.has(entity.id)) {
            this.entities.delete(entity.id);
            // clean up entity listener disposers
            if (this.entityChangeDisposers.has(entity.id)) {
                this.entityChangeDisposers.get(entity.id)();
                this.entityChangeDisposers.delete(entity.id);
            }
            // Remove entity from archetypes
            this.archetypes.forEach(function (archetype) {
                archetype.handleEntityRemove(entity);
            });
        }
    };
    EntityManager.prototype.hasEntity = function (entityId) {
        return this.entities.has(entityId);
    };
    EntityManager.prototype.getEntity = function (entityId) {
        return this.entities.get(entityId);
    };
    EntityManager.prototype.renewEntity = function (components) {
        if (components === void 0) { components = []; }
        var entity = this.entityPool.renew(components);
        this.addEntity(entity);
        return entity;
    };
    EntityManager.prototype.releaseEntity = function (entity) {
        if (this.hasEntity(entity.id)) {
            this.removeEntity(entity);
            this.entityPool.release(entity);
        }
    };
    EntityManager.prototype.addArchetype = function (archetype) {
        this.archetypes.set(archetype.id, archetype);
        // Add matching entities to archetypes
        this.entities.forEach(function (entity) {
            archetype.handleEntityAdd(entity);
        });
    };
    EntityManager.prototype.removeArchetype = function (archetypeID) {
        this.archetypes.delete(archetypeID);
    };
    EntityManager.prototype.hasArchetype = function (archetypeID) {
        return this.archetypes.has(archetypeID);
    };
    EntityManager.prototype.getArchetype = function (archetypeID) {
        var archetype = this.archetypes.get(archetypeID);
        if (archetype) {
            return archetype;
        }
        else {
            throw new Error('EntityManager does not contain Archetype');
        }
    };
    EntityManager.prototype.handleEntityAddComponent = function (entity, component) {
        if (this.hasEntity(entity.id)) {
            this.archetypes.forEach(function (archetype) {
                archetype.handleEntityChange(entity, component);
            });
        }
    };
    EntityManager.prototype.handleEntityRemoveComponent = function (entity, component) {
        if (this.hasEntity(entity.id)) {
            this.archetypes.forEach(function (archetype) {
                archetype.handleEntityChange(entity, component);
            });
        }
    };
    return EntityManager;
}());
exports.default = EntityManager;
//# sourceMappingURL=EntityManager.js.map