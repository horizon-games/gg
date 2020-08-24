import Entity from './Entity';
import { ComponentTypes, ComponentOf } from './Component';
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