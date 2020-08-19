"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class System {
    constructor(options = {}) {
        this.enabled = true;
        Object.assign(this, options);
    }
    init(_) {
        // stub
    }
    enable() {
        this.enabled = true;
    }
    disable() {
        this.enabled = false;
    }
}
exports.default = System;
//# sourceMappingURL=System.js.map