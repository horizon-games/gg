"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EntityManager_1 = __importDefault(require("../EntityManager"));
const Entity_1 = __importDefault(require("../Entity"));
const Archetype_1 = __importDefault(require("../Archetype"));
const Component_fixtures_1 = require("./Component.fixtures");
var Archetypes;
(function (Archetypes) {
    Archetypes[Archetypes["All"] = 0] = "All";
    Archetypes[Archetypes["Empty"] = 1] = "Empty";
    Archetypes[Archetypes["NonEmpty"] = 2] = "NonEmpty";
    Archetypes[Archetypes["PositionOnly"] = 3] = "PositionOnly";
    Archetypes[Archetypes["Position"] = 4] = "Position";
    Archetypes[Archetypes["Physical"] = 5] = "Physical";
})(Archetypes || (Archetypes = {}));
describe('EntityManager', () => {
    test('can create', () => {
        const manager = new EntityManager_1.default();
        expect(manager.entities.size).toBe(0);
    });
    test('can add an entity', () => {
        const manager = new EntityManager_1.default();
        const entity = new Entity_1.default();
        manager.addEntity(entity);
        expect(manager.entities.size).toBe(1);
    });
    test('can find entities with specific types', () => {
        const manager = new EntityManager_1.default();
        const entity = new Entity_1.default([
            new Component_fixtures_1.PositionComponent({ x: 1, y: 2, z: 3 }),
            new Component_fixtures_1.RotationComponent({ x: 1, y: 2, z: 3 }),
            new Component_fixtures_1.VelocityComponent({ x: 1, y: 2, z: 3 })
        ]);
        manager.addEntity(entity);
        expect(manager.filter(['position'])).toEqual([entity]);
        expect(manager.filter(['position', 'rotation'])).toEqual([entity]);
        expect(manager.filter(['position', 'rotation'])).toEqual([entity]);
    });
    test('can add archetypes', () => {
        const manager = new EntityManager_1.default();
        const entity = new Entity_1.default();
        manager.addEntity(entity);
        class AllArchetype extends Archetype_1.default {
        }
        class EmptyArchetype extends Archetype_1.default {
            constructor() {
                super(...arguments);
                this.filters = [this.only()];
            }
        }
        class NonEmptyArchetype extends Archetype_1.default {
            constructor() {
                super(...arguments);
                this.filters = [(x) => x.componentTypes.length > 0];
            }
        }
        class PositionOnlyArchetype extends Archetype_1.default {
            constructor() {
                super(...arguments);
                this.filters = [this.only('position')];
            }
        }
        class PositionArchetype extends Archetype_1.default {
            constructor() {
                super(...arguments);
                this.filters = [this.include('position')];
            }
        }
        class PhysicalArchetype extends Archetype_1.default {
            constructor() {
                super(...arguments);
                this.filters = [
                    this.include('position', 'rotation', 'velocity'),
                    this.exclude('static')
                ];
            }
        }
        const allArchetype = manager.addArchetype(AllArchetype);
        const emptyArchetype = manager.addArchetype(EmptyArchetype);
        const nonEmptyArchetype = manager.addArchetype(NonEmptyArchetype);
        const positionOnlyArchetype = manager.addArchetype(PositionOnlyArchetype);
        const positionArchetype = manager.addArchetype(PositionArchetype);
        const physicalArchetype = manager.addArchetype(PhysicalArchetype);
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
    test('can renew and release entities from entity pool', () => {
        const manager = new EntityManager_1.default({ poolSize: 10 });
        const entity = manager.renewEntity();
        const { id } = entity;
        entity.add(new Component_fixtures_1.PositionComponent({ x: 0, y: 0, z: 0 }));
        expect(entity).toBeInstanceOf(Entity_1.default);
        manager.releaseEntity(entity);
        expect(entity.componentTypes.length).toBe(0);
        expect(entity.id).not.toBe(id);
        const entity2 = manager.renewEntity();
        expect(entity2).toBe(entity);
    });
});
//# sourceMappingURL=EntityManager.test.js.map