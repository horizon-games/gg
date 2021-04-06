"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Entity_1 = __importDefault(require("./Entity"));
class EntityManager {
    constructor() {
        this.entities = new Map();
        this.archetypes = new Map();
        this.entityChangeDisposers = new Map();
    }
    filter(types) {
        return Array.from(this.entities.values()).filter((entity) => entity.hasComponents(...types));
    }
    addEntity(entity) {
        if (!this.entities.has(entity.id)) {
            this.entities.set(entity.id, entity);
            // Add entity listener
            this.entityChangeDisposers.set(entity.id, entity.onChange((ev) => {
                const { type, entity, component } = ev;
                switch (type) {
                    case 'add':
                        this.handleEntityAddComponent(entity, component);
                        break;
                    case 'remove':
                        this.handleEntityRemoveComponent(entity, component);
                }
            }));
            // Add entity to archetypes
            for (const archetype of this.archetypes.values()) {
                archetype.handleEntityAdd(entity);
            }
        }
    }
    removeEntity(entity) {
        if (this.entities.has(entity.id)) {
            this.entities.delete(entity.id);
            // clean up entity listener disposers
            if (this.entityChangeDisposers.has(entity.id)) {
                this.entityChangeDisposers.get(entity.id)();
                this.entityChangeDisposers.delete(entity.id);
            }
            // Remove entity from archetypes
            for (const archetype of this.archetypes.values()) {
                archetype.handleEntityRemove(entity);
            }
            entity.reset();
        }
    }
    hasEntity(entityId) {
        return this.entities.has(entityId);
    }
    getEntity(entityId) {
        return this.entities.get(entityId);
    }
    renewEntity(components = []) {
        const entity = new Entity_1.default(components);
        this.addEntity(entity);
        return entity;
    }
    releaseEntity(entity) {
        if (this.hasEntity(entity.id)) {
            this.removeEntity(entity);
        }
    }
    addArchetype(klass) {
        const type = klass.name;
        if (!this.archetypes.has(type)) {
            const archetype = new klass();
            this.archetypes.set(type, archetype);
            // Add matching entities to archetypes
            for (const entity of this.entities.values()) {
                archetype.handleEntityAdd(entity);
            }
            return archetype;
        }
        else {
            throw new Error(`EntityManager: Could not add archetype as '${type}' already exists.`);
        }
    }
    removeArchetype(klass) {
        const archetype = this.archetypes.get(klass.name);
        if (archetype) {
            this.archetypes.delete(klass.name);
            return archetype;
        }
        else {
            throw new Error(`EntityManager: Could not delete archetype as '${klass.name}' does not exists.`);
        }
    }
    hasArchetype(klass) {
        return this.archetypes.has(klass.name);
    }
    getArchetype(klass) {
        const archetype = this.archetypes.get(klass.name);
        if (archetype) {
            return archetype;
        }
        else {
            throw new Error(`EntityManager: Could not get archetype as '${klass.name}' does not exists.`);
        }
    }
    handleEntityAddComponent(entity, component) {
        if (this.hasEntity(entity.id)) {
            for (const archetype of this.archetypes.values()) {
                archetype.handleEntityChange(entity, component);
            }
        }
    }
    handleEntityRemoveComponent(entity, component) {
        if (this.hasEntity(entity.id)) {
            for (const archetype of this.archetypes.values()) {
                archetype.handleEntityChange(entity, component);
            }
        }
    }
}
exports.default = EntityManager;
//# sourceMappingURL=EntityManager.js.map