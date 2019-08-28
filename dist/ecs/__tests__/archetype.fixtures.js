"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Archetype_1 = __importDefault(require("../Archetype"));
var Archetypes;
(function (Archetypes) {
    Archetypes[Archetypes["All"] = 0] = "All";
    Archetypes[Archetypes["Any"] = 1] = "Any";
    Archetypes[Archetypes["Empty"] = 2] = "Empty";
    Archetypes[Archetypes["NonEmpty"] = 3] = "NonEmpty";
    Archetypes[Archetypes["PositionOnly"] = 4] = "PositionOnly";
    Archetypes[Archetypes["Position"] = 5] = "Position";
    Archetypes[Archetypes["Physical"] = 6] = "Physical";
})(Archetypes = exports.Archetypes || (exports.Archetypes = {}));
exports.allArchetype = new Archetype_1.default(Archetypes.All);
exports.anyArchetype = new Archetype_1.default(Archetypes.Any, [
    Archetype_1.default.any('position', 'static')
]);
exports.emptyArchetype = new Archetype_1.default(Archetypes.Empty, [
    Archetype_1.default.only()
]);
exports.nonEmptyArchetype = new Archetype_1.default(Archetypes.NonEmpty, [function (entity) { return entity.componentTypes.length > 0; }]);
exports.positionOnlyArchetype = new Archetype_1.default(Archetypes.PositionOnly, [Archetype_1.default.only('position')]);
exports.positionArchetype = new Archetype_1.default(Archetypes.Position, [Archetype_1.default.include('position')]);
exports.physicalArchetype = new Archetype_1.default(Archetypes.Physical, [
    Archetype_1.default.include('position'),
    Archetype_1.default.include('rotation'),
    Archetype_1.default.include('velocity'),
    Archetype_1.default.exclude('static')
]);
//# sourceMappingURL=Archetype.fixtures.js.map