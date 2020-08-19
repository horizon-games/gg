"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhysicalArchetype = exports.PositionArchetype = exports.PositionOnlyArchetype = exports.NonEmptyArchetype = exports.EmptyArchetype = exports.AnyArchetype = exports.AllArchetype = void 0;
const Archetype_1 = __importDefault(require("../Archetype"));
class AllArchetype extends Archetype_1.default {
}
exports.AllArchetype = AllArchetype;
class AnyArchetype extends Archetype_1.default {
    constructor() {
        super(...arguments);
        this.filters = [this.include('position', 'static')];
    }
}
exports.AnyArchetype = AnyArchetype;
class EmptyArchetype extends Archetype_1.default {
    constructor() {
        super(...arguments);
        this.filters = [this.only()];
    }
}
exports.EmptyArchetype = EmptyArchetype;
class NonEmptyArchetype extends Archetype_1.default {
    constructor() {
        super(...arguments);
        this.filters = [(entity) => entity.componentTypes.length > 0];
    }
}
exports.NonEmptyArchetype = NonEmptyArchetype;
class PositionOnlyArchetype extends Archetype_1.default {
    constructor() {
        super(...arguments);
        this.filters = [this.only('position')];
    }
}
exports.PositionOnlyArchetype = PositionOnlyArchetype;
class PositionArchetype extends Archetype_1.default {
    constructor() {
        super(...arguments);
        this.filters = [this.include('position')];
    }
}
exports.PositionArchetype = PositionArchetype;
class PhysicalArchetype extends Archetype_1.default {
    constructor() {
        super(...arguments);
        this.filters = [
            this.include('position', 'rotation', 'velocity'),
            this.exclude('static')
        ];
    }
}
exports.PhysicalArchetype = PhysicalArchetype;
//# sourceMappingURL=Archetype.fixtures.js.map