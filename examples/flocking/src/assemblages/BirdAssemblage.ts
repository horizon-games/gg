import {
  PositionComponent,
  VelocityComponent,
  AccelerationComponent
} from '../components'
import * as vec2 from '../lib/vec2'

const MAX_SPEED = Number(process.env.MAX_SPEED)

const BirdAssemblage = (x: number, y: number) => {
  return [
    // new PositionComponent({ value: vec2.fromValues(x, y) }),
    // new VelocityComponent({
    //   value: vec2.fromValues(
    //     Math.random() * MAX_SPEED - 1,
    //     Math.random() * MAX_SPEED - 1
    //   )
    // }),
    // new AccelerationComponent({ value: vec2.fromValues(0, 0) })
    { type: 'position', value: vec2.fromValues(x, y) },
    {
      type: 'velocity',
      value: vec2.fromValues(
        Math.random() * MAX_SPEED - 1,
        Math.random() * MAX_SPEED - 1
      )
    },
    { type: 'acceleration', value: vec2.fromValues(0, 0) }
  ]
}

export default BirdAssemblage
