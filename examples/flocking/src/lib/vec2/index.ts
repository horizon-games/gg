export interface Vector2 extends Float32Array {
  readonly length: 2
}

/**
 * Creates a new, empty Vector2
 *
 * @returns {Vector2} a new 2D vector
 */
export function create(): Vector2 {
  return new Float32Array(2) as Vector2
}

/**
 * Creates a new Vector2 initialized with values from an existing vector
 *
 * @param {Vector2} a vector to clone
 * @returns {Vector2} a new 2D vector
 */
export const clone = (a: Vector2): Vector2 => {
  const out = create()
  out[0] = a[0]
  out[1] = a[1]
  return out
}

/**
 * Creates a new Vector2 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {Vector2} a new 2D vector
 */
export const fromValues = (x: number, y: number): Vector2 => {
  const out = create()
  out[0] = x
  out[1] = y
  return out
}

/**
 * Set the components of a Vector2 to the given values
 *
 * @param {Vector2} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {Vector2} out
 */
export const set = (out: Vector2, x: number, y: number): Vector2 => {
  out[0] = x
  out[1] = y
  return out
}

/**
 * Subtracts vector b from vector a
 *
 * @param {Vector2} out the receiving vector
 * @param {Vector2} a the first operand
 * @param {Vector2} b the second operand
 * @returns {Vector2} out
 */
export const sub = (out: Vector2, a: Vector2, b: Vector2): Vector2 => {
  out[0] = a[0] - b[0]
  out[1] = a[1] - b[1]
  return out
}

/**
 * Adds two Vector2's
 *
 * @param {Vector2} out the receiving vector
 * @param {Vector2} a the first operand
 * @param {Vector2} b the second operand
 * @returns {Vector2} out
 */
export const add = (out: Vector2, a: Vector2, b: Vector2) => {
  out[0] = a[0] + b[0]
  out[1] = a[1] + b[1]
  return out
}

/**
 * Calculates the euclidian distance between two Vector2's
 *
 * @param {Vector2} a the first operand
 * @param {Vector2} b the second operand
 * @returns {Number} distance between a and b
 */
export const distance = (a: Vector2, b: Vector2): number => {
  const x = b[0] - a[0]
  const y = b[1] - a[1]
  return Math.sqrt(x * x + y * y)
}

/**
 * Normalize a Vector2
 *
 * @param {Vector2} out the receiving vector
 * @param {Vector2} a vector to normalize
 * @returns {Vector2} out
 */
export const normalize = (out: Vector2, a: Vector2): Vector2 => {
  const x = a[0]
  const y = a[1]
  let len = x * x + y * y
  if (len > 0) {
    len = 1 / Math.sqrt(len)
    out[0] = x * len
    out[1] = y * len
  }
  return out
}

/**
 * Scales a Vector2 by a scalar number
 *
 * @param {Vector2} out the receiving vector
 * @param {Vector2} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {Vector2} out
 */
export const scale = (out: Vector2, a: Vector2, b: number): Vector2 => {
  out[0] = a[0] * b
  out[1] = a[1] * b
  return out
}

/**
 * Calculates the length of a Vector2
 *
 * @param {Vector2} a vector to calculate length of
 * @returns {Number} length of a
 */
export const length = (a: Vector2): number => {
  const x = a[0]
  const y = a[1]
  return Math.sqrt(x * x + y * y)
}
