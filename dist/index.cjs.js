"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
class Archetype {
  constructor() {
    __publicField(this, "include", (...componentTypes) => (entity) => entity.hasComponents(...componentTypes));
    __publicField(this, "exclude", (...componentTypes) => (entity) => componentTypes.every((type) => !entity.hasComponent(type)));
    __publicField(this, "only", (...componentTypes) => (entity) => componentTypes.length === entity.componentTypes.length && entity.hasComponents(...componentTypes));
    __publicField(this, "any", (...componentTypes) => (entity) => componentTypes.some((type) => entity.hasComponent(type)));
    __publicField(this, "filters", []);
    __publicField(this, "entities", []);
    __publicField(this, "onChangeListeners", /* @__PURE__ */ new Set());
    __publicField(this, "onAddListeners", /* @__PURE__ */ new Set());
    __publicField(this, "onRemoveListeners", /* @__PURE__ */ new Set());
  }
  onChange(listener) {
    this.onChangeListeners.add(listener);
    return () => this.onChangeListeners.delete(listener);
  }
  onAdd(listener) {
    this.onAddListeners.add(listener);
    return () => this.onAddListeners.delete(listener);
  }
  onRemove(listener) {
    this.onRemoveListeners.add(listener);
    return () => this.onRemoveListeners.delete(listener);
  }
  matchesEntity(entity) {
    return this.filters.every((filter) => filter(entity));
  }
  hasEntity(entity) {
    return this.entities.indexOf(entity) !== -1;
  }
  handleEntityChange(entity, component) {
    if (this.hasEntity(entity)) {
      if (!this.matchesEntity(entity)) {
        this.handleEntityRemove(entity, component);
      }
    } else {
      if (this.matchesEntity(entity)) {
        this.handleEntityAdd(entity, component);
      }
    }
  }
  handleEntityAdd(entity, component) {
    if (this.matchesEntity(entity)) {
      if (!this.hasEntity(entity)) {
        const ev = {
          type: "add",
          archetype: this,
          entity,
          component
        };
        this.entities.push(entity);
        for (const listener of this.onAddListeners) {
          listener(ev);
        }
        for (const listener of this.onChangeListeners) {
          listener(ev);
        }
      }
    }
  }
  handleEntityRemove(entity, component) {
    if (this.hasEntity(entity)) {
      const idx = this.entities.indexOf(entity);
      if (idx !== -1) {
        const ev = {
          type: "remove",
          archetype: this,
          entity,
          component
        };
        this.entities.splice(idx, 1);
        for (const listener of this.onRemoveListeners) {
          listener(ev);
        }
        for (const listener of this.onChangeListeners) {
          listener(ev);
        }
      }
    }
  }
}
const ComponentTypeRegExp = /Component$/;
function getComponentTypeFromClass(klass) {
  const name = klass.name;
  const noUnderscoreName = name.replace(/^_?/, "");
  return noUnderscoreName.charAt(0).toLowerCase() + noUnderscoreName.slice(1).replace(ComponentTypeRegExp, "");
}
class Component {
  constructor(value) {
    __publicField(this, "type", getComponentTypeFromClass(this.constructor));
    this.value = value;
  }
  onAttach(_entity) {
  }
  onDetach(_entity) {
  }
}
const UNDEFINED_ID = -1;
let instanceIdx = 0;
class Entity {
  constructor(components = []) {
    __publicField(this, "id", UNDEFINED_ID);
    __publicField(this, "components", {});
    __publicField(this, "onChangeListeners", /* @__PURE__ */ new Set());
    // tslint:disable-next-line
    __publicField(this, "has", this.hasComponent);
    /**
     * Check if the entity has multiple components
     */
    __publicField(this, "hasComponents", (...types) => {
      return types.every((type) => this.hasComponent(type));
    });
    /**
     * Add a component to the entity
     */
    __publicField(this, "addComponent", (component) => {
      if (this.hasComponent(component.type)) {
        throw new Error(
          `Entity already contains component of type ${component.type}.`
        );
      }
      this.components[component.type] = component;
      component.onAttach(this);
      for (const listener of this.onChangeListeners) {
        listener({ type: "add", entity: this, component });
      }
    });
    // tslint:disable-next-line
    __publicField(this, "add", this.addComponent);
    /**
     * Add multiple components to the entity
     */
    __publicField(this, "addComponents", (components) => {
      for (const component of components) {
        this.addComponent(component);
      }
    });
    /**
     * Remove a component from the entity
     */
    __publicField(this, "removeComponent", (type) => {
      if (this.hasComponent(type)) {
        const component = this.components[type];
        delete this.components[type];
        component.onDetach(this);
        for (const listener of this.onChangeListeners) {
          listener({ type: "remove", entity: this, component });
        }
      }
    });
    // tslint:disable-next-line
    __publicField(this, "remove", this.removeComponent);
    // tslint:disable-next-line
    __publicField(this, "toggle", this.toggleComponent);
    // tslint:disable-next-line
    __publicField(this, "get", this.getComponentValue);
    // tslint:disable-next-line
    __publicField(this, "set", this.setComponentValue);
    this.reset();
    this.addComponents(components);
  }
  /** List of components */
  get componentTypes() {
    return Object.keys(this.components);
  }
  /**
   * Reset the entity to its initial state
   */
  reset() {
    for (const type of this.componentTypes.reverse()) {
      this.removeComponent(type);
    }
    this.id = ++instanceIdx;
    this.onChangeListeners = /* @__PURE__ */ new Set();
    return this;
  }
  /**
   * Clone an Entity
   */
  clone() {
    return new Entity(Object.values(this.components));
  }
  /**
   * Attach an onChange listener to the entity
   */
  onChange(listener) {
    this.onChangeListeners.add(listener);
    return () => this.onChangeListeners.delete(listener);
  }
  /**
   * Remove an onChange listener from the entity
   */
  removeOnChange(listener) {
    if (this.onChangeListeners.has(listener)) {
      this.onChangeListeners.delete(listener);
    }
  }
  /**
   * Check if the entity has a component
   */
  hasComponent(type) {
    return !!this.components[type];
  }
  /**
   * Add or remove a component based on a predicated value
   */
  toggleComponent(componentClass, predicate) {
    const componentType = getComponentTypeFromClass(componentClass);
    if (predicate) {
      if (!this.hasComponent(componentType)) {
        this.addComponent(new componentClass());
      }
    } else {
      this.removeComponent(componentType);
    }
  }
  /**
   * Get the component on the entity
   */
  getComponent(type) {
    return this.components[type];
  }
  /**
   * Get the value of the component on the entity
   */
  getComponentValue(type) {
    if (!this.hasComponent(type)) {
      throw new Error(
        `Entity does not contain component of type ${String(type)}.`
      );
    }
    return this.components[type].value;
  }
  /**
   * Set the value of the component on the entity
   */
  setComponentValue(type, value) {
    if (!this.hasComponent(type)) {
      throw new Error(
        `Entity does not contain component of type ${String(type)}.`
      );
    }
    if (typeof value === "object" && !Array.isArray(value)) {
      Object.assign(this.components[type].value, value);
    } else {
      this.components[type].value = value;
    }
  }
}
class EntityManager {
  constructor() {
    __publicField(this, "entities", /* @__PURE__ */ new Map());
    __publicField(this, "archetypes", /* @__PURE__ */ new Map());
    __publicField(this, "entityChangeDisposers", /* @__PURE__ */ new Map());
  }
  /**
   * Filter entities by component types
   */
  filter(types) {
    return Array.from(this.entities.values()).filter(
      (entity) => entity.hasComponents(...types)
    );
  }
  /**
   * Add an entity to the manager
   */
  addEntity(entity) {
    if (!this.hasEntity(entity.id)) {
      this.entities.set(entity.id, entity);
      this.entityChangeDisposers.set(
        entity.id,
        entity.onChange((ev) => {
          const { type, entity: entity2, component } = ev;
          switch (type) {
            case "add":
              this.handleEntityAddComponent(entity2, component);
              break;
            case "remove":
              this.handleEntityRemoveComponent(entity2, component);
          }
        })
      );
      for (const archetype of this.archetypes.values()) {
        archetype.handleEntityAdd(entity);
      }
    }
  }
  /**
   * Remove an entity from the manager
   */
  removeEntity(entity) {
    if (this.hasEntity(entity.id)) {
      this.entities.delete(entity.id);
      if (this.entityChangeDisposers.has(entity.id)) {
        this.entityChangeDisposers.get(entity.id)();
        this.entityChangeDisposers.delete(entity.id);
      }
      for (const archetype of this.archetypes.values()) {
        archetype.handleEntityRemove(entity);
      }
      entity.reset();
    }
  }
  /**
   * Check if the manager has an entity
   */
  hasEntity(entityId) {
    return this.entities.has(entityId);
  }
  /**
   * Get an entity from the manager
   */
  getEntity(entityId) {
    return this.entities.get(entityId);
  }
  /**
   * Create a new entity and add it to the manager
   */
  createEntity(components = []) {
    const entity = new Entity(components);
    this.addEntity(entity);
    return entity;
  }
  /**
   * Add an archetype to the manager
   */
  addArchetype(klass) {
    const type = klass.name;
    if (this.archetypes.has(type)) {
      throw new Error(
        `EntityManager: Could not add archetype as '${type}' already exists.`
      );
    }
    const archetype = new klass();
    this.archetypes.set(type, archetype);
    for (const entity of this.entities.values()) {
      archetype.handleEntityAdd(entity);
    }
    return archetype;
  }
  /**
   * Remove an archetype from the manager
   */
  removeArchetype(klass) {
    const archetype = this.archetypes.get(klass.name);
    if (!archetype) {
      throw new Error(
        `EntityManager: Could not delete archetype as '${klass.name}' does not exists.`
      );
    }
    this.archetypes.delete(klass.name);
    return archetype;
  }
  /**
   * Check if the manager has an archetype
   */
  hasArchetype(klass) {
    return this.archetypes.has(klass.name);
  }
  /**
   * Get an archetype from the manager
   */
  getArchetype(klass) {
    const archetype = this.archetypes.get(klass.name);
    if (!archetype) {
      throw new Error(
        `EntityManager: Could not get archetype as '${klass.name}' does not exists.`
      );
    }
    return archetype;
  }
  /**
   * Handle entity add component event
   */
  handleEntityAddComponent(entity, component) {
    if (this.hasEntity(entity.id)) {
      for (const archetype of this.archetypes.values()) {
        archetype.handleEntityChange(entity, component);
      }
    }
  }
  /**
   * Handle entity remove component event
   */
  handleEntityRemoveComponent(entity, component) {
    if (this.hasEntity(entity.id)) {
      for (const archetype of this.archetypes.values()) {
        archetype.handleEntityChange(entity, component);
      }
    }
  }
}
class System {
  constructor(options = {}) {
    __publicField(this, "enabled", true);
    Object.assign(this, options);
  }
  init(_) {
  }
  enable() {
    this.enabled = true;
  }
  disable() {
    this.enabled = false;
  }
}
class World {
  constructor(options = {}) {
    __publicField(this, "manager", new EntityManager());
    __publicField(this, "systems", /* @__PURE__ */ new Map());
    /**
     * Get an entity from the world
     */
    __publicField(this, "getEntity", (entityId) => {
      return this.manager.getEntity(entityId);
    });
    this.options = options;
    this.manager = new EntityManager();
  }
  /** List of systems */
  get systemTypes() {
    return Array.from(this.systems.keys());
  }
  /**
   * Add a system to the world and initialize it
   */
  addSystem(system) {
    const type = system.constructor.name;
    if (this.systems.has(type)) {
      throw new Error(
        `World: Could not add system as '${type}' already exists.`
      );
    }
    this.systems.set(type, system);
    system.init(this.manager);
  }
  /**
   * Add multiple systems to the world
   */
  addSystems(...systems) {
    for (const system of systems) {
      this.addSystem(system);
    }
  }
  /**
   * Remove a system from the world
   */
  removeSystem(klass) {
    const system = this.getSystem(klass);
    if (!system) {
      throw new Error(
        `World: Could not delete system as '${klass.name}' does not exist.`
      );
    }
    this.systems.delete(klass.name);
    return system;
  }
  /**
   * Check if a system exists in the world
   */
  hasSystem(klass) {
    return this.systems.has(klass.name);
  }
  /**
   * Get a system from the world
   */
  getSystem(klass) {
    const system = this.systems.get(klass.name);
    if (!system) {
      throw new Error(
        `World: Could not get system as '${klass.name}' does not exists.`
      );
    }
    return system;
  }
  /**
   * Add an archetype to the world
   */
  addArchetype(klass) {
    return this.manager.addArchetype(klass);
  }
  /**
   * Remove an archetype from the world
   */
  removeArchetype(klass) {
    return this.manager.removeArchetype(klass);
  }
  /**
   * Check if an archetype exists in the world
   */
  hasArchetype(klass) {
    return this.manager.hasArchetype(klass);
  }
  /**
   * Get an archetype from the world
   */
  getArchetype(klass) {
    return this.manager.getArchetype(klass);
  }
  /**
   * Create a new entity
   */
  createEntity(components = []) {
    return this.manager.createEntity(components);
  }
  /**
   * Remove an entity from the world
   */
  removeEntity(entityId) {
    const entity = this.getEntity(entityId);
    if (entity) {
      this.manager.removeEntity(entity);
    }
  }
  /**
   * Get multiple entities from the world
   */
  getEntities(entityIds) {
    return entityIds.map(this.getEntity);
  }
  /**
   * Update all systems
   */
  update(dt, time) {
    for (const system of this.systems.values()) {
      if (system.enabled) {
        system.update(this.manager, dt, time);
      }
    }
  }
}
exports.Archetype = Archetype;
exports.Component = Component;
exports.Entity = Entity;
exports.EntityManager = EntityManager;
exports.System = System;
exports.World = World;
//# sourceMappingURL=index.cjs.js.map
