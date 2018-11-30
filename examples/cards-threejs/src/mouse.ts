import { Vector2 } from 'three'
import screen from './screen'

const mouse: { position: Vector2; isPressed: boolean } = {
  position: new Vector2(),
  isPressed: false
}

window.addEventListener('mousemove', function(ev) {
  mouse.position.x = (ev.clientX! / screen.width) * 2 - 1
  mouse.position.y = -(ev.clientY! / screen.height) * 2 + 1
})

// let mouseDownTimeout: any

// window.addEventListener('click', function(ev) {
//   clearTimeout(mouseDownTimeout)
// })

window.addEventListener('mousedown', function(ev) {
  //mouseDownTimeout = setTimeout(() => {
  mouse.isPressed = true
  //}, 100)
})

window.addEventListener('mouseup', function(ev) {
  mouse.isPressed = false
})

export default mouse
