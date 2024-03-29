import {
  PositionComponent,
  VelocityComponent,
  AccelerationComponent,
} from '../components'
import * as vec2 from '../lib/vec2'

const MAX_SPEED = Number(import.meta.env.VITE_MAX_SPEED)

export const BirdAssemblage = (x: number, y: number) => {
  return [
    new PositionComponent(vec2.fromValues(x, y)),
    new VelocityComponent(
      vec2.fromValues(
        Math.random() * MAX_SPEED - 1,
        Math.random() * MAX_SPEED - 1
      )
    ),
    new AccelerationComponent(vec2.fromValues(0, 0)),
  ]
}
