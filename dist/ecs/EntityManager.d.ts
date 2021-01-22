import type Archetype from './Archetype';
import type { ComponentOf, ComponentTypes } from './Component';
import Entity from './Entity';
export default class EntityManager<C extends ComponentTypes> {
    entities: Map<number, Entity<C>>;
    archetypes: Map<string, Archetype<C>>;
    entityChangeDisposers: Map<number, () => void>;
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
//# sourceMappingURL=EntityManager.d.ts.map