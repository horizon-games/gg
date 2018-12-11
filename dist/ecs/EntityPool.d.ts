import Entity from './Entity';
import { ComponentTypes } from './Component';
declare type ValueOf<T> = T[keyof T];
export default class EntityPool<C extends ComponentTypes> {
    size: number;
    head: number;
    entities: Array<Entity<C>>;
    constructor(size: number);
    readonly length: number;
    renew(components?: Array<ValueOf<C>>): Entity<C>;
    release(entity: Entity<C>): void;
}
export {};
//# sourceMappingURL=EntityPool.d.ts.map