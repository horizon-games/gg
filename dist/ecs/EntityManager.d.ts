import { ComponentTypes } from './Component';
import Archetype from './Archetype';
import Entity from './Entity';
import EntityPool from './EntityPool';
declare type ValueOf<T> = T[keyof T];
interface EntityManagerOptions {
    poolSize: number;
}
export default class EntityManager<C extends ComponentTypes> {
    entities: Map<number, Entity<C>>;
    archetypes: Map<number, Archetype<C>>;
    entityPool: EntityPool<C>;
    entityListenerDisposers: Map<number, () => void>;
    constructor({ poolSize }?: EntityManagerOptions);
    filter(types: string[]): Array<Entity<C>>;
    addEntity(entity: Entity<C>): void;
    removeEntity(entity: Entity<C>): void;
    hasEntity(entityId: number): boolean;
    getEntity(entityId: number): Entity<C> | undefined;
    renewEntity(components?: Array<ValueOf<C>>): Entity<C>;
    releaseEntity(entity: Entity<C>): void;
    addArchetype(archetype: Archetype<C>): void;
    removeArchetype(archetypeID: number): void;
    hasArchetype(archetypeID: number): boolean;
    getArchetype(archetypeID: number): Archetype<C>;
    private handleEntityAddComponent;
    private handleEntityRemoveComponent;
}
export {};
//# sourceMappingURL=EntityManager.d.ts.map