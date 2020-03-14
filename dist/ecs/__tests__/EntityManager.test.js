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
        var AllArchetype = /** @class */ (function (_super) {
            __extends(AllArchetype, _super);
            function AllArchetype() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return AllArchetype;
        }(Archetype_1.default));
        var EmptyArchetype = /** @class */ (function (_super) {
            __extends(EmptyArchetype, _super);
            function EmptyArchetype() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.filters = [_this.only()];
                return _this;
            }
            return EmptyArchetype;
        }(Archetype_1.default));
        var NonEmptyArchetype = /** @class */ (function (_super) {
            __extends(NonEmptyArchetype, _super);
            function NonEmptyArchetype() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.filters = [function (x) { return x.componentTypes.length > 0; }];
                return _this;
            }
            return NonEmptyArchetype;
        }(Archetype_1.default));
        var PositionOnlyArchetype = /** @class */ (function (_super) {
            __extends(PositionOnlyArchetype, _super);
            function PositionOnlyArchetype() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.filters = [_this.only('position')];
                return _this;
            }
            return PositionOnlyArchetype;
        }(Archetype_1.default));
        var PositionArchetype = /** @class */ (function (_super) {
            __extends(PositionArchetype, _super);
            function PositionArchetype() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.filters = [_this.include('position')];
                return _this;
            }
            return PositionArchetype;
        }(Archetype_1.default));
        var PhysicalArchetype = /** @class */ (function (_super) {
            __extends(PhysicalArchetype, _super);
            function PhysicalArchetype() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.filters = [
                    _this.include('position', 'rotation', 'velocity'),
                    _this.exclude('static')
                ];
                return _this;
            }
            return PhysicalArchetype;
        }(Archetype_1.default));
        var allArchetype = manager.addArchetype(AllArchetype);
        var emptyArchetype = manager.addArchetype(EmptyArchetype);
        var nonEmptyArchetype = manager.addArchetype(NonEmptyArchetype);
        var positionOnlyArchetype = manager.addArchetype(PositionOnlyArchetype);
        var positionArchetype = manager.addArchetype(PositionArchetype);
        var physicalArchetype = manager.addArchetype(PhysicalArchetype);
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
        var id = entity.id;
        entity.add(new Component_fixtures_1.PositionComponent({ x: 0, y: 0, z: 0 }));
        expect(entity).toBeInstanceOf(Entity_1.default);
        manager.releaseEntity(entity);
        expect(entity.componentTypes.length).toBe(0);
        expect(entity.id).not.toBe(id);
        var entity2 = manager.renewEntity();
        expect(entity2).toBe(entity);
    });
});
//# sourceMappingURL=EntityManager.test.js.map