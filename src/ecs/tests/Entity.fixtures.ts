import Entity from '../Entity'
import {
  AccelerationComponent,
  PlayerControllableComponent,
  PositionComponent,
  RotationComponent,
  VelocityComponent
} from './Component.fixtures'

export const createEntityFixture = () => {
  const pos = new PositionComponent({ x: 0, y: 0, z: 0 })
  const rot = new RotationComponent({ x: 0, y: 0, z: 0 })
  const vel = new VelocityComponent({ x: 0, y: 0, z: 0 })
  const acc = new AccelerationComponent({ x: 0, y: 0, z: 0 })
  const playerControlled = new PlayerControllableComponent(true)

  return new Entity([pos, rot, vel, acc, playerControlled])
}
