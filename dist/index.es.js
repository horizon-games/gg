var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
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
const UNDEFINED_ID = -1;
let instanceIdx = 0;
class Entity {
  constructor(components = []) {
    __publicField(this, "id", UNDEFINED_ID);
    __publicField(this, "components", {});
    __publicField(this, "onChangeListeners", /* @__PURE__ */ new Set());
    // tslint:disable-next-line
    __publicField(this, "has", this.hasComponent);
    __publicField(this, "hasComponents", (...types) => {
      return types.every((type) => this.hasComponent(type));
    });
    __publicField(this, "addComponent", (component) => {
      if (!this.hasComponent(component.type)) {
        this.components[component.type] = component;
        component.onAttach(this);
        for (const listener of this.onChangeListeners) {
          listener({ type: "add", entity: this, component });
        }
      } else {
        throw new Error(
          `Entity already contains component of type ${component.type}.`
        );
      }
    });
    // tslint:disable-next-line
    __publicField(this, "add", this.addComponent);
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
    this.renew(components);
  }
  get componentTypes() {
    return Object.keys(this.components);
  }
  renew(components = []) {
    for (const component of components) {
      this.addComponent(component);
    }
    return this;
  }
  reset() {
    for (const type of this.componentTypes.reverse()) {
      this.removeComponent(type);
    }
    this.id = ++instanceIdx;
    this.onChangeListeners = /* @__PURE__ */ new Set();
    return this;
  }
  onChange(listener) {
    this.onChangeListeners.add(listener);
    return () => this.onChangeListeners.delete(listener);
  }
  removeOnChange(listener) {
    if (this.onChangeListeners.has(listener)) {
      this.onChangeListeners.delete(listener);
    }
  }
  hasComponent(type) {
    return !!this.components[type];
  }
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
  // Get component instance
  getComponent(type) {
    return this.components[type];
  }
  getComponentValue(type) {
    if (this.hasComponent(type)) {
      return this.components[type].value;
    } else {
      throw new Error(
        `Entity does not contain component of type ${String(type)}.`
      );
    }
  }
  setComponentValue(type, value) {
    if (this.hasComponent(type)) {
      if (typeof value === "object" && !Array.isArray(value)) {
        Object.assign(this.components[type].value, value);
      } else {
        this.components[type].value = value;
      }
    } else {
      throw new Error(
        `Entity does not contain component of type ${String(type)}.`
      );
    }
  }
}
class EntityManager {
  constructor() {
    __publicField(this, "entities", /* @__PURE__ */ new Map());
    __publicField(this, "archetypes", /* @__PURE__ */ new Map());
    __publicField(this, "entityChangeDisposers", /* @__PURE__ */ new Map());
  }
  filter(types) {
    return Array.from(this.entities.values()).filter(
      (entity) => entity.hasComponents(...types)
    );
  }
  addEntity(entity) {
    if (!this.entities.has(entity.id)) {
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
  removeEntity(entity) {
    if (this.entities.has(entity.id)) {
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
  hasEntity(entityId) {
    return this.entities.has(entityId);
  }
  getEntity(entityId) {
    return this.entities.get(entityId);
  }
  renewEntity(components = []) {
    const entity = new Entity(components);
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
      for (const entity of this.entities.values()) {
        archetype.handleEntityAdd(entity);
      }
      return archetype;
    } else {
      throw new Error(
        `EntityManager: Could not add archetype as '${type}' already exists.`
      );
    }
  }
  removeArchetype(klass) {
    const archetype = this.archetypes.get(klass.name);
    if (archetype) {
      this.archetypes.delete(klass.name);
      return archetype;
    } else {
      throw new Error(
        `EntityManager: Could not delete archetype as '${klass.name}' does not exists.`
      );
    }
  }
  hasArchetype(klass) {
    return this.archetypes.has(klass.name);
  }
  getArchetype(klass) {
    const archetype = this.archetypes.get(klass.name);
    if (archetype) {
      return archetype;
    } else {
      throw new Error(
        `EntityManager: Could not get archetype as '${klass.name}' does not exists.`
      );
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
  constructor({} = {}) {
    __publicField(this, "manager", new EntityManager());
    __publicField(this, "systems", /* @__PURE__ */ new Map());
    __publicField(this, "getEntity", (entityId) => {
      return this.manager.getEntity(entityId);
    });
    this.manager = new EntityManager();
  }
  get systemTypes() {
    return Array.from(this.systems.keys());
  }
  addSystem(system) {
    const type = system.constructor.name;
    if (!this.systems.has(type)) {
      this.systems.set(type, system);
      system.init(this.manager);
    } else {
      throw new Error(
        `World: Could not add system as '${type}' already exists.`
      );
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
    } else {
      throw new Error(
        `World: Could not delete system as '${klass.name}' does not exists.`
      );
    }
  }
  hasSystem(klass) {
    return this.systems.has(klass.name);
  }
  getSystem(klass) {
    const system = this.systems.get(klass.name);
    if (system) {
      return system;
    } else {
      throw new Error(
        `World: Could not get system as '${klass.name}' does not exists.`
      );
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
export {
  Archetype,
  Component,
  EntityManager,
  System,
  World
};
