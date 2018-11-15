import AccelerationComponent from './AccelerationComponent'
import PositionComponent from './PositionComponent'
import VelocityComponent from './VelocityComponent'

import { ComponentTypes } from '../lib/ecs'

export interface Components extends ComponentTypes {
  acceleration: AccelerationComponent
  position: PositionComponent
  velocity: VelocityComponent
}

export { AccelerationComponent, PositionComponent, VelocityComponent }
