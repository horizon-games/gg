import { ComponentTypes, ComponentOf } from './Component';
import Archetype from './Archetype';
import Entity from './Entity';
import EntityPool from './EntityPool';
interface EntityManagerOptions {
    poolSize: number;
}
export default class EntityManager<C extends ComponentTypes> {
    entities: Map<number, Entity<C>>;
    archetypes: Map<string, Archetype<C>>;
    entityPool: EntityPool<C>;
    entityChangeDisposers: Map<number, () => void>;
    constructor({ poolSize }?: EntityManagerOptions);
    filter(types: string[]): Entity<C>[];
    addEntity(entity: Entity<C>): void;
    removeEntity(entity: Entity<C>): void;
    hasEntity(entityId: number): boolean;
    getEntity(entityId: number): Entity<C> | undefined;
    renewEntity(components?: ComponentOf<C>[]): Entity<C>;
    releaseEntity(entity: Entity<C>): void;
    addArchetype<T extends Archetype<C>>(klass: new (...args: any[]) => T): T;
    removeArchetype<T extends Archetype<C>>(klass: new (...args: any[]) => T): Archetype<C>;
    hasArchetype<T extends Archetype<C>>(klass: new (...args: any[]) => T): boolean;
    getArchetype<T extends Archetype<C>>(klass: new (...args: any[]) => T): T;
    private handleEntityAddComponent;
    private handleEntityRemoveComponent;
}
export {};
//# sourceMappingURL=EntityManager.d.ts.map