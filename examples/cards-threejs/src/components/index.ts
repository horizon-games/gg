import { ComponentTypes } from '../../../../src/ecs'
import PositionComponent from './PositionComponent'
import RotationComponent from './RotationComponent'
import HoverComponent from './HoverComponent'
import PlayerComponent from './PlayerComponent'
import CardComponent from './CardComponent'
import MaterialComponent from './MaterialComponent'
import OrderComponent from './OrderComponent'
import TextureComponent from './TextureComponent'
import MeshComponent from './MeshComponent'
import LightComponent from './LightComponent'
import DraggableComponent from './DraggableComponent'
import DroppableComponent from './DroppableComponent'

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
  DroppableComponent
}
