import { PositionComponent, LightComponent } from '../components'
import { DirectionalLight } from 'three'
import scene from '../scene'

const LightAssemblage = (color: number, intensity: number) => {
  return [
    new LightComponent(new DirectionalLight(color, intensity)),
    new PositionComponent({
      x: 0,
      y: 0,
      z: 0
    })
  ]
}

export default LightAssemblage
