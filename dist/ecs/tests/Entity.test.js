"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Component_1 = __importDefault(require("../Component"));
const Entity_1 = __importDefault(require("../Entity"));
const Component_fixtures_1 = require("./Component.fixtures");
class TagComponent extends Component_1.default {
}
class PrimitiveValueComponent extends Component_1.default {
}
class ArrayValueComponent extends Component_1.default {
}
describe('Entity', () => {
    test('can create', () => {
        const entity = new Entity_1.default();
        expect(entity.componentTypes.length).toBe(0);
    });
    test('can add component', () => {
        const pos = new Component_fixtures_1.PositionComponent({ x: 1, y: 2, z: 3 });
        const entity = new Entity_1.default();
        expect(entity.componentTypes.length).toBe(0);
        entity.addComponent(pos);
        expect(entity.componentTypes.length).toBe(1);
        expect(entity.hasComponents('position')).toBe(true);
        expect(entity.getComponentValue('position')).toEqual({
            x: 1,
            y: 2,
            z: 3
        });
    });
    test('can set component value', () => {
        const entity = new Entity_1.default([
            new Component_fixtures_1.PositionComponent({ x: 0, y: 0, z: 0 }),
            new PrimitiveValueComponent(1),
            new ArrayValueComponent([1, 2])
        ]);
        expect(entity.getComponent('unknown')).toBeUndefined();
        expect(() => entity.getComponentValue('unknown')).toThrow();
        const component = entity.getComponent('position');
        component.value.x = 1;
        expect(entity.getComponentValue('position')).toEqual({
            x: 1,
            y: 0,
            z: 0
        });
        entity.setComponentValue('position', { y: 2 });
        expect(entity.getComponentValue('position')).toEqual({
            x: 1,
            y: 2,
            z: 0
        });
        expect(entity.getComponentValue('primitiveValue')).toBe(1);
        entity.setComponentValue('primitiveValue', 2);
        expect(entity.getComponentValue('primitiveValue')).toBe(2);
        expect(entity.getComponentValue('arrayValue')).toEqual([1, 2]);
        entity.setComponentValue('arrayValue', [3, 4]);
        expect(entity.getComponentValue('arrayValue')).toEqual([3, 4]);
    });
    test('can toggle a tag component', () => {
        const entity = new Entity_1.default();
        entity.toggleComponent(TagComponent, true);
        expect(entity.hasComponent('tag')).toBe(true);
        entity.toggleComponent(TagComponent, false);
        expect(entity.hasComponent('tag')).toBe(false);
    });
    test('can handle onChange event', () => {
        const entity = new Entity_1.default();
        const spy = jest.fn();
        const disposer = entity.onChange(spy);
        expect(spy).not.toHaveBeenCalled();
        entity.toggleComponent(TagComponent, true);
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith({
            type: 'add',
            // componentType: 'tag',
            entity,
            component: new TagComponent()
        });
        entity.toggleComponent(TagComponent, false);
        expect(spy).toHaveBeenCalledWith({
            type: 'remove',
            entity,
            component: new TagComponent()
        });
        disposer();
        entity.toggleComponent(TagComponent, true);
        expect(spy.mock.calls.length).toBe(2);
    });
});
//# sourceMappingURL=Entity.test.js.map