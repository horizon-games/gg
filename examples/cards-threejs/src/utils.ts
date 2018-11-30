import { Vector3, Camera } from 'three'

export const TWO_PI = 2 * Math.PI

export const RADIANS_TO_DEGREES = 180 / Math.PI

export const DEGREES_TO_RADIANS = Math.PI / 180

export const radiansToDegrees = (radians: number) =>
  radians * RADIANS_TO_DEGREES

export const degreesToRadians = (degrees: number) =>
  degrees * DEGREES_TO_RADIANS

export const get2DPositionAtDepth = (
  camera: Camera,
  x: number,
  y: number,
  atDepth: number = 0
): Vector3 => {
  const v = new Vector3(x, y, 1)
    .unproject(camera)
    .sub(camera.position)
    .normalize()
  const dist = (atDepth - camera.position.z) / v.z
  return new Vector3().copy(camera.position).add(v.multiplyScalar(dist))
}

export const lerp = (a: number, b: number, dt: number): number => {
  const out = a + dt * (b - a)
  return Math.abs(b - out) > 0.000001 ? out : b
}
