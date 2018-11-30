import { System, EntityManager, Entity } from '../../../../src/ecs'
import { Components } from '../components'
import { Archetypes } from '../archetypes'

export default class LightsSystem extends System<Components> {
  update(manager: EntityManager<Components>, dt: number, time: number) {
    const { entities } = manager.getArchetype(Archetypes.Lights)

    entities.forEach((entity, idx) => {
      const light = entity.getComponent('light')

      if (idx % 2 === 0) {
        light.position.set(
          Math.sin(time / 100) * 10,
          Math.cos(time / 100) * 10,
          10
        )
      } else {
        light.position.set(
          Math.cos(time / 100) * 10,
          Math.sin(time / 100) * 10,
          10
        )
      }
    })
  }
}
