import type { ComponentOf, ComponentTypes } from './Component';
import Entity from './Entity';
export default class EntityPool<C extends ComponentTypes> {
    size: number;
    head: number;
    entities: Entity<C>[];
    constructor(size: number);
    get length(): number;
    renew(components?: ComponentOf<C>[]): Entity<C>;
    release(entity: Entity<C>): void;
}
//# sourceMappingURL=EntityPool.d.ts.map