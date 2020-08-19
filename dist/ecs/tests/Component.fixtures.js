"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.physicalAssemblage = exports.ColliderComponent = exports.StaticComponent = exports.PlayerControllableComponent = exports.AccelerationComponent = exports.VelocityComponent = exports.RotationComponent = exports.PositionComponent = void 0;
const Component_1 = __importDefault(require("../Component"));
class PositionComponent extends Component_1.default {
}
exports.PositionComponent = PositionComponent;
class RotationComponent extends Component_1.default {
}
exports.RotationComponent = RotationComponent;
class VelocityComponent extends Component_1.default {
}
exports.VelocityComponent = VelocityComponent;
class AccelerationComponent extends Component_1.default {
}
exports.AccelerationComponent = AccelerationComponent;
class PlayerControllableComponent extends Component_1.default {
}
exports.PlayerControllableComponent = PlayerControllableComponent;
class StaticComponent extends Component_1.default {
}
exports.StaticComponent = StaticComponent;
class ColliderComponent extends Component_1.default {
}
exports.ColliderComponent = ColliderComponent;
exports.physicalAssemblage = () => {
    return [
        new PositionComponent({ x: 0, y: 0, z: 0 }),
        new RotationComponent({ x: 0, y: 0, z: 0 }),
        new VelocityComponent({ x: 0, y: 0, z: 0 }),
        new AccelerationComponent({ x: 0, y: 0, z: 0 }),
        new ColliderComponent(true)
    ];
};
//# sourceMappingURL=Component.fixtures.js.map