let screenWidth = window.innerWidth
let screenHeight = window.innerHeight

const screen = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', function() {
  screen.width = window.innerWidth
  screen.height = window.innerHeight
})

export default screen
