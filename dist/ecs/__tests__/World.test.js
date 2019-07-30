"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var World_1 = __importDefault(require("../World"));
var Archetype_1 = __importDefault(require("../Archetype"));
var component_fixtures_1 = require("./component.fixtures");
var system_fixtures_1 = require("./system.fixtures");
var archetype_fixtures_1 = require("./archetype.fixtures");
describe('World', function () {
    test('can create', function () {
        var world = new World_1.default();
    });
    test('can add archetype', function () {
        var world = new World_1.default();
        world.addArchetype(new Archetype_1.default(archetype_fixtures_1.Archetypes.All));
        expect(world.hasArchetype(archetype_fixtures_1.Archetypes.All)).toBe(true);
        world.createEntity(component_fixtures_1.physicalAssemblage());
        expect(world.getArchetype(archetype_fixtures_1.Archetypes.All).entities.length).toBe(1);
    });
    test('can add systems', function () {
        var world = new World_1.default();
        world.addArchetype(archetype_fixtures_1.physicalArchetype);
        world.addSystems(new system_fixtures_1.PhysicsSystem());
        // No entities yet, should have no effect
        world.update(16, 1);
        // Adding entities
        world.createEntity(component_fixtures_1.physicalAssemblage());
        world.createEntity(component_fixtures_1.physicalAssemblage());
        world.createEntity(component_fixtures_1.physicalAssemblage());
        world.createEntity(component_fixtures_1.physicalAssemblage());
        // Now the system should modify this entity
        world.update(16, 2);
        expect(world.getArchetype(archetype_fixtures_1.Archetypes.Physical).entities.length).toBe(4);
        expect(world
            .getArchetype(archetype_fixtures_1.Archetypes.Physical)
            .entities[0].getComponent('position').x).toBe(1);
        expect(world.systemTypes).toEqual(['PhysicsSystem']);
    });
    test('can get systems', function () {
        var world = new World_1.default();
        world.addArchetype(archetype_fixtures_1.physicalArchetype);
        world.addSystems(new system_fixtures_1.PhysicsSystem());
        expect(world.hasSystem(system_fixtures_1.PhysicsSystem)).toBe(true);
        var a = world.getSystem(system_fixtures_1.PhysicsSystem);
        expect(a).toBeInstanceOf(system_fixtures_1.PhysicsSystem);
    });
});
//# sourceMappingURL=World.test.js.map