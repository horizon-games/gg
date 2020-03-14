"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var World_1 = __importDefault(require("../World"));
var Archetype_1 = __importDefault(require("../Archetype"));
var Component_fixtures_1 = require("./Component.fixtures");
var System_fixtures_1 = require("./System.fixtures");
var Archetype_fixtures_1 = require("./Archetype.fixtures");
describe('World', function () {
    test('can create', function () {
        var world = new World_1.default();
    });
    test('can add archetype', function () {
        var world = new World_1.default();
        var AllArchetype = /** @class */ (function (_super) {
            __extends(AllArchetype, _super);
            function AllArchetype() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return AllArchetype;
        }(Archetype_1.default));
        world.addArchetype(AllArchetype);
        expect(world.hasArchetype(AllArchetype)).toBe(true);
        world.createEntity(Component_fixtures_1.physicalAssemblage());
        expect(world.getArchetype(AllArchetype).entities.length).toBe(1);
    });
    test('can add systems', function () {
        var world = new World_1.default();
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
    test('can get systems', function () {
        var world = new World_1.default();
        world.addArchetype(Archetype_fixtures_1.PhysicalArchetype);
        world.addSystems(new System_fixtures_1.PhysicsSystem());
        expect(world.hasSystem(System_fixtures_1.PhysicsSystem)).toBe(true);
        var a = world.getSystem(System_fixtures_1.PhysicsSystem);
        expect(a).toBeInstanceOf(System_fixtures_1.PhysicsSystem);
    });
});
//# sourceMappingURL=World.test.js.map