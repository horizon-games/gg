import { ComponentTypes } from '../../../../src/ecs'
import PositionComponent from './PositionComponent'
import RotationComponent from './RotationComponent'
import HoverComponent from './HoverComponent'
import PlayerComponent from './PlayerComponent'
import CardComponent from './CardComponent'
import DomComponent from './DomComponent'
import ColorComponent from './ColorComponent'
import WidthComponent from './WidthComponent'
import HeightComponent from './HeightComponent'
import BoxShadowComponent from './BoxShadowComponent'
import BorderRadiusComponent from './BorderRadiusComponent'
import MaterialComponent from './MaterialComponent'

export interface Components extends ComponentTypes {
  player: PlayerComponent
  position: PositionComponent
  rotation: RotationComponent
  card: CardComponent
  dom: DomComponent
  color: ColorComponent
  width: WidthComponent
  height: HeightComponent
  boxShadow: BoxShadowComponent
  borderRadius: BorderRadiusComponent
  hover: HoverComponent
  material: MaterialComponent
}

export {
  PositionComponent,
  RotationComponent,
  PlayerComponent,
  CardComponent,
  DomComponent,
  ColorComponent,
  WidthComponent,
  HeightComponent,
  BoxShadowComponent,
  BorderRadiusComponent,
  HoverComponent,
  MaterialComponent
}
