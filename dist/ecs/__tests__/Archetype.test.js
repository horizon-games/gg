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
    Archetypes[Archetypes["Any"] = 1] = "Any";
    Archetypes[Archetypes["Empty"] = 2] = "Empty";
    Archetypes[Archetypes["NonEmpty"] = 3] = "NonEmpty";
    Archetypes[Archetypes["PositionOnly"] = 4] = "PositionOnly";
    Archetypes[Archetypes["Position"] = 5] = "Position";
    Archetypes[Archetypes["Physical"] = 6] = "Physical";
    Archetypes[Archetypes["Exclude"] = 7] = "Exclude";
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
        var anyArchetype = new Archetype_1.default(Archetypes.Any, [
            Archetype_1.default.any('position', 'rotation')
        ]);
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
            Archetype_1.default.include('position', 'rotation', 'velocity'),
            Archetype_1.default.exclude('static')
        ]);
        var excludeArchetype = new Archetype_1.default(Archetypes.Exclude, [
            Archetype_1.default.exclude('position', 'rotation', 'velocity')
        ]);
        var entity = new Entity_1.default();
        expect(allArchetype.matchesEntity(entity)).toBe(true);
        expect(anyArchetype.matchesEntity(entity)).toBe(false);
        expect(emptyArchetype.matchesEntity(entity)).toBe(true);
        expect(nonEmptyArchetype.matchesEntity(entity)).toBe(false);
        expect(positionOnlyArchetype.matchesEntity(entity)).toBe(false);
        expect(positionArchetype.matchesEntity(entity)).toBe(false);
        expect(physicalArchetype.matchesEntity(entity)).toBe(false);
        expect(excludeArchetype.matchesEntity(entity)).toBe(true);
        entity.addComponent(new component_fixtures_1.PositionComponent({ x: 0, y: 0, z: 0 }));
        expect(allArchetype.matchesEntity(entity)).toBe(true);
        expect(anyArchetype.matchesEntity(entity)).toBe(true);
        expect(emptyArchetype.matchesEntity(entity)).toBe(false);
        expect(nonEmptyArchetype.matchesEntity(entity)).toBe(true);
        expect(positionOnlyArchetype.matchesEntity(entity)).toBe(true);
        expect(positionArchetype.matchesEntity(entity)).toBe(true);
        expect(physicalArchetype.matchesEntity(entity)).toBe(false);
        expect(excludeArchetype.matchesEntity(entity)).toBe(false);
        entity.addComponent(new component_fixtures_1.RotationComponent({ x: 0, y: 0, z: 0 }));
        expect(allArchetype.matchesEntity(entity)).toBe(true);
        expect(anyArchetype.matchesEntity(entity)).toBe(true);
        expect(emptyArchetype.matchesEntity(entity)).toBe(false);
        expect(nonEmptyArchetype.matchesEntity(entity)).toBe(true);
        expect(positionOnlyArchetype.matchesEntity(entity)).toBe(false);
        expect(positionArchetype.matchesEntity(entity)).toBe(true);
        expect(physicalArchetype.matchesEntity(entity)).toBe(false);
        expect(excludeArchetype.matchesEntity(entity)).toBe(false);
        entity.addComponent(new component_fixtures_1.VelocityComponent({ x: 0, y: 0, z: 0 }));
        expect(physicalArchetype.matchesEntity(entity)).toBe(true);
        expect(excludeArchetype.matchesEntity(entity)).toBe(false);
        entity.addComponent(new component_fixtures_1.StaticComponent());
        expect(physicalArchetype.matchesEntity(entity)).toBe(false);
        entity.removeComponent('position');
        expect(excludeArchetype.matchesEntity(entity)).toBe(false);
        entity.removeComponent('rotation');
        expect(excludeArchetype.matchesEntity(entity)).toBe(false);
        entity.removeComponent('velocity');
        expect(excludeArchetype.matchesEntity(entity)).toBe(true);
    });
    test('can handle onChange event', function () {
        var archetype = new Archetype_1.default(Archetypes.Position, [
            Archetype_1.default.include('position')
        ]);
        var spy = jest.fn();
        var disposer = archetype.onChange(spy);
        expect(spy).not.toHaveBeenCalled();
        var entity = new Entity_1.default();
        archetype.handleEntityChange(entity);
        expect(archetype.entities).toHaveLength(0);
        expect(spy).not.toHaveBeenCalled();
        entity.addComponent(new component_fixtures_1.PositionComponent({ x: 0, y: 0, z: 0 }));
        archetype.handleEntityChange(entity);
        expect(archetype.entities).toHaveLength(1);
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith({
            type: 'add',
            archetype: archetype,
            entity: entity
        });
        entity.removeComponent('position');
        archetype.handleEntityChange(entity);
        expect(archetype.entities).toHaveLength(0);
        expect(spy).toHaveBeenCalledWith({
            type: 'remove',
            archetype: archetype,
            entity: entity
        });
        disposer();
        entity.addComponent(new component_fixtures_1.PositionComponent({ x: 0, y: 0, z: 0 }));
        archetype.handleEntityChange(entity);
        expect(spy.mock.calls).toHaveLength(2);
    });
});
//# sourceMappingURL=Archetype.test.js.map