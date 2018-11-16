import { ComponentTypes } from '../../../../src/ecs'
import PositionComponent from './PositionComponent'
import PlayerComponent from './PlayerComponent'
import CardComponent from './CardComponent'
import DOMComponent from './DOMComponent'
import ColorComponent from './ColorComponent'
import WidthComponent from './WidthComponent'
import HeightComponent from './HeightComponent'
import BoxShadowComponent from './BoxShadowComponent'

export interface Components extends ComponentTypes {
  player: PlayerComponent
  position: PositionComponent
  card: CardComponent
  dom: DOMComponent
  color: ColorComponent
  width: WidthComponent
  height: HeightComponent
  boxshadow: BoxShadowComponent
}

export {
  PositionComponent,
  PlayerComponent,
  CardComponent,
  DOMComponent,
  ColorComponent,
  WidthComponent,
  HeightComponent,
  BoxShadowComponent
}
