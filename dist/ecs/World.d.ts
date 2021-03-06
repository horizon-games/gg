import type Archetype from './Archetype';
import type { ComponentOf, ComponentTypes } from './Component';
import type Entity from './Entity';
import EntityManager from './EntityManager';
import type System from './System';
interface WorldOptions {
}
export default class World<C extends ComponentTypes> {
    manager: EntityManager<C>;
    private systems;
    constructor({}?: WorldOptions);
    get systemTypes(): string[];
    addSystem(system: System<C>): void;
    addSystems(...systems: System<C>[]): void;
    removeSystem<T extends System<C>>(klass: new (...args: any[]) => T): System<C>;
    hasSystem<T extends System<C>>(klass: new (...args: any[]) => T): boolean;
    getSystem<T extends System<C>>(klass: new (...args: any[]) => T): T;
    addArchetype<T extends Archetype<C>>(klass: new (...args: any[]) => T): T;
    removeArchetype<T extends Archetype<C>>(klass: new (...args: any[]) => T): Archetype<C>;
    hasArchetype<T extends Archetype<C>>(klass: new (...args: any[]) => T): boolean;
    getArchetype<T extends Archetype<C>>(klass: new (...args: any[]) => T): T;
    createEntity(components?: ComponentOf<C>[]): Entity<C>;
    removeEntity(entityId: number): void;
    getEntity: (entityId: number) => Entity<C> | undefined;
    getEntities(entityIds: number[]): (Entity<C> | undefined)[];
    update(dt: number, time: number): void;
}
export {};
//# sourceMappingURL=World.d.ts.map