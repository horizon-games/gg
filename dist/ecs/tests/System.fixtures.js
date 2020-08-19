"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhysicsSystem = void 0;
const System_1 = __importDefault(require("../System"));
const Archetype_fixtures_1 = require("./Archetype.fixtures");
class PhysicsSystem extends System_1.default {
    update(manager, dt) {
        const all = manager.getArchetype(Archetype_fixtures_1.PhysicalArchetype);
        for (const entity of all.entities) {
            entity.getComponentValue('position').x += 1;
        }
    }
    someMethod() {
        return 5;
    }
}
exports.PhysicsSystem = PhysicsSystem;
//# sourceMappingURL=System.fixtures.js.map