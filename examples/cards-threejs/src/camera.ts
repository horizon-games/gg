import { PerspectiveCamera } from 'three'
import screen from './screen'

const camera = new PerspectiveCamera(75, screen.width / screen.height, 0.5, 500)
camera.position.set(0, -1, 5)
camera.lookAt(0, 0, 0)

const w = window as any
w.camera = camera

export default camera
