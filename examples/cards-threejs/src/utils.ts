export const TWO_PI = 2 * Math.PI

export const RADIANS_TO_DEGREES = 180 / Math.PI

export const DEGREES_TO_RADIANS = Math.PI / 180

export const radiansToDegrees = (radians: number) =>
  radians * RADIANS_TO_DEGREES

export const degreesToRadians = (degrees: number) =>
  degrees * DEGREES_TO_RADIANS
