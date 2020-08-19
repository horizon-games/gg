"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEntityFixture = void 0;
const Entity_1 = __importDefault(require("../Entity"));
const Component_fixtures_1 = require("./Component.fixtures");
exports.createEntityFixture = () => {
    const pos = new Component_fixtures_1.PositionComponent({ x: 0, y: 0, z: 0 });
    const rot = new Component_fixtures_1.RotationComponent({ x: 0, y: 0, z: 0 });
    const vel = new Component_fixtures_1.VelocityComponent({ x: 0, y: 0, z: 0 });
    const acc = new Component_fixtures_1.AccelerationComponent({ x: 0, y: 0, z: 0 });
    const playerControlled = new Component_fixtures_1.PlayerControllableComponent(true);
    return new Entity_1.default([pos, rot, vel, acc, playerControlled]);
};
//# sourceMappingURL=Entity.fixtures.js.map