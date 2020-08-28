import type { ComponentOf, ComponentTypes } from './Component';
export declare type EntityChangeEventTypes = 'add' | 'remove';
export interface EntityChangeEvent<C extends ComponentTypes> {
    type: EntityChangeEventTypes;
    entity: Entity<C>;
    component: ComponentOf<C>;
}
export declare type EntityChangeListener<C extends ComponentTypes> = (ev: EntityChangeEvent<C>) => void;
export default class Entity<C extends ComponentTypes> {
    id: number;
    components: Partial<C>;
    get componentTypes(): (keyof C)[];
    private onChangeListeners;
    constructor(components?: ComponentOf<C>[]);
    renew(components?: ComponentOf<C>[]): Entity<C>;
    reset(): Entity<C>;
    onChange(listener: EntityChangeListener<C>): () => boolean;
    removeOnChange(listener: EntityChangeListener<C>): void;
    hasComponent(type: keyof C): boolean;
    has: (type: keyof C) => boolean;
    hasComponents: (...types: (keyof C)[]) => boolean;
    addComponent: (component: ComponentOf<C>) => void;
    add: (component: ComponentOf<C>) => void;
    removeComponent: (type: keyof C) => void;
    remove: (type: keyof C) => void;
    toggleComponent(componentClass: new (value: void) => ComponentOf<C>, predicate: boolean): void;
    toggle: (componentClass: new (value: void) => ComponentOf<C>, predicate: boolean) => void;
    getComponent<T extends keyof C>(type: T): C[T] | undefined;
    getComponentValue<T extends keyof C>(type: T): C[T]['value'];
    get: <T extends keyof C>(type: T) => C[T]["value"];
    setComponentValue<T extends keyof C>(type: T, value: Partial<C[T]['value']> | C[T]['value']): void;
    set: <T extends keyof C>(type: T, value: C[T]["value"] | Partial<C[T]["value"]>) => void;
}
//# sourceMappingURL=Entity.d.ts.map