import { ComponentTypes } from './Component';
declare type ValueOf<T> = T[keyof T];
declare type EntityChangeEventTypes = 'add' | 'remove';
interface EntityChangeEvent<C extends ComponentTypes> {
    type: EntityChangeEventTypes;
    entity: Entity<C>;
    componentType: keyof C;
}
export declare type EntityChangeListener<C extends ComponentTypes> = (ev: EntityChangeEvent<C>) => void;
export default class Entity<C extends ComponentTypes> {
    id: number;
    components: Partial<C>;
    readonly componentTypes: Array<keyof C>;
    private onChangeListeners;
    constructor(components?: Array<ValueOf<C>>);
    renew(components?: Array<ValueOf<C>>): Entity<C>;
    reset(): Entity<C>;
    onChange(listener: EntityChangeListener<C>): () => boolean;
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
        new (): ValueOf<C>;
    }, predicate: boolean): void;
}
export {};
//# sourceMappingURL=Entity.d.ts.map