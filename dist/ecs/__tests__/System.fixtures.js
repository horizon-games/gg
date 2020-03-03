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
var System_1 = __importDefault(require("../System"));
var archetype_fixtures_1 = require("./archetype.fixtures");
var PhysicsSystem = /** @class */ (function (_super) {
    __extends(PhysicsSystem, _super);
    function PhysicsSystem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PhysicsSystem.prototype.update = function (manager, dt) {
        var all = manager.getArchetype(archetype_fixtures_1.Archetypes.Physical);
        all.entities.forEach(function (entity) {
            entity.getComponentValue('position').x += 1;
        });
    };
    PhysicsSystem.prototype.someMethod = function () {
        return 5;
    };
    return PhysicsSystem;
}(System_1.default));
exports.PhysicsSystem = PhysicsSystem;
//# sourceMappingURL=System.fixtures.js.map