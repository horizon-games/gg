"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Entity_1 = __importDefault(require("../Entity"));
const EntityPool_1 = __importDefault(require("../EntityPool"));
const SIZE = 3;
describe('EntityPool', () => {
    test('can create pool', () => {
        const pool = new EntityPool_1.default(SIZE);
        expect(pool.size).toBe(SIZE);
        expect(pool.length).toBe(0);
        expect(pool.entities.length).toBe(SIZE);
        expect(pool.entities[0]).toBeInstanceOf(Entity_1.default);
        expect(pool.entities[SIZE - 1]).toBeInstanceOf(Entity_1.default);
    });
    test('can renew an entity', () => {
        const pool = new EntityPool_1.default(SIZE);
        expect(pool.length).toBe(0);
        const entity = pool.renew();
        expect(pool.length).toBe(1);
        expect(entity).toBeInstanceOf(Entity_1.default);
    });
    test('can release an entity back into the pool', () => {
        const pool = new EntityPool_1.default(SIZE);
        expect(pool.length).toBe(0);
        const entity = pool.renew();
        const id = entity.id;
        expect(pool.length).toBe(1);
        expect(entity).toBeInstanceOf(Entity_1.default);
        pool.release(entity);
        expect(entity.id).toBe(id + 1);
        expect(pool.length).toBe(0);
        const another = pool.renew();
        expect(another.id).toBe(id + 1);
    });
    test('exhausting the pool throws an error', () => {
        const pool = new EntityPool_1.default(SIZE);
        // Take all entities from pool
        for (let i = 0; i < SIZE; i++) {
            pool.renew();
        }
        // Take one more
        expect(() => pool.renew()).toThrow();
    });
});
//# sourceMappingURL=EntityPool.test.js.map