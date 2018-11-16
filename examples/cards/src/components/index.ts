import { ComponentTypes } from '../../../../src/ecs'
import PositionComponent from './PositionComponent'
import PlayerComponent from './PlayerComponent'
import CardComponent from './CardComponent'
import DomComponent from './DomComponent'
import ColorComponent from './ColorComponent'
import WidthComponent from './WidthComponent'
import HeightComponent from './HeightComponent'
import BoxShadowComponent from './BoxShadowComponent'
import BorderRadiusComponent from './BorderRadiusComponent'

export interface Components extends ComponentTypes {
  player: PlayerComponent
  position: PositionComponent
  card: CardComponent
  dom: DomComponent
  color: ColorComponent
  width: WidthComponent
  height: HeightComponent
  boxShadow: BoxShadowComponent
  borderRadius: BorderRadiusComponent
}

export {
  PositionComponent,
  PlayerComponent,
  CardComponent,
  DomComponent,
  ColorComponent,
  WidthComponent,
  HeightComponent,
  BoxShadowComponent,
  BorderRadiusComponent
}
