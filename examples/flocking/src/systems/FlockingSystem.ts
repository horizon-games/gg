import { System, EntityManager, Entity } from '../../../../src'
import { BirdsArchetype } from '../archetypes'
import { Components } from '../components'
import * as vec2 from '../lib/vec2'
import { Vector2 } from '../lib/vec2'

const MAX_SPEED = Number(import.meta.env.VITE_MAX_SPEED)
const MAX_FORCE = Number(import.meta.env.VITE_MAX_FORCE)
const NEIGHBOR_DISTANCE = Number(import.meta.env.VITE_NEIGHBOR_DISTANCE)
const DESIRED_SEPARATION = Number(import.meta.env.VITE_DESIRED_SEPARATION)
const RADIUS = Number(import.meta.env.VITE_RADIUS)

// Predefine vectors for scratch work within loop
const separation: Vector2 = vec2.create()
const alignment: Vector2 = vec2.create()
const cohesion: Vector2 = vec2.create()
const diff: Vector2 = vec2.create()
const steer: Vector2 = vec2.create()
const desired: Vector2 = vec2.create()

export class FlockingSystem extends System<Components> {
  update(manager: EntityManager<Components>, _dt: number) {
    const { entities } = manager.getArchetype(BirdsArchetype)
    const { innerWidth: width, innerHeight: height } = window
    const len = entities.length
    for (let i = 0; i < len; i++) {
      const bird = entities[i]
      const loc = bird.components.position!.value
      const vel = bird.components.velocity!.value
      const acc = bird.components.acceleration!.value

      vec2.set(separation, 0, 0)
      vec2.set(alignment, 0, 0)
      vec2.set(cohesion, 0, 0)

      let separationCount = 0
      let alignmentCount = 0

      for (let j = 0; j < len; j++) {
        const other = entities[j]
        const otherLoc = other.components.position!.value
        const otherVel = other.components.velocity!.value
        const d = vec2.distance(loc, otherLoc)

        if (d > 0) {
          if (d < DESIRED_SEPARATION) {
            vec2.sub(diff, loc, otherLoc)
            vec2.normalize(diff, diff)
            vec2.scale(diff, diff, 1 / d)
            vec2.add(separation, separation, diff)
            separationCount++
          }

          if (d < NEIGHBOR_DISTANCE) {
            vec2.add(alignment, alignment, otherVel)
            vec2.add(cohesion, cohesion, otherLoc)
            alignmentCount++
          }
        }
      }

      if (separationCount > 0) {
        vec2.scale(separation, separation, 1 / separationCount)
        vec2.scale(separation, separation, 2) // weight separation
        vec2.add(acc, acc, separation)
      }

      if (alignmentCount > 0) {
        vec2.scale(alignment, alignment, 1 / alignmentCount)
        limit(alignment, alignment, MAX_FORCE)
        vec2.scale(cohesion, cohesion, 1 / alignmentCount)

        this.steer(bird, cohesion)

        vec2.add(acc, acc, alignment)
        vec2.add(acc, acc, cohesion)
      }

      // Update velocity
      vec2.add(vel, vel, acc)

      // Limit speed
      limit(vel, vel, MAX_SPEED)
      vec2.add(loc, loc, vel)

      // Reset acceleration to zero
      vec2.set(acc, 0, 0)

      // Overflow borders
      if (loc[0] < -RADIUS) {
        loc[0] = width + RADIUS
      }
      if (loc[1] < -RADIUS) {
        loc[1] = height + RADIUS
      }
      if (loc[0] > width + RADIUS) {
        loc[0] = -RADIUS
      }
      if (loc[1] > height + RADIUS) {
        loc[1] = -RADIUS
      }
    }
  }

  steer(entity: Entity<Components>, target: Vector2) {
    const loc = entity.components.position!.value
    const vel = entity.components.velocity!.value

    vec2.set(steer, 0, 0)
    vec2.sub(desired, target, loc)

    const d = vec2.length(desired)

    if (d > 0) {
      vec2.normalize(desired, desired)
      vec2.scale(desired, desired, MAX_SPEED)
      vec2.sub(steer, desired, vel)
      limit(steer, steer, MAX_FORCE)
    }

    vec2.set(target, steer[0], steer[1])
  }

  borders(entity: Entity<Components>) {
    const loc = entity.components.position!.value
    const { innerWidth: width, innerHeight: height } = window

    if (loc[0] < -RADIUS) {
      loc[0] = width + RADIUS
    }
    if (loc[1] < -RADIUS) {
      loc[1] = height + RADIUS
    }
    if (loc[0] > width + RADIUS) {
      loc[0] = -RADIUS
    }
    if (loc[1] > height + RADIUS) {
      loc[1] = -RADIUS
    }
  }
}

const limit = (out: Vector2, a: Vector2, b: number) => {
  const length = vec2.length(a)
  if (length > b) {
    const lim = (1 / length) * b
    out[0] = a[0] * lim
    out[1] = a[1] * lim
  } else {
    out[0] = a[0]
    out[1] = a[1]
  }
  return out
}
