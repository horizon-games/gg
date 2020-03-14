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
var Archetype_1 = __importDefault(require("../Archetype"));
var AllArchetype = /** @class */ (function (_super) {
    __extends(AllArchetype, _super);
    function AllArchetype() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AllArchetype;
}(Archetype_1.default));
exports.AllArchetype = AllArchetype;
var AnyArchetype = /** @class */ (function (_super) {
    __extends(AnyArchetype, _super);
    function AnyArchetype() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.filters = [_this.include('position', 'static')];
        return _this;
    }
    return AnyArchetype;
}(Archetype_1.default));
exports.AnyArchetype = AnyArchetype;
var EmptyArchetype = /** @class */ (function (_super) {
    __extends(EmptyArchetype, _super);
    function EmptyArchetype() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.filters = [_this.only()];
        return _this;
    }
    return EmptyArchetype;
}(Archetype_1.default));
exports.EmptyArchetype = EmptyArchetype;
var NonEmptyArchetype = /** @class */ (function (_super) {
    __extends(NonEmptyArchetype, _super);
    function NonEmptyArchetype() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.filters = [function (entity) { return entity.componentTypes.length > 0; }];
        return _this;
    }
    return NonEmptyArchetype;
}(Archetype_1.default));
exports.NonEmptyArchetype = NonEmptyArchetype;
var PositionOnlyArchetype = /** @class */ (function (_super) {
    __extends(PositionOnlyArchetype, _super);
    function PositionOnlyArchetype() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.filters = [_this.only('position')];
        return _this;
    }
    return PositionOnlyArchetype;
}(Archetype_1.default));
exports.PositionOnlyArchetype = PositionOnlyArchetype;
var PositionArchetype = /** @class */ (function (_super) {
    __extends(PositionArchetype, _super);
    function PositionArchetype() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.filters = [_this.include('position')];
        return _this;
    }
    return PositionArchetype;
}(Archetype_1.default));
exports.PositionArchetype = PositionArchetype;
var PhysicalArchetype = /** @class */ (function (_super) {
    __extends(PhysicalArchetype, _super);
    function PhysicalArchetype() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.filters = [
            _this.include('position', 'rotation', 'velocity'),
            _this.exclude('static')
        ];
        return _this;
    }
    return PhysicalArchetype;
}(Archetype_1.default));
exports.PhysicalArchetype = PhysicalArchetype;
//# sourceMappingURL=Archetype.fixtures.js.map