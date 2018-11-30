const screen = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () => {
  screen.width = window.innerWidth
  screen.height = window.innerHeight
})

export default screen
