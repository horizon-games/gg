import { DirectionalLight } from 'three'

import { PositionComponent, LightComponent } from '../components'

export const LightAssemblage = (color: number, intensity: number) => {
  return [
    new LightComponent(new DirectionalLight(color, intensity)),
    new PositionComponent({
      x: 0,
      y: 0,
      z: 0,
    }),
  ]
}
