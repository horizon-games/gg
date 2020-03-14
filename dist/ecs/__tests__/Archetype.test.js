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
var Archetype_1 = __importDefault(require("../Archetype"));
var Entity_1 = __importDefault(require("../Entity"));
var Component_fixtures_1 = require("./Component.fixtures");
describe('Archetype', function () {
    test('can create archetype', function () {
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
        expect(new AllArchetype().filters.length).toBe(0);
        expect(new EmptyArchetype().filters.length).toBe(1);
    });
    test('can create archetype with filters', function () {
        var AllArchetype = /** @class */ (function (_super) {
            __extends(AllArchetype, _super);
            function AllArchetype() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return AllArchetype;
        }(Archetype_1.default));
        var AnyArchetype = /** @class */ (function (_super) {
            __extends(AnyArchetype, _super);
            function AnyArchetype() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.filters = [_this.any('position', 'rotation')];
                return _this;
            }
            return AnyArchetype;
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
        var ExcludeArchetype = /** @class */ (function (_super) {
            __extends(ExcludeArchetype, _super);
            function ExcludeArchetype() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.filters = [_this.exclude('position', 'rotation', 'velocity')];
                return _this;
            }
            return ExcludeArchetype;
        }(Archetype_1.default));
        var entity = new Entity_1.default();
        var allArchetype = new AllArchetype();
        var anyArchetype = new AnyArchetype();
        var emptyArchetype = new EmptyArchetype();
        var nonEmptyArchetype = new NonEmptyArchetype();
        var positionOnlyArchetype = new PositionOnlyArchetype();
        var positionArchetype = new PositionArchetype();
        var physicalArchetype = new PhysicalArchetype();
        var excludeArchetype = new ExcludeArchetype();
        expect(allArchetype.matchesEntity(entity)).toBe(true);
        expect(anyArchetype.matchesEntity(entity)).toBe(false);
        expect(emptyArchetype.matchesEntity(entity)).toBe(true);
        expect(nonEmptyArchetype.matchesEntity(entity)).toBe(false);
        expect(positionOnlyArchetype.matchesEntity(entity)).toBe(false);
        expect(positionArchetype.matchesEntity(entity)).toBe(false);
        expect(physicalArchetype.matchesEntity(entity)).toBe(false);
        expect(excludeArchetype.matchesEntity(entity)).toBe(true);
        entity.addComponent(new Component_fixtures_1.PositionComponent({ x: 0, y: 0, z: 0 }));
        expect(allArchetype.matchesEntity(entity)).toBe(true);
        expect(anyArchetype.matchesEntity(entity)).toBe(true);
        expect(emptyArchetype.matchesEntity(entity)).toBe(false);
        expect(nonEmptyArchetype.matchesEntity(entity)).toBe(true);
        expect(positionOnlyArchetype.matchesEntity(entity)).toBe(true);
        expect(positionArchetype.matchesEntity(entity)).toBe(true);
        expect(physicalArchetype.matchesEntity(entity)).toBe(false);
        expect(excludeArchetype.matchesEntity(entity)).toBe(false);
        entity.addComponent(new Component_fixtures_1.RotationComponent({ x: 0, y: 0, z: 0 }));
        expect(allArchetype.matchesEntity(entity)).toBe(true);
        expect(anyArchetype.matchesEntity(entity)).toBe(true);
        expect(emptyArchetype.matchesEntity(entity)).toBe(false);
        expect(nonEmptyArchetype.matchesEntity(entity)).toBe(true);
        expect(positionOnlyArchetype.matchesEntity(entity)).toBe(false);
        expect(positionArchetype.matchesEntity(entity)).toBe(true);
        expect(physicalArchetype.matchesEntity(entity)).toBe(false);
        expect(excludeArchetype.matchesEntity(entity)).toBe(false);
        entity.addComponent(new Component_fixtures_1.VelocityComponent({ x: 0, y: 0, z: 0 }));
        expect(physicalArchetype.matchesEntity(entity)).toBe(true);
        expect(excludeArchetype.matchesEntity(entity)).toBe(false);
        entity.addComponent(new Component_fixtures_1.StaticComponent());
        expect(physicalArchetype.matchesEntity(entity)).toBe(false);
        entity.removeComponent('position');
        expect(excludeArchetype.matchesEntity(entity)).toBe(false);
        entity.removeComponent('rotation');
        expect(excludeArchetype.matchesEntity(entity)).toBe(false);
        entity.removeComponent('velocity');
        expect(excludeArchetype.matchesEntity(entity)).toBe(true);
    });
    test('can handle onChange event', function () {
        var PositionArchetype = /** @class */ (function (_super) {
            __extends(PositionArchetype, _super);
            function PositionArchetype() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.filters = [_this.include('position')];
                return _this;
            }
            return PositionArchetype;
        }(Archetype_1.default));
        var archetype = new PositionArchetype();
        var spy = jest.fn();
        var disposer = archetype.onChange(spy);
        expect(spy).not.toHaveBeenCalled();
        var entity = new Entity_1.default();
        archetype.handleEntityChange(entity);
        expect(archetype.entities).toHaveLength(0);
        expect(spy).not.toHaveBeenCalled();
        entity.addComponent(new Component_fixtures_1.PositionComponent({ x: 0, y: 0, z: 0 }));
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
        entity.addComponent(new Component_fixtures_1.PositionComponent({ x: 0, y: 0, z: 0 }));
        archetype.handleEntityChange(entity);
        expect(spy.mock.calls).toHaveLength(2);
    });
    test('can handle onAdd event', function () {
        var PositionArchetype = /** @class */ (function (_super) {
            __extends(PositionArchetype, _super);
            function PositionArchetype() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.filters = [_this.include('position')];
                return _this;
            }
            return PositionArchetype;
        }(Archetype_1.default));
        var archetype = new PositionArchetype();
        var spy = jest.fn();
        var disposer = archetype.onAdd(spy);
        expect(spy).not.toHaveBeenCalled();
        var entity = new Entity_1.default();
        archetype.handleEntityChange(entity);
        expect(archetype.entities).toHaveLength(0);
        expect(spy).not.toHaveBeenCalled();
        entity.addComponent(new Component_fixtures_1.PositionComponent({ x: 0, y: 0, z: 0 }));
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
        disposer();
        entity.addComponent(new Component_fixtures_1.PositionComponent({ x: 0, y: 0, z: 0 }));
        archetype.handleEntityChange(entity);
        expect(spy.mock.calls).toHaveLength(1);
    });
    test('can handle onRemove event', function () {
        var PositionArchetype = /** @class */ (function (_super) {
            __extends(PositionArchetype, _super);
            function PositionArchetype() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.filters = [_this.include('position')];
                return _this;
            }
            return PositionArchetype;
        }(Archetype_1.default));
        var archetype = new PositionArchetype();
        var spy = jest.fn();
        var disposer = archetype.onRemove(spy);
        expect(spy).not.toHaveBeenCalled();
        var entity = new Entity_1.default();
        archetype.handleEntityChange(entity);
        expect(archetype.entities).toHaveLength(0);
        expect(spy).not.toHaveBeenCalled();
        entity.addComponent(new Component_fixtures_1.PositionComponent({ x: 0, y: 0, z: 0 }));
        archetype.handleEntityChange(entity);
        expect(archetype.entities).toHaveLength(1);
        expect(spy).not.toHaveBeenCalled();
        entity.removeComponent('position');
        archetype.handleEntityChange(entity);
        expect(spy).toHaveBeenCalledWith({
            type: 'remove',
            archetype: archetype,
            entity: entity
        });
        expect(archetype.entities).toHaveLength(0);
        disposer();
        entity.addComponent(new Component_fixtures_1.PositionComponent({ x: 0, y: 0, z: 0 }));
        archetype.handleEntityChange(entity);
        entity.removeComponent('position');
        archetype.handleEntityChange(entity);
        expect(spy.mock.calls).toHaveLength(1);
    });
});
//# sourceMappingURL=Archetype.test.js.map