import AccelerationComponent from './AccelerationComponent'
import PositionComponent from './PositionComponent'
import VelocityComponent from './VelocityComponent'

import { ComponentTypes } from '../../../../src/ecs'

export type Components = {
  acceleration: AccelerationComponent
  position: PositionComponent
  velocity: VelocityComponent
}

export { AccelerationComponent, PositionComponent, VelocityComponent }
