"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
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
var Entity_1 = __importDefault(require("../Entity"));
var component_fixtures_1 = require("./component.fixtures");
var Component_1 = __importDefault(require("../Component"));
var TagComponent = /** @class */ (function (_super) {
    __extends(TagComponent, _super);
    function TagComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TagComponent;
}(Component_1.default));
var PrimitiveValueComponent = /** @class */ (function (_super) {
    __extends(PrimitiveValueComponent, _super);
    function PrimitiveValueComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PrimitiveValueComponent;
}(Component_1.default));
var ArrayValueComponent = /** @class */ (function (_super) {
    __extends(ArrayValueComponent, _super);
    function ArrayValueComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ArrayValueComponent;
}(Component_1.default));
describe('Entity', function () {
    test('can create', function () {
        var entity = new Entity_1.default();
        expect(entity.componentTypes.length).toBe(0);
    });
    test('can add component', function () {
        var pos = new component_fixtures_1.PositionComponent({ x: 1, y: 2, z: 3 });
        var entity = new Entity_1.default();
        expect(entity.componentTypes.length).toBe(0);
        entity.addComponent(pos);
        expect(entity.componentTypes.length).toBe(1);
        expect(entity.hasComponents('position')).toBe(true);
        expect(entity.getComponent('position')).toEqual({
            x: 1,
            y: 2,
            z: 3
        });
    });
    test('can set component value', function () {
        var entity = new Entity_1.default([
            new component_fixtures_1.PositionComponent({ x: 0, y: 0, z: 0 }),
            new PrimitiveValueComponent(1),
            new ArrayValueComponent([1, 2])
        ]);
        var component = entity.getComponent('position');
        component.x = 1;
        expect(entity.getComponent('position')).toEqual({
            x: 1,
            y: 0,
            z: 0
        });
        entity.setComponent('position', { y: 2 });
        expect(entity.getComponent('position')).toEqual({
            x: 1,
            y: 2,
            z: 0
        });
        expect(entity.getComponent('primitiveValue')).toBe(1);
        entity.setComponent('primitiveValue', 2);
        expect(entity.getComponent('primitiveValue')).toBe(2);
        expect(entity.getComponent('arrayValue')).toEqual([1, 2]);
        entity.setComponent('arrayValue', [3, 4]);
        expect(entity.getComponent('arrayValue')).toEqual([3, 4]);
    });
    test('can toggle a tag component', function () {
        var entity = new Entity_1.default();
        entity.toggleComponent(TagComponent, true);
        expect(entity.hasComponent('tag')).toBe(true);
        entity.toggleComponent(TagComponent, false);
        expect(entity.hasComponent('tag')).toBe(false);
    });
});
//# sourceMappingURL=Entity.test.js.map