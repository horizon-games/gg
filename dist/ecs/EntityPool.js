"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Entity_1 = __importDefault(require("./Entity"));
class EntityPool {
    constructor(size) {
        this.size = size;
        this.head = -1;
        this.entities = new Array(size);
        for (let idx = 0; idx < size; idx++) {
            this.entities[++this.head] = new Entity_1.default();
        }
    }
    get length() {
        return this.size - this.head - 1;
    }
    // Take an Entity from the pool
    renew(components = []) {
        if (this.head >= 0) {
            const entity = this.entities[this.head--];
            return entity.renew(components);
        }
        else {
            throw new Error('EntityPool: Attempted to take an Entity from an exhausted pool.');
        }
    }
    // Release an Entity back into the pool
    release(entity) {
        if (entity instanceof Entity_1.default) {
            if (this.head < this.size - 1) {
                this.entities[++this.head] = entity;
            }
            else {
                throw new Error('EntityPool: Attempted to release an Entity back into a full pool.');
            }
        }
        else {
            throw new Error('EntityPool: Released object was not an Entity.');
        }
    }
}
exports.default = EntityPool;
//# sourceMappingURL=EntityPool.js.map