"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Archetype_1 = __importDefault(require("../Archetype"));
const World_1 = __importDefault(require("../World"));
const Archetype_fixtures_1 = require("./Archetype.fixtures");
const Component_fixtures_1 = require("./Component.fixtures");
const System_fixtures_1 = require("./System.fixtures");
describe('World', () => {
    test('can create', () => {
        const world = new World_1.default();
    });
    test('can add archetype', () => {
        const world = new World_1.default();
        class AllArchetype extends Archetype_1.default {
        }
        world.addArchetype(AllArchetype);
        expect(world.hasArchetype(AllArchetype)).toBe(true);
        world.createEntity(Component_fixtures_1.physicalAssemblage());
        expect(world.getArchetype(AllArchetype).entities.length).toBe(1);
    });
    test('can add systems', () => {
        const world = new World_1.default();
        world.addArchetype(Archetype_fixtures_1.PhysicalArchetype);
        world.addSystems(new System_fixtures_1.PhysicsSystem());
        // No entities yet, should have no effect
        world.update(16, 1);
        // Adding entities
        world.createEntity(Component_fixtures_1.physicalAssemblage());
        world.createEntity(Component_fixtures_1.physicalAssemblage());
        world.createEntity(Component_fixtures_1.physicalAssemblage());
        world.createEntity(Component_fixtures_1.physicalAssemblage());
        // Now the system should modify this entity
        world.update(16, 2);
        expect(world.getArchetype(Archetype_fixtures_1.PhysicalArchetype).entities.length).toBe(4);
        expect(world
            .getArchetype(Archetype_fixtures_1.PhysicalArchetype)
            .entities[0].getComponentValue('position').x).toBe(1);
        expect(world.systemTypes).toEqual(['PhysicsSystem']);
    });
    test('can get systems', () => {
        const world = new World_1.default();
        world.addArchetype(Archetype_fixtures_1.PhysicalArchetype);
        world.addSystems(new System_fixtures_1.PhysicsSystem());
        expect(world.hasSystem(System_fixtures_1.PhysicsSystem)).toBe(true);
        const a = world.getSystem(System_fixtures_1.PhysicsSystem);
        expect(a).toBeInstanceOf(System_fixtures_1.PhysicsSystem);
    });
});
//# sourceMappingURL=World.test.js.map