"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var EntityPool_1 = __importDefault(require("../EntityPool"));
var Entity_1 = __importDefault(require("../Entity"));
var SIZE = 3;
describe('EntityPool', function () {
    test('can create pool', function () {
        var pool = new EntityPool_1.default(SIZE);
        expect(pool.size).toBe(SIZE);
        expect(pool.length).toBe(0);
        expect(pool.entities.length).toBe(SIZE);
        expect(pool.entities[0]).toBeInstanceOf(Entity_1.default);
        expect(pool.entities[SIZE - 1]).toBeInstanceOf(Entity_1.default);
    });
    test('can renew an entity', function () {
        var pool = new EntityPool_1.default(SIZE);
        expect(pool.length).toBe(0);
        var entity = pool.renew();
        expect(pool.length).toBe(1);
        expect(entity).toBeInstanceOf(Entity_1.default);
    });
    test('can release an entity back into the pool', function () {
        var pool = new EntityPool_1.default(SIZE);
        expect(pool.length).toBe(0);
        var entity = pool.renew();
        var id = entity.id;
        expect(pool.length).toBe(1);
        expect(entity).toBeInstanceOf(Entity_1.default);
        pool.release(entity);
        expect(entity.id).toBe(id + 1);
        expect(pool.length).toBe(0);
        var another = pool.renew();
        expect(another.id).toBe(id + 1);
    });
    test('exhausting the pool throws an error', function () {
        var pool = new EntityPool_1.default(SIZE);
        // Take all entities from pool
        for (var i = 0; i < SIZE; i++) {
            pool.renew();
        }
        // Take one more
        expect(function () { return pool.renew(); }).toThrow();
    });
});
//# sourceMappingURL=EntityPool.test.js.map