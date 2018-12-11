import Component, { ComponentTypes } from '../Component';
export interface Components extends ComponentTypes {
    position: PositionComponent;
    rotation: RotationComponent;
    velocity: VelocityComponent;
    acceleration: AccelerationComponent;
    playerControllable: PlayerControllableComponent;
    static: StaticComponent;
    collider: ColliderComponent;
}
export declare class PositionComponent extends Component {
    value: {
        x: number;
        y: number;
        z: number;
    };
}
export declare class RotationComponent extends Component {
    value: {
        x: number;
        y: number;
        z: number;
    };
}
export declare class VelocityComponent extends Component {
    value: {
        x: number;
        y: number;
        z: number;
    };
}
export declare class AccelerationComponent extends Component {
    value: {
        x: number;
        y: number;
        z: number;
    };
}
export declare class PlayerControllableComponent extends Component {
    value: boolean;
}
export declare class StaticComponent extends Component {
    value: boolean;
}
export declare class ColliderComponent extends Component {
    value: boolean;
}
export declare const physicalAssemblage: () => (PositionComponent | RotationComponent | VelocityComponent | AccelerationComponent | ColliderComponent)[];
//# sourceMappingURL=component.fixtures.d.ts.map