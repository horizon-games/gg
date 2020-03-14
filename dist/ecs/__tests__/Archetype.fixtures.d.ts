import Archetype from '../Archetype';
import Entity from '../Entity';
import { Components } from './Component.fixtures';
export declare class AllArchetype extends Archetype<Components> {
}
export declare class AnyArchetype extends Archetype<Components> {
    filters: ((entity: Entity<Components>) => boolean)[];
}
export declare class EmptyArchetype extends Archetype<Components> {
    filters: ((entity: Entity<Components>) => boolean)[];
}
export declare class NonEmptyArchetype extends Archetype<Components> {
    filters: ((entity: Entity<Components>) => boolean)[];
}
export declare class PositionOnlyArchetype extends Archetype<Components> {
    filters: ((entity: Entity<Components>) => boolean)[];
}
export declare class PositionArchetype extends Archetype<Components> {
    filters: ((entity: Entity<Components>) => boolean)[];
}
export declare class PhysicalArchetype extends Archetype<Components> {
    filters: ((entity: Entity<Components>) => boolean)[];
}
//# sourceMappingURL=Archetype.fixtures.d.ts.map