import { ComponentTypes } from '../../../../src'

import { BorderRadiusComponent } from './BorderRadiusComponent'
import { BoxShadowComponent } from './BoxShadowComponent'
import { CardComponent } from './CardComponent'
import { ColorComponent } from './ColorComponent'
import { DomComponent } from './DomComponent'
import { HeightComponent } from './HeightComponent'
import { HoverComponent } from './HoverComponent'
import { MaterialComponent } from './MaterialComponent'
import { OrderComponent } from './OrderComponent'
import { PlayerComponent } from './PlayerComponent'
import { PositionComponent } from './PositionComponent'
import { RotationComponent } from './RotationComponent'
import { WidthComponent } from './WidthComponent'

export type Components = {
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
  order: OrderComponent
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
  MaterialComponent,
  OrderComponent,
}
