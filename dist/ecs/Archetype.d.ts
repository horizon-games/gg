import { ComponentTypes } from './Component';
import Entity from './Entity';
declare type ValueOf<T> = T[keyof T];
export declare type ArchetypeComponentFilter<C extends ComponentTypes> = (...componentTypes: (keyof C)[]) => ArchetypeFilterPredicate<C>;
export declare type ArchetypeFilterPredicate<C extends ComponentTypes> = (entity: Entity<C>) => boolean;
declare type ArchetypeChangeEventTypes = 'add' | 'remove';
export interface ArchetypeChangeEvent<C extends ComponentTypes> {
    type: ArchetypeChangeEventTypes;
    archetype: Archetype<C>;
    entity: Entity<C>;
    component: ValueOf<C> | undefined;
}
export declare type ArchetypeChangeListener<C extends ComponentTypes> = (ev: ArchetypeChangeEvent<C>) => void;
interface ArchetypeComponentFilterPresets<C extends ComponentTypes> {
    include: ArchetypeComponentFilter<C>;
    exclude: ArchetypeComponentFilter<C>;
    only: ArchetypeComponentFilter<C>;
    any: ArchetypeComponentFilter<C>;
}
export default abstract class Archetype<C extends ComponentTypes> implements ArchetypeComponentFilterPresets<C> {
    include: ArchetypeComponentFilter<C>;
    exclude: ArchetypeComponentFilter<C>;
    only: ArchetypeComponentFilter<C>;
    any: ArchetypeComponentFilter<C>;
    filters: ArchetypeFilterPredicate<C>[];
    readonly entities: Entity<C>[];
    private onChangeListeners;
    private onAddListeners;
    private onRemoveListeners;
    onChange(listener: ArchetypeChangeListener<C>): () => boolean;
    onAdd(listener: ArchetypeChangeListener<C>): () => boolean;
    onRemove(listener: ArchetypeChangeListener<C>): () => boolean;
    matchesEntity(entity: Entity<C>): boolean;
    hasEntity(entity: Entity<C>): boolean;
    handleEntityChange(entity: Entity<C>, component?: ValueOf<C>): void;
    handleEntityAdd(entity: Entity<C>, component?: ValueOf<C>): void;
    handleEntityRemove(entity: Entity<C>, component?: ValueOf<C>): void;
}
export {};
//# sourceMappingURL=Archetype.d.ts.map