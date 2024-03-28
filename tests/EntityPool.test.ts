import { describe, test, expect } from 'vitest'

import { Entity } from '../src/Entity'
import { EntityPool } from '../src/EntityPool'

const SIZE = 3

describe('EntityPool', () => {
  test('can create pool', () => {
    const pool = new EntityPool(SIZE)

    expect(pool.size).toBe(SIZE)
    expect(pool.length).toBe(0)
    expect(pool.entities.length).toBe(SIZE)
    expect(pool.entities[0]).toBeInstanceOf(Entity)
    expect(pool.entities[SIZE - 1]).toBeInstanceOf(Entity)
  })

  test('can renew an entity', () => {
    const pool = new EntityPool(SIZE)

    expect(pool.length).toBe(0)

    const entity = pool.renew()

    expect(pool.length).toBe(1)
    expect(entity).toBeInstanceOf(Entity)
  })

  test('can release an entity back into the pool', () => {
    const pool = new EntityPool(SIZE)

    expect(pool.length).toBe(0)

    const entity = pool.renew()
    const id = entity.id

    expect(pool.length).toBe(1)
    expect(entity).toBeInstanceOf(Entity)

    pool.release(entity)

    expect(entity.id).toBe(id + 1)
    expect(pool.length).toBe(0)

    const another = pool.renew()

    expect(another.id).toBe(id + 1)
  })

  test('exhausting the pool throws an error', () => {
    const pool = new EntityPool(SIZE)

    // Take all entities from pool
    for (let i = 0; i < SIZE; i++) {
      pool.renew()
    }

    // Take one more
    expect(() => pool.renew()).toThrow()
  })
})
