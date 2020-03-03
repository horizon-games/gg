import { ComponentTypes } from './Component';
import Entity from './Entity';
declare type ValueOf<T> = T[keyof T];
declare type ArchetypeFilterPredicate<C extends ComponentTypes> = (entity: Entity<C>) => boolean;
declare type ArchetypeChangeEventTypes = 'add' | 'remove';
export interface ArchetypeChangeEvent<C extends ComponentTypes> {
    type: ArchetypeChangeEventTypes;
    archetype: Archetype<C>;
    entity: Entity<C>;
    component: ValueOf<C> | undefined;
}
export declare type ArchetypeChangeListener<C extends ComponentTypes> = (ev: ArchetypeChangeEvent<C>) => void;
export default class Archetype<C extends ComponentTypes> {
    static include: <CT extends ComponentTypes>(...componentTypes: (keyof CT)[]) => (entity: Entity<CT>) => boolean;
    static exclude: <CT extends ComponentTypes>(...componentTypes: (keyof CT)[]) => (entity: Entity<CT>) => boolean;
    static only: <CT extends ComponentTypes>(...componentTypes: (keyof CT)[]) => (entity: Entity<CT>) => boolean;
    static any: <CT extends ComponentTypes>(...componentTypes: (keyof CT)[]) => (entity: Entity<CT>) => boolean;
    id: number;
    filters: ArchetypeFilterPredicate<C>[];
    readonly entities: Entity<C>[];
    private onChangeListeners;
    private onAddListeners;
    private onRemoveListeners;
    constructor(id: number, filters?: ArchetypeFilterPredicate<C>[]);
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