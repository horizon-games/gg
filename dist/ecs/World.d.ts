import Archetype from './Archetype';
import { ComponentTypes } from './Component';
import Entity from './Entity';
import EntityManager from './EntityManager';
import System from './System';
declare type ValueOf<T> = T[keyof T];
interface WorldOptions {
    poolSize: number;
}
export default class World<C extends ComponentTypes> {
    manager: EntityManager<C>;
    private systems;
    constructor({ poolSize }?: WorldOptions);
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
    createEntity(components?: ValueOf<C>[]): Entity<C>;
    removeEntity(entityId: number): void;
    getEntity: (entityId: number) => Entity<C> | undefined;
    getEntities(entityIds: number[]): (Entity<C> | undefined)[];
    update(dt: number, time: number): void;
}
export {};
//# sourceMappingURL=World.d.ts.map