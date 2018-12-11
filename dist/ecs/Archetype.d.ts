import { ComponentTypes } from './Component';
import Entity from './Entity';
declare type ArchetypeComponentFilter<C extends ComponentTypes> = (...componentTypes: Array<keyof C>) => ArchetypeFilterPredicate<C>;
declare type ArchetypeFilterPredicate<C extends ComponentTypes> = (entity: Entity<C>) => boolean;
export default class Archetype<C extends ComponentTypes> {
    static include: ArchetypeComponentFilter<ComponentTypes>;
    static exclude: ArchetypeComponentFilter<ComponentTypes>;
    static only: ArchetypeComponentFilter<ComponentTypes>;
    id: number;
    filters: Array<ArchetypeFilterPredicate<C>>;
    readonly entities: Array<Entity<C>>;
    constructor(id: number, filters?: Array<ArchetypeFilterPredicate<C>>);
    matchesEntity(entity: Entity<C>): boolean;
    hasEntity(entity: Entity<C>): boolean;
    handleEntityComponentChange(entity: Entity<C>): void;
    handleEntityAdd(entity: Entity<C>): void;
    handleEntityRemove(entity: Entity<C>): void;
}
export {};
//# sourceMappingURL=Archetype.d.ts.map