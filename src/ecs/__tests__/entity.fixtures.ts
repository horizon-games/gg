import Entity from '../Entity'
import {
  PositionComponent,
  RotationComponent,
  VelocityComponent,
  AccelerationComponent,
  PlayerControllableComponent
} from './component.fixtures'

export const createEntityFixture = () => {
  const pos = new PositionComponent({ x: 0, y: 0, z: 0 })
  const rot = new RotationComponent({ x: 0, y: 0, z: 0 })
  const vel = new VelocityComponent({ x: 0, y: 0, z: 0 })
  const acc = new AccelerationComponent({ x: 0, y: 0, z: 0 })
  const playerControlled = new PlayerControllableComponent({ value: true })
  return new Entity(pos, rot, vel, acc, playerControlled)
}
