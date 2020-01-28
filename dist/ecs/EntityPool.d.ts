import Entity from './Entity';
import { ComponentTypes } from './Component';
declare type ValueOf<T> = T[keyof T];
export default class EntityPool<C extends ComponentTypes> {
    size: number;
    head: number;
    entities: Entity<C>[];
    constructor(size: number);
    get length(): number;
    renew(components?: ValueOf<C>[]): Entity<C>;
    release(entity: Entity<C>): void;
}
export {};
//# sourceMappingURL=EntityPool.d.ts.map