import { System, EntityManager, Entity } from '../../../../src/ecs'
import { Components } from '../components'
import { Archetypes } from '../archetypes'

let frame = 0

export default class LightsSystem extends System<Components> {
  update(manager: EntityManager<Components>, dt: number) {
    const { entities } = manager.getArchetype(Archetypes.Lights)
    frame++

    entities.forEach((entity, idx) => {
      const light = entity.getComponent('light')

      if (idx % 2 === 0) {
        light.position.set(
          Math.sin(frame / 100) * 10,
          Math.cos(frame / 100) * 10,
          10
        )
      } else {
        light.position.set(
          Math.cos(frame / 100) * 10,
          Math.sin(frame / 100) * 10,
          10
        )
      }
    })
  }
}
