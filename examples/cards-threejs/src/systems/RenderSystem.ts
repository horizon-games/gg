import { System, EntityManager, Entity } from '../../../../src/ecs'
import { Components } from '../components'
import { RenderableArchetype } from '../archetypes'

export default class RenderSystem extends System<Components> {
  update(manager: EntityManager<Components>, dt: number) {
    const { entities } = manager.getArchetype(RenderableArchetype)

    entities.forEach(entity => {
      const position = entity.getComponentValue('position')
      const rotation = entity.getComponentValue('rotation')
      const mesh = entity.getComponentValue('mesh')
      mesh.position.set(position.x, position.y, position.z)
      mesh.rotation.set(rotation.x, rotation.y, rotation.z)
    })
  }
}
