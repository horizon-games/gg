import { PositionComponent, LightComponent } from '../components'
import { DirectionalLight } from 'three'
import scene from '../scene'

const LightAssemblage = (color: number, intensity: number) => {
  const light = new DirectionalLight(color, intensity)
  light.castShadow = true
  scene.add(light)

  return [
    new LightComponent(light),
    new PositionComponent({
      x: 0,
      y: 0,
      z: 0
    })
  ]
}

export default LightAssemblage
