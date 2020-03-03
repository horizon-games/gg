import Component, { ComponentTypes } from '../Component'
export type Components = {
  position: PositionComponent
  rotation: RotationComponent
  velocity: VelocityComponent
  acceleration: AccelerationComponent
  playerControllable: PlayerControllableComponent
  static: StaticComponent
  collider: ColliderComponent
}
interface Vec3 {
  x: number
  y: number
  z: number
}
export declare class PositionComponent extends Component<Vec3> {}
export declare class RotationComponent extends Component<Vec3> {}
export declare class VelocityComponent extends Component<Vec3> {}
export declare class AccelerationComponent extends Component<Vec3> {}
export declare class PlayerControllableComponent extends Component<boolean> {}
export declare class StaticComponent extends Component<void> {}
export declare class ColliderComponent extends Component<boolean> {}
export declare const physicalAssemblage: () => (
  | PositionComponent
  | RotationComponent
  | VelocityComponent
  | AccelerationComponent
  | ColliderComponent
)[]
export {}
//# sourceMappingURL=component.fixtures.d.ts.map
