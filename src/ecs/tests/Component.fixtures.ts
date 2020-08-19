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

// export type Components = ComponentConfig<{
//   position: PositionComponent
//   rotation: RotationComponent
//   velocity: VelocityComponent
//   acceleration: AccelerationComponent
//   playerControllable: PlayerControllableComponent
//   static: StaticComponent
//   collider: ColliderComponent
// }>

// export interface PositionComponent extends Component {
//   x: number
//   y: number
//   z: number
// }

interface Vec3 {
  x: number
  y: number
  z: number
}

export class PositionComponent extends Component<Vec3> {}

export class RotationComponent extends Component<Vec3> {}

export class VelocityComponent extends Component<Vec3> {}

export class AccelerationComponent extends Component<Vec3> {}

export class PlayerControllableComponent extends Component<boolean> {}

export class StaticComponent extends Component<void> {}

export class ColliderComponent extends Component<boolean> {}

export const physicalAssemblage = () => {
  return [
    new PositionComponent({ x: 0, y: 0, z: 0 }),
    new RotationComponent({ x: 0, y: 0, z: 0 }),
    new VelocityComponent({ x: 0, y: 0, z: 0 }),
    new AccelerationComponent({ x: 0, y: 0, z: 0 }),
    new ColliderComponent(true)
  ]
}
