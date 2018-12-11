import Component, { ComponentTypes } from './Component';
declare type ValueOf<T> = T[keyof T];
declare type ComponentChangeEventTypes = 'add' | 'remove';
interface ComponentChangeEvent<C extends ComponentTypes> {
    type: ComponentChangeEventTypes;
    entity: Entity<C>;
    componentType: keyof C;
}
export declare type EntityListener<C extends ComponentTypes> = (ev: ComponentChangeEvent<C>) => void;
export default class Entity<C extends ComponentTypes> {
    id: number;
    components: Partial<C>;
    readonly componentTypes: Array<keyof C>;
    private componentChangeListeners;
    constructor(components?: Array<ValueOf<C>>);
    renew(components?: Array<ValueOf<C>>): Entity<C>;
    reset(): Entity<C>;
    onComponentChange(listener: EntityListener<C>): () => boolean;
    addComponent: (component: C[keyof C]) => void;
    add: (component: C[keyof C]) => void;
    removeComponent: (type: string) => void;
    remove: (type: string) => void;
    hasComponent(type: string): boolean;
    has: (type: string) => boolean;
    hasComponents: (...types: string[]) => boolean;
    getComponent<T extends keyof C>(type: T): C[T]['value'];
    get: <T extends keyof C>(type: T) => C[T]["value"];
    setComponent<T extends keyof C>(type: T, value: Partial<C[T]['value']> | C[T]['value']): void;
    set: <T extends keyof C>(type: T, value: C[T]["value"] | Partial<C[T]["value"]>) => void;
    toggleComponent(componentClass: {
        new (): Component;
    }, predicate: boolean): void;
}
export {};
//# sourceMappingURL=Entity.d.ts.map