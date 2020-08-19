"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const System_1 = __importDefault(require("../System"));
const Archetype_fixtures_1 = require("./Archetype.fixtures");
class PhysicsSystem extends System_1.default {
    update(manager, dt, time) {
        const all = manager.getArchetype(Archetype_fixtures_1.AllArchetype);
    }
}
describe('System', () => {
    test('can create', () => {
        const system = new PhysicsSystem();
        expect(system.enabled).toBe(true);
    });
});
//# sourceMappingURL=System.test.js.map