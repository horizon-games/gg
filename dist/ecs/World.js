"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EntityManager_1 = __importDefault(require("./EntityManager"));
class World {
    constructor({} = {}) {
        this.manager = new EntityManager_1.default();
        this.systems = new Map();
        this.getEntity = (entityId) => {
            return this.manager.getEntity(entityId);
        };
        this.manager = new EntityManager_1.default();
    }
    get systemTypes() {
        return Array.from(this.systems.keys());
    }
    addSystem(system) {
        const type = system.constructor.name;
        if (!this.systems.has(type)) {
            this.systems.set(type, system);
            system.init(this.manager);
        }
        else {
            throw new Error(`World: Could not add system as '${type}' already exists.`);
        }
    }
    addSystems(...systems) {
        for (const system of systems) {
            this.addSystem(system);
        }
    }
    removeSystem(klass) {
        const system = this.systems.get(klass.name);
        if (system) {
            this.systems.delete(klass.name);
            return system;
        }
        else {
            throw new Error(`World: Could not delete system as '${klass.name}' does not exists.`);
        }
    }
    hasSystem(klass) {
        return this.systems.has(klass.name);
    }
    getSystem(klass) {
        const system = this.systems.get(klass.name);
        if (system) {
            return system;
        }
        else {
            throw new Error(`World: Could not get system as '${klass.name}' does not exists.`);
        }
    }
    addArchetype(klass) {
        return this.manager.addArchetype(klass);
    }
    removeArchetype(klass) {
        return this.manager.removeArchetype(klass);
    }
    hasArchetype(klass) {
        return this.manager.hasArchetype(klass);
    }
    getArchetype(klass) {
        return this.manager.getArchetype(klass);
    }
    createEntity(components = []) {
        return this.manager.renewEntity(components);
    }
    removeEntity(entityId) {
        const entity = this.getEntity(entityId);
        if (entity) {
            this.manager.releaseEntity(entity);
        }
    }
    getEntities(entityIds) {
        return entityIds.map(this.getEntity);
    }
    update(dt, time) {
        for (const system of this.systems.values()) {
            if (system.enabled) {
                system.update(this.manager, dt, time);
            }
        }
    }
}
exports.default = World;
//# sourceMappingURL=World.js.map