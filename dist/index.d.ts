export declare abstract class Archetype<C extends ComponentTypes> implements ArchetypeComponentFilterPresets<C> {
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
    handleEntityChange(entity: Entity<C>, component?: ComponentOf<C>): void;
    handleEntityAdd(entity: Entity<C>, component?: ComponentOf<C>): void;
    handleEntityRemove(entity: Entity<C>, component?: ComponentOf<C>): void;
}

export declare interface ArchetypeChangeEvent<C extends ComponentTypes> {
    type: ArchetypeChangeEventTypes;
    archetype: Archetype<C>;
    entity: Entity<C>;
    component: ComponentOf<C> | undefined;
}

export declare type ArchetypeChangeEventTypes = 'add' | 'remove';

export declare type ArchetypeChangeListener<C extends ComponentTypes> = (ev: ArchetypeChangeEvent<C>) => void;

export declare type ArchetypeComponentFilter<C extends ComponentTypes> = (...componentTypes: (keyof C)[]) => ArchetypeFilterPredicate<C>;

declare interface ArchetypeComponentFilterPresets<C extends ComponentTypes> {
    include: ArchetypeComponentFilter<C>;
    exclude: ArchetypeComponentFilter<C>;
    only: ArchetypeComponentFilter<C>;
    any: ArchetypeComponentFilter<C>;
}

export declare type ArchetypeFilterPredicate<C extends ComponentTypes> = (entity: Entity<C>) => boolean;

export declare type Assemblage = (...args: any[]) => Component<any>[];

export declare abstract class Component<T> {
    value: T;
    readonly type: string;
    constructor(value: T);
    onAttach(_entity: Entity<any>): void;
    onDetach(_entity: Entity<any>): void;
}

declare type ComponentOf<C> = C[keyof C];

export declare type ComponentTypes = Record<string, Component<any>>;

/**
 * Entity is a container for components.
 */
export declare class Entity<C extends ComponentTypes> {
    id: number;
    components: Partial<C>;
    /** List of components */
    get componentTypes(): (keyof C)[];
    private onChangeListeners;
    constructor(components?: ComponentOf<C>[]);
    /**
     * Reset the entity to its initial state
     */
    reset(): Entity<C>;
    /**
     * Clone an Entity
     */
    clone(): Entity<C>;
    /**
     * Attach an onChange listener to the entity
     */
    onChange(listener: EntityChangeListener<C>): () => boolean;
    /**
     * Remove an onChange listener from the entity
     */
    removeOnChange(listener: EntityChangeListener<C>): void;
    /**
     * Check if the entity has a component
     */
    hasComponent(type: keyof C): boolean;
    has: (type: keyof C) => boolean;
    /**
     * Check if the entity has multiple components
     */
    hasComponents: (...types: (keyof C)[]) => boolean;
    /**
     * Add a component to the entity
     */
    addComponent: (component: ComponentOf<C>) => void;
    add: (component: ComponentOf<C>) => void;
    /**
     * Add multiple components to the entity
     */
    addComponents: (components: ComponentOf<C>[]) => void;
    /**
     * Remove a component from the entity
     */
    removeComponent: (type: keyof C) => void;
    remove: (type: keyof C) => void;
    /**
     * Add or remove a component based on a predicated value
     */
    toggleComponent(componentClass: new (value: void) => ComponentOf<C>, predicate: boolean): void;
    toggle: (componentClass: new (value: void) => ComponentOf<C>, predicate: boolean) => void;
    /**
     * Get the component on the entity
     */
    getComponent<T extends keyof C>(type: T): C[T] | undefined;
    /**
     * Get the value of the component on the entity
     */
    getComponentValue<T extends keyof C>(type: T): C[T]['value'];
    get: <T extends keyof C>(type: T) => C[T]['value'];
    /**
     * Set the value of the component on the entity
     */
    setComponentValue<T extends keyof C>(type: T, value: Partial<C[T]['value']> | C[T]['value']): void;
    set: <T extends keyof C>(type: T, value: Partial<C[T]['value']> | C[T]['value']) => void;
}

export declare interface EntityChangeEvent<C extends ComponentTypes> {
    type: EntityChangeEventTypes;
    entity: Entity<C>;
    component: ComponentOf<C>;
}

export declare type EntityChangeEventTypes = 'add' | 'remove';

declare type EntityChangeListener<C extends ComponentTypes> = (ev: EntityChangeEvent<C>) => void;

export declare class EntityManager<C extends ComponentTypes> {
    entities: Map<number, Entity<C>>;
    archetypes: Map<string, Archetype<C>>;
    entityChangeDisposers: Map<number, () => void>;
    /**
     * Filter entities by component types
     */
    filter(types: string[]): Entity<C>[];
    /**
     * Add an entity to the manager
     */
    addEntity(entity: Entity<C>): void;
    /**
     * Remove an entity from the manager
     */
    removeEntity(entity: Entity<C>): void;
    /**
     * Check if the manager has an entity
     */
    hasEntity(entityId: number): boolean;
    /**
     * Get an entity from the manager
     */
    getEntity(entityId: number): Entity<C> | undefined;
    /**
     * Create a new entity and add it to the manager
     */
    createEntity(components?: ComponentOf<C>[]): Entity<C>;
    /**
     * Add an archetype to the manager
     */
    addArchetype<T extends Archetype<C>>(klass: new (...args: any[]) => T): T;
    /**
     * Remove an archetype from the manager
     */
    removeArchetype<T extends Archetype<C>>(klass: new (...args: any[]) => T): Archetype<C>;
    /**
     * Check if the manager has an archetype
     */
    hasArchetype<T extends Archetype<C>>(klass: new (...args: any[]) => T): boolean;
    /**
     * Get an archetype from the manager
     */
    getArchetype<T extends Archetype<C>>(klass: new (...args: any[]) => T): T;
    /**
     * Handle entity add component event
     */
    private handleEntityAddComponent;
    /**
     * Handle entity remove component event
     */
    private handleEntityRemoveComponent;
}

export declare abstract class System<C extends ComponentTypes> {
    enabled: boolean;
    constructor(options?: Partial<SystemOptions>);
    init(_: EntityManager<C>): void;
    abstract update(manager: EntityManager<C>, dt: number, time: number): void;
    enable(): void;
    disable(): void;
}

declare interface SystemOptions {
    priority: number;
    enabled: boolean;
}

/**
 * World registers systems, archetypes and entities. Updates systems.
 */
export declare class World<C extends ComponentTypes> {
    readonly options: WorldOptions;
    readonly manager: EntityManager<C>;
    private systems;
    constructor(options?: WorldOptions);
    /** List of systems */
    get systemTypes(): string[];
    /**
     * Add a system to the world and initialize it
     */
    addSystem(system: System<C>): void;
    /**
     * Add multiple systems to the world
     */
    addSystems(...systems: System<C>[]): void;
    /**
     * Remove a system from the world
     */
    removeSystem<T extends System<C>>(klass: new (...args: any[]) => T): System<C>;
    /**
     * Check if a system exists in the world
     */
    hasSystem<T extends System<C>>(klass: new (...args: any[]) => T): boolean;
    /**
     * Get a system from the world
     */
    getSystem<T extends System<C>>(klass: new (...args: any[]) => T): T;
    /**
     * Add an archetype to the world
     */
    addArchetype<T extends Archetype<C>>(klass: new (...args: any[]) => T): T;
    /**
     * Remove an archetype from the world
     */
    removeArchetype<T extends Archetype<C>>(klass: new (...args: any[]) => T): Archetype<C>;
    /**
     * Check if an archetype exists in the world
     */
    hasArchetype<T extends Archetype<C>>(klass: new (...args: any[]) => T): boolean;
    /**
     * Get an archetype from the world
     */
    getArchetype<T extends Archetype<C>>(klass: new (...args: any[]) => T): T;
    /**
     * Create a new entity
     */
    createEntity(components?: ComponentOf<C>[]): Entity<C>;
    /**
     * Remove an entity from the world
     */
    removeEntity(entityId: number): void;
    /**
     * Get an entity from the world
     */
    getEntity: (entityId: number) => Entity<C> | undefined;
    /**
     * Get multiple entities from the world
     */
    getEntities(entityIds: number[]): (Entity<C> | undefined)[];
    /**
     * Update all systems
     */
    update(dt: number, time: number): void;
}

declare interface WorldOptions {
}

export { }
