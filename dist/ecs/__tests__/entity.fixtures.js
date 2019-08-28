"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Entity_1 = __importDefault(require("../Entity"));
var Component_fixtures_1 = require("./Component.fixtures");
exports.createEntityFixture = function () {
    var pos = new Component_fixtures_1.PositionComponent({ x: 0, y: 0, z: 0 });
    var rot = new Component_fixtures_1.RotationComponent({ x: 0, y: 0, z: 0 });
    var vel = new Component_fixtures_1.VelocityComponent({ x: 0, y: 0, z: 0 });
    var acc = new Component_fixtures_1.AccelerationComponent({ x: 0, y: 0, z: 0 });
    var playerControlled = new Component_fixtures_1.PlayerControllableComponent({ value: true });
    return new Entity_1.default([pos, rot, vel, acc, playerControlled]);
};
//# sourceMappingURL=entity.fixtures.js.map