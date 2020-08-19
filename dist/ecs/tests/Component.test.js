"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Component_1 = __importDefault(require("../Component"));
const Component_fixtures_1 = require("./Component.fixtures");
describe('Component', () => {
    test('can create', () => {
        const component = new Component_fixtures_1.PositionComponent({ x: 1, y: 2, z: 3 });
        expect(component).toBeInstanceOf(Component_1.default);
        expect(component).toBeInstanceOf(Component_fixtures_1.PositionComponent);
        expect(component.type).toBe('position');
        expect(component.value).toEqual({ x: 1, y: 2, z: 3 });
        component.value.x = 4;
        expect(component.value).toEqual({ x: 4, y: 2, z: 3 });
    });
});
//# sourceMappingURL=Component.test.js.map