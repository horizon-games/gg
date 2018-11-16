import { ComponentTypes } from '../../../../src/ecs'
import PositionComponent from './PositionComponent'

export interface Components extends ComponentTypes {
  position: PositionComponent
}

export { PositionComponent }
