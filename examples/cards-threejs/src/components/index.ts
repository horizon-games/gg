import { ComponentTypes } from '../../../../src'

import { CardComponent } from './CardComponent'
import { DraggableComponent } from './DraggableComponent'
import { DroppableComponent } from './DroppableComponent'
import { HoverComponent } from './HoverComponent'
import { LightComponent } from './LightComponent'
import { MaterialComponent } from './MaterialComponent'
import { MeshComponent } from './MeshComponent'
import { OrderComponent } from './OrderComponent'
import { PlayerComponent } from './PlayerComponent'
import { PositionComponent } from './PositionComponent'
import { RotationComponent } from './RotationComponent'
import { TextureComponent } from './TextureComponent'

export type Components = {
  player: PlayerComponent
  position: PositionComponent
  rotation: RotationComponent
  card: CardComponent
  hover: HoverComponent
  material: MaterialComponent
  order: OrderComponent
  texture: TextureComponent
  mesh: MeshComponent
  light: LightComponent
  draggable: DraggableComponent
  droppable: DroppableComponent
}

export {
  PositionComponent,
  RotationComponent,
  PlayerComponent,
  CardComponent,
  HoverComponent,
  MaterialComponent,
  OrderComponent,
  TextureComponent,
  MeshComponent,
  LightComponent,
  DraggableComponent,
  DroppableComponent,
}
