import { System, Entity, EntityManager } from '../lib/ecs'
import { Components } from '../components'
import { Archetypes } from '../archetypes'
import { Vector2 } from '../lib/vec2'
import { getRenderingContext } from '../RenderingContext'

const HALF_PI = Math.PI / 2
const RADIUS = Number(process.env.RADIUS)

export default class RenderSystem extends System<Components> {
  update(manager: EntityManager<Components>, dt: number) {
    const ctx = getRenderingContext()
    const { entities } = manager.getArchetype(Archetypes.Birds)

    // Clear screen
    ctx.fillStyle = 'rgba(240, 240, 240, 0.1)'
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

    // Render entities
    entities.forEach(bird => this.render(ctx, bird))
  }

  render = (ctx: CanvasRenderingContext2D, entity: Entity<Components>) => {
    const loc = entity.components.position!.value
    const vel = entity.components.velocity!.value
    const theta = heading2D(vel) + HALF_PI

    ctx.save()
    ctx.translate(loc[0], loc[1])
    ctx.rotate(theta)

    ctx.beginPath()
    ctx.moveTo(0, RADIUS)
    ctx.lineTo(0, 0)
    ctx.stroke()
    ctx.closePath()

    ctx.restore()
  }
}

const heading2D = (a: Vector2): number => {
  return -Math.atan2(-a[1], a[0])
}
