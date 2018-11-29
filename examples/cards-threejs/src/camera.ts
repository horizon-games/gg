import { PerspectiveCamera } from 'three'
import screen from './screen'

const camera = new PerspectiveCamera(75, screen.width / screen.height, 0.1, 100)

export default camera
