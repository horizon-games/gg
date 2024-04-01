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

  test('can get an entity', () => {
    const pool = new EntityPool(SIZE)

    expect(pool.length).toBe(0)

    const entity = pool.getEntity()

    expect(pool.length).toBe(1)
    expect(entity).toBeInstanceOf(Entity)
  })

  test('can release an entity back into the pool', () => {
    const pool = new EntityPool(SIZE)

    expect(pool.length, 'starting pool size to be empty').toBe(0)

    // Get an entity from the pool
    const entity1 = pool.getEntity()

    expect(pool.length, 'pool size to increase after getting an entity').toBe(1)
    expect(entity1).toBeInstanceOf(Entity)

    // Release the entity back into the pool
    pool.releaseEntity(entity1)

    expect(
      pool.length,
      'the pool length to be zero after releasing entity'
    ).toBe(0)

    // Get another entity from the pool
    const entity2 = pool.getEntity()
    expect(
      entity2,
      'the next entity to share the same reference as the released entity'
    ).toBe(entity1)

    // Get another entity from the pool
    const entity3 = pool.getEntity()
    expect(entity3, 'the next entity to be a different entity').not.toBe(
      entity1
    )
  })

  test('exhausting the pool throws an error', () => {
    const pool = new EntityPool(SIZE)

    expect(pool.length).toBe(0)

    // Take all entities from pool
    for (let i = 0; i < SIZE; i++) {
      pool.getEntity()
    }

    expect(pool.length).toBe(SIZE)

    expect(pool.isExhausted).toBe(true)

    // // Take one more
    // expect(() => pool.getEntity()).toThrow()
  })
})
