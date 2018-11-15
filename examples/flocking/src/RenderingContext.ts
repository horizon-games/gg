let ctx: CanvasRenderingContext2D

export const createRenderingContext = (canvas: HTMLCanvasElement) => {
  ctx = canvas.getContext('2d')!
}

export const getRenderingContext = () => {
  return ctx
}
