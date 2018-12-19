import { ComponentTypes } from './Component';
import Entity from './Entity';
declare type ArchetypeComponentFilter<C extends ComponentTypes> = (...componentTypes: Array<keyof C>) => ArchetypeFilterPredicate<C>;
declare type ArchetypeFilterPredicate<C extends ComponentTypes> = (entity: Entity<C>) => boolean;
declare type ArchetypeChangeEventTypes = 'add' | 'remove';
interface ArchetypeChangeEvent<C extends ComponentTypes> {
    type: ArchetypeChangeEventTypes;
    archetype: Archetype<C>;
    entity: Entity<C>;
}
export declare type ArchetypeChangeListener<C extends ComponentTypes> = (ev: ArchetypeChangeEvent<C>) => void;
export default class Archetype<C extends ComponentTypes> {
    static include: ArchetypeComponentFilter<ComponentTypes>;
    static exclude: ArchetypeComponentFilter<ComponentTypes>;
    static only: ArchetypeComponentFilter<ComponentTypes>;
    id: number;
    filters: Array<ArchetypeFilterPredicate<C>>;
    readonly entities: Array<Entity<C>>;
    private onChangeListeners;
    constructor(id: number, filters?: Array<ArchetypeFilterPredicate<C>>);
    onChange(listener: ArchetypeChangeListener<C>): () => boolean;
    matchesEntity(entity: Entity<C>): boolean;
    hasEntity(entity: Entity<C>): boolean;
    handleEntityChange(entity: Entity<C>): void;
    handleEntityAdd(entity: Entity<C>): void;
    handleEntityRemove(entity: Entity<C>): void;
}
export {};
//# sourceMappingURL=Archetype.d.ts.map