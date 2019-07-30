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
    readonly systemTypes: string[];
    addSystem(system: System<C>): void;
    addSystems(...systems: Array<System<C>>): void;
    removeSystem(type: string): System<C>;
    hasSystem<T extends System<C>>(klass: {
        new (...args: any[]): T;
    }): boolean;
    getSystem<T extends System<C>>(klass: {
        new (...args: any[]): T;
    }): T;
    addArchetype(archetype: Archetype<C>): void;
    removeArchetype(archetypeID: number): void;
    hasArchetype(archetypeID: number): boolean;
    getArchetype(archetypeID: number): Archetype<C>;
    createEntity(components?: Array<ValueOf<C>>): Entity<C>;
    removeEntity(entityId: number): void;
    getEntity(entityId: number): Entity<C> | undefined;
    getEntities(entityIds: number[]): Array<Entity<C>>;
    update(dt: number, time: number): void;
}
export {};
//# sourceMappingURL=World.d.ts.map