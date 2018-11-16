import { ComponentTypes } from '../../../../src/ecs'
import PositionComponent from './PositionComponent'
import PlayerComponent from './PlayerComponent'
import CardComponent from './CardComponent'
import DOMComponent from './DOMComponent'
import ColorComponent from './ColorComponent'

export interface Components extends ComponentTypes {
  player: PlayerComponent
  position: PositionComponent
  card: CardComponent
  dom: DOMComponent
  color: ColorComponent
}

export {
  PositionComponent,
  PlayerComponent,
  CardComponent,
  DOMComponent,
  ColorComponent
}
