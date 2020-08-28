"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Archetype {
    constructor() {
        this.include = (...componentTypes) => (entity) => entity.hasComponents(...componentTypes);
        this.exclude = (...componentTypes) => (entity) => componentTypes.every((type) => !entity.hasComponent(type));
        this.only = (...componentTypes) => (entity) => componentTypes.length === entity.componentTypes.length &&
            entity.hasComponents(...componentTypes);
        this.any = (...componentTypes) => (entity) => componentTypes.some((type) => entity.hasComponent(type));
        this.filters = [];
        this.entities = [];
        this.onChangeListeners = new Set();
        this.onAddListeners = new Set();
        this.onRemoveListeners = new Set();
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
    }
    handleEntityAdd(entity, component) {
        if (this.matchesEntity(entity)) {
            if (!this.hasEntity(entity)) {
                const ev = {
                    type: 'add',
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
                    type: 'remove',
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
exports.default = Archetype;
//# sourceMappingURL=Archetype.js.map