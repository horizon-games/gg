import { PerspectiveCamera } from 'three'

const camera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
)

export default camera
