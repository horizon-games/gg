"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var EntityManager_1 = __importDefault(require("../EntityManager"));
var Entity_1 = __importDefault(require("../Entity"));
var Archetype_1 = __importDefault(require("../Archetype"));
var Component_fixtures_1 = require("./Component.fixtures");
var Archetypes;
(function (Archetypes) {
    Archetypes[Archetypes["All"] = 0] = "All";
    Archetypes[Archetypes["Empty"] = 1] = "Empty";
    Archetypes[Archetypes["NonEmpty"] = 2] = "NonEmpty";
    Archetypes[Archetypes["PositionOnly"] = 3] = "PositionOnly";
    Archetypes[Archetypes["Position"] = 4] = "Position";
    Archetypes[Archetypes["Physical"] = 5] = "Physical";
})(Archetypes || (Archetypes = {}));
describe('EntityManager', function () {
    test('can create', function () {
        var manager = new EntityManager_1.default();
        expect(manager.entities.size).toBe(0);
    });
    test('can add an entity', function () {
        var manager = new EntityManager_1.default();
        var entity = new Entity_1.default();
        manager.addEntity(entity);
        expect(manager.entities.size).toBe(1);
    });
    test('can find entities with specific types', function () {
        var manager = new EntityManager_1.default();
        var entity = new Entity_1.default([
            new Component_fixtures_1.PositionComponent({ x: 1, y: 2, z: 3 }),
            new Component_fixtures_1.RotationComponent({ x: 1, y: 2, z: 3 }),
            new Component_fixtures_1.VelocityComponent({ x: 1, y: 2, z: 3 })
        ]);
        manager.addEntity(entity);
        expect(manager.filter(['position'])).toEqual([entity]);
        expect(manager.filter(['position', 'rotation'])).toEqual([entity]);
        expect(manager.filter(['position', 'rotation'])).toEqual([entity]);
    });
    test('can add archetypes', function () {
        var manager = new EntityManager_1.default();
        var entity = new Entity_1.default();
        manager.addEntity(entity);
        var allArchetype = new Archetype_1.default(Archetypes.All);
        var emptyArchetype = new Archetype_1.default(Archetypes.Empty, [Archetype_1.default.only()]);
        var nonEmptyArchetype = new Archetype_1.default(Archetypes.NonEmpty, [
            function (x) { return x.componentTypes.length > 0; }
        ]);
        var positionOnlyArchetype = new Archetype_1.default(Archetypes.PositionOnly, [
            Archetype_1.default.only('position')
        ]);
        var positionArchetype = new Archetype_1.default(Archetypes.Position, [
            Archetype_1.default.include('position')
        ]);
        var physicalArchetype = new Archetype_1.default(Archetypes.Physical, [
            Archetype_1.default.include('position'),
            Archetype_1.default.include('rotation'),
            Archetype_1.default.include('velocity'),
            Archetype_1.default.exclude('static')
        ]);
        manager.addArchetype(allArchetype);
        manager.addArchetype(emptyArchetype);
        manager.addArchetype(nonEmptyArchetype);
        manager.addArchetype(positionOnlyArchetype);
        manager.addArchetype(positionArchetype);
        manager.addArchetype(physicalArchetype);
        expect(allArchetype.hasEntity(entity)).toBe(true);
        expect(emptyArchetype.hasEntity(entity)).toBe(true);
        expect(nonEmptyArchetype.hasEntity(entity)).toBe(false);
        expect(positionOnlyArchetype.hasEntity(entity)).toBe(false);
        expect(positionArchetype.hasEntity(entity)).toBe(false);
        expect(physicalArchetype.hasEntity(entity)).toBe(false);
        entity.addComponent(new Component_fixtures_1.PositionComponent({ x: 0, y: 0, z: 0 }));
        expect(emptyArchetype.hasEntity(entity)).toBe(false);
        expect(nonEmptyArchetype.hasEntity(entity)).toBe(true);
        expect(positionOnlyArchetype.hasEntity(entity)).toBe(true);
        expect(positionArchetype.hasEntity(entity)).toBe(true);
        expect(physicalArchetype.hasEntity(entity)).toBe(false);
        entity.addComponent(new Component_fixtures_1.RotationComponent({ x: 0, y: 0, z: 0 }));
        expect(positionOnlyArchetype.hasEntity(entity)).toBe(false);
        expect(positionArchetype.hasEntity(entity)).toBe(true);
        expect(physicalArchetype.hasEntity(entity)).toBe(false);
        entity.addComponent(new Component_fixtures_1.VelocityComponent({ x: 0, y: 0, z: 0 }));
        expect(positionArchetype.hasEntity(entity)).toBe(true);
        expect(physicalArchetype.hasEntity(entity)).toBe(true);
        entity.addComponent(new Component_fixtures_1.StaticComponent());
        expect(physicalArchetype.hasEntity(entity)).toBe(false);
    });
    test('can renew and release entities from entity pool', function () {
        var manager = new EntityManager_1.default({ poolSize: 10 });
        var entity = manager.renewEntity();
        expect(entity).toBeInstanceOf(Entity_1.default);
        manager.releaseEntity(entity);
    });
});
//# sourceMappingURL=EntityManager.test.js.map