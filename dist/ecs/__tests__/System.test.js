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
var System_1 = __importDefault(require("../System"));
var Archetypes;
(function (Archetypes) {
    Archetypes[Archetypes["All"] = 0] = "All";
    Archetypes[Archetypes["Empty"] = 1] = "Empty";
    Archetypes[Archetypes["NonEmpty"] = 2] = "NonEmpty";
    Archetypes[Archetypes["PositionOnly"] = 3] = "PositionOnly";
    Archetypes[Archetypes["Position"] = 4] = "Position";
    Archetypes[Archetypes["Physical"] = 5] = "Physical";
})(Archetypes || (Archetypes = {}));
var PhysicsSystem = /** @class */ (function (_super) {
    __extends(PhysicsSystem, _super);
    function PhysicsSystem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PhysicsSystem.prototype.update = function (manager, dt, time) {
        var all = manager.getArchetype(Archetypes.All);
    };
    return PhysicsSystem;
}(System_1.default));
describe('System', function () {
    test('can create', function () {
        var system = new PhysicsSystem();
        expect(system.enabled).toBe(true);
        expect(system.type).toBe('physics');
    });
});
//# sourceMappingURL=System.test.js.map