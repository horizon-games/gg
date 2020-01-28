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
var Component_1 = __importDefault(require("../Component"));
// export type Components = ComponentConfig<{
//   position: PositionComponent
//   rotation: RotationComponent
//   velocity: VelocityComponent
//   acceleration: AccelerationComponent
//   playerControllable: PlayerControllableComponent
//   static: StaticComponent
//   collider: ColliderComponent
// }>
// export interface PositionComponent extends Component {
//   x: number
//   y: number
//   z: number
// }
var PositionComponent = /** @class */ (function (_super) {
    __extends(PositionComponent, _super);
    function PositionComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PositionComponent;
}(Component_1.default));
exports.PositionComponent = PositionComponent;
var RotationComponent = /** @class */ (function (_super) {
    __extends(RotationComponent, _super);
    function RotationComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RotationComponent;
}(Component_1.default));
exports.RotationComponent = RotationComponent;
var VelocityComponent = /** @class */ (function (_super) {
    __extends(VelocityComponent, _super);
    function VelocityComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return VelocityComponent;
}(Component_1.default));
exports.VelocityComponent = VelocityComponent;
var AccelerationComponent = /** @class */ (function (_super) {
    __extends(AccelerationComponent, _super);
    function AccelerationComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AccelerationComponent;
}(Component_1.default));
exports.AccelerationComponent = AccelerationComponent;
var PlayerControllableComponent = /** @class */ (function (_super) {
    __extends(PlayerControllableComponent, _super);
    function PlayerControllableComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PlayerControllableComponent;
}(Component_1.default));
exports.PlayerControllableComponent = PlayerControllableComponent;
var StaticComponent = /** @class */ (function (_super) {
    __extends(StaticComponent, _super);
    function StaticComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return StaticComponent;
}(Component_1.default));
exports.StaticComponent = StaticComponent;
var ColliderComponent = /** @class */ (function (_super) {
    __extends(ColliderComponent, _super);
    function ColliderComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ColliderComponent;
}(Component_1.default));
exports.ColliderComponent = ColliderComponent;
exports.physicalAssemblage = function () {
    return [
        new PositionComponent({ x: 0, y: 0, z: 0 }),
        new RotationComponent({ x: 0, y: 0, z: 0 }),
        new VelocityComponent({ x: 0, y: 0, z: 0 }),
        new AccelerationComponent({ x: 0, y: 0, z: 0 }),
        new ColliderComponent(true)
    ];
};
//# sourceMappingURL=component.fixtures.js.map