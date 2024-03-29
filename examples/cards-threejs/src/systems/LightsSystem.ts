import { System, EntityManager } from '../../../../src'
import { LightsArchetype } from '../archetypes'
import { Components } from '../components'

export class LightsSystem extends System<Components> {
  update(manager: EntityManager<Components>, dt: number, time: number) {
    const { entities } = manager.getArchetype(LightsArchetype)

    entities.forEach((entity, idx) => {
      const light = entity.getComponentValue('light')

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
