"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Archetype_1 = __importDefault(require("../Archetype"));
var Entity_1 = __importDefault(require("../Entity"));
var component_fixtures_1 = require("./component.fixtures");
var Archetypes;
(function (Archetypes) {
    Archetypes[Archetypes["All"] = 0] = "All";
    Archetypes[Archetypes["Empty"] = 1] = "Empty";
    Archetypes[Archetypes["NonEmpty"] = 2] = "NonEmpty";
    Archetypes[Archetypes["PositionOnly"] = 3] = "PositionOnly";
    Archetypes[Archetypes["Position"] = 4] = "Position";
    Archetypes[Archetypes["Physical"] = 5] = "Physical";
})(Archetypes || (Archetypes = {}));
describe('Archetype', function () {
    test('can create archetype', function () {
        var allArchetype = new Archetype_1.default(Archetypes.All);
        var emptyArchetype = new Archetype_1.default(Archetypes.Empty, [
            Archetype_1.default.only()
        ]);
        expect(allArchetype.filters.length).toBe(0);
        expect(emptyArchetype.filters.length).toBe(1);
    });
    test('can create archetype with filters', function () {
        var allArchetype = new Archetype_1.default(Archetypes.All);
        var emptyArchetype = new Archetype_1.default(Archetypes.Empty, [
            Archetype_1.default.only()
        ]);
        var nonEmptyArchetype = new Archetype_1.default(Archetypes.NonEmpty, [
            function (x) { return x.componentTypes.length > 0; }
        ]);
        var positionOnlyArchetype = new Archetype_1.default(Archetypes.PositionOnly, [Archetype_1.default.only('position')]);
        var positionArchetype = new Archetype_1.default(Archetypes.Position, [
            Archetype_1.default.include('position')
        ]);
        var physicalArchetype = new Archetype_1.default(Archetypes.Physical, [
            Archetype_1.default.include('position'),
            Archetype_1.default.include('rotation'),
            Archetype_1.default.include('velocity'),
            Archetype_1.default.exclude('static')
        ]);
        var entity = new Entity_1.default();
        expect(allArchetype.matchesEntity(entity)).toBe(true);
        expect(emptyArchetype.matchesEntity(entity)).toBe(true);
        expect(nonEmptyArchetype.matchesEntity(entity)).toBe(false);
        expect(positionOnlyArchetype.matchesEntity(entity)).toBe(false);
        expect(positionArchetype.matchesEntity(entity)).toBe(false);
        expect(physicalArchetype.matchesEntity(entity)).toBe(false);
        entity.addComponent(new component_fixtures_1.PositionComponent({ x: 0, y: 0, z: 0 }));
        expect(allArchetype.matchesEntity(entity)).toBe(true);
        expect(emptyArchetype.matchesEntity(entity)).toBe(false);
        expect(nonEmptyArchetype.matchesEntity(entity)).toBe(true);
        expect(positionOnlyArchetype.matchesEntity(entity)).toBe(true);
        expect(positionArchetype.matchesEntity(entity)).toBe(true);
        expect(physicalArchetype.matchesEntity(entity)).toBe(false);
        entity.addComponent(new component_fixtures_1.RotationComponent({ x: 0, y: 0, z: 0 }));
        expect(allArchetype.matchesEntity(entity)).toBe(true);
        expect(emptyArchetype.matchesEntity(entity)).toBe(false);
        expect(nonEmptyArchetype.matchesEntity(entity)).toBe(true);
        expect(positionOnlyArchetype.matchesEntity(entity)).toBe(false);
        expect(positionArchetype.matchesEntity(entity)).toBe(true);
        expect(physicalArchetype.matchesEntity(entity)).toBe(false);
        entity.addComponent(new component_fixtures_1.VelocityComponent({ x: 0, y: 0, z: 0 }));
        expect(physicalArchetype.matchesEntity(entity)).toBe(true);
        entity.addComponent(new component_fixtures_1.StaticComponent());
        expect(physicalArchetype.matchesEntity(entity)).toBe(false);
    });
});
//# sourceMappingURL=Archetype.test.js.map