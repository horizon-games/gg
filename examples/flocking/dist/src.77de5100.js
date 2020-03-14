// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/stats.js/build/stats.min.js":[function(require,module,exports) {
var define;
// stats.js - http://github.com/mrdoob/stats.js
(function(f,e){"object"===typeof exports&&"undefined"!==typeof module?module.exports=e():"function"===typeof define&&define.amd?define(e):f.Stats=e()})(this,function(){var f=function(){function e(a){c.appendChild(a.dom);return a}function u(a){for(var d=0;d<c.children.length;d++)c.children[d].style.display=d===a?"block":"none";l=a}var l=0,c=document.createElement("div");c.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000";c.addEventListener("click",function(a){a.preventDefault();
u(++l%c.children.length)},!1);var k=(performance||Date).now(),g=k,a=0,r=e(new f.Panel("FPS","#0ff","#002")),h=e(new f.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var t=e(new f.Panel("MB","#f08","#201"));u(0);return{REVISION:16,dom:c,addPanel:e,showPanel:u,begin:function(){k=(performance||Date).now()},end:function(){a++;var c=(performance||Date).now();h.update(c-k,200);if(c>g+1E3&&(r.update(1E3*a/(c-g),100),g=c,a=0,t)){var d=performance.memory;t.update(d.usedJSHeapSize/
1048576,d.jsHeapSizeLimit/1048576)}return c},update:function(){k=this.end()},domElement:c,setMode:u}};f.Panel=function(e,f,l){var c=Infinity,k=0,g=Math.round,a=g(window.devicePixelRatio||1),r=80*a,h=48*a,t=3*a,v=2*a,d=3*a,m=15*a,n=74*a,p=30*a,q=document.createElement("canvas");q.width=r;q.height=h;q.style.cssText="width:80px;height:48px";var b=q.getContext("2d");b.font="bold "+9*a+"px Helvetica,Arial,sans-serif";b.textBaseline="top";b.fillStyle=l;b.fillRect(0,0,r,h);b.fillStyle=f;b.fillText(e,t,v);
b.fillRect(d,m,n,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d,m,n,p);return{dom:q,update:function(h,w){c=Math.min(c,h);k=Math.max(k,h);b.fillStyle=l;b.globalAlpha=1;b.fillRect(0,0,r,m);b.fillStyle=f;b.fillText(g(h)+" "+e+" ("+g(c)+"-"+g(k)+")",t,v);b.drawImage(q,d+a,m,n-a,p,d,m,n-a,p);b.fillRect(d+n-a,m,a,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d+n-a,m,a,g((1-h/w)*p))}}};return f});

},{}],"../../../src/ecs/Component.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ComponentTypeRegExp = /Component$/;

exports.getComponentTypeFromClass = function (klass) {
  return klass.name.charAt(0).toLowerCase() + klass.name.slice(1).replace(ComponentTypeRegExp, '');
};

var Component =
/** @class */
function () {
  function Component(value) {
    this.value = value;
    this.type = exports.getComponentTypeFromClass(this.constructor);
  }

  Component.prototype.onAttach = function (entity) {// stub
  };

  Component.prototype.onDetach = function (entity) {// stub
  };

  return Component;
}();

exports.default = Component;
},{}],"../../../src/ecs/Entity.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Component_1 = require("./Component");

var instanceIdx = 0;

var Entity =
/** @class */
function () {
  function Entity(components) {
    var _this = this;

    if (components === void 0) {
      components = [];
    }

    this.components = {};
    this.onChangeListeners = new Set(); // tslint:disable-next-line

    this.has = this.hasComponent;

    this.hasComponents = function () {
      var types = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        types[_i] = arguments[_i];
      }

      return types.every(function (type) {
        return _this.hasComponent(type);
      });
    };

    this.addComponent = function (component) {
      if (!_this.hasComponent(component.type)) {
        _this.components[component.type] = component;
        component.onAttach(_this);

        _this.onChangeListeners.forEach(function (listener) {
          return listener({
            type: 'add',
            entity: _this,
            component: component
          });
        });
      } else {
        throw new Error("Entity already contains component of type " + component.type + ".");
      }
    }; // tslint:disable-next-line


    this.add = this.addComponent;

    this.removeComponent = function (type) {
      if (_this.hasComponent(type)) {
        var component_1 = _this.components[type];
        delete _this.components[type];
        component_1.onDetach(_this);

        _this.onChangeListeners.forEach(function (listener) {
          return listener({
            type: 'remove',
            entity: _this,
            component: component_1
          });
        });
      }
    }; // tslint:disable-next-line


    this.remove = this.removeComponent; // tslint:disable-next-line

    this.toggle = this.toggleComponent; // tslint:disable-next-line

    this.get = this.getComponentValue; // tslint:disable-next-line

    this.set = this.setComponentValue;
    this.reset();
    this.renew(components);
  }

  Object.defineProperty(Entity.prototype, "componentTypes", {
    get: function get() {
      return Object.keys(this.components);
    },
    enumerable: true,
    configurable: true
  });

  Entity.prototype.renew = function (components) {
    if (components === void 0) {
      components = [];
    }

    components.forEach(this.addComponent);
    return this;
  };

  Entity.prototype.reset = function () {
    this.componentTypes.reverse().forEach(this.removeComponent);
    this.id = ++instanceIdx;
    this.onChangeListeners = new Set();
    return this;
  };

  Entity.prototype.onChange = function (listener) {
    var _this = this;

    this.onChangeListeners.add(listener);
    return function () {
      return _this.onChangeListeners.delete(listener);
    };
  };

  Entity.prototype.hasComponent = function (type) {
    return !!this.components[type];
  };

  Entity.prototype.toggleComponent = function (componentClass, predicate) {
    var componentType = Component_1.getComponentTypeFromClass(componentClass);

    if (predicate) {
      if (!this.hasComponent(componentType)) {
        this.addComponent(new componentClass());
      }
    } else {
      this.removeComponent(componentType);
    }
  }; // Get component instance


  Entity.prototype.getComponent = function (type) {
    return this.components[type];
  };

  Entity.prototype.getComponentValue = function (type) {
    if (this.hasComponent(type)) {
      return this.components[type].value;
    } else {
      throw new Error("Entity does not contain component of type " + type + ".");
    }
  };

  Entity.prototype.setComponentValue = function (type, value) {
    if (this.hasComponent(type)) {
      if (_typeof(value) === 'object' && !Array.isArray(value)) {
        Object.assign(this.components[type].value, value);
      } else {
        this.components[type].value = value;
      }
    } else {
      throw new Error("Entity does not contain component of type " + type + ".");
    }
  };

  return Entity;
}();

exports.default = Entity;
},{"./Component":"../../../src/ecs/Component.ts"}],"../../../src/ecs/Archetype.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Archetype =
/** @class */
function () {
  function Archetype() {
    this.include = function () {
      var componentTypes = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        componentTypes[_i] = arguments[_i];
      }

      return function (entity) {
        return entity.hasComponents.apply(entity, componentTypes);
      };
    };

    this.exclude = function () {
      var componentTypes = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        componentTypes[_i] = arguments[_i];
      }

      return function (entity) {
        return componentTypes.every(function (type) {
          return !entity.hasComponent(type);
        });
      };
    };

    this.only = function () {
      var componentTypes = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        componentTypes[_i] = arguments[_i];
      }

      return function (entity) {
        return componentTypes.length === entity.componentTypes.length && entity.hasComponents.apply(entity, componentTypes);
      };
    };

    this.any = function () {
      var componentTypes = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        componentTypes[_i] = arguments[_i];
      }

      return function (entity) {
        return componentTypes.some(function (type) {
          return entity.hasComponent(type);
        });
      };
    };

    this.filters = [];
    this.entities = [];
    this.onChangeListeners = new Set();
    this.onAddListeners = new Set();
    this.onRemoveListeners = new Set();
  }

  Archetype.prototype.onChange = function (listener) {
    var _this = this;

    this.onChangeListeners.add(listener);
    return function () {
      return _this.onChangeListeners.delete(listener);
    };
  };

  Archetype.prototype.onAdd = function (listener) {
    var _this = this;

    this.onAddListeners.add(listener);
    return function () {
      return _this.onAddListeners.delete(listener);
    };
  };

  Archetype.prototype.onRemove = function (listener) {
    var _this = this;

    this.onRemoveListeners.add(listener);
    return function () {
      return _this.onRemoveListeners.delete(listener);
    };
  };

  Archetype.prototype.matchesEntity = function (entity) {
    return this.filters.every(function (filter) {
      return filter(entity);
    });
  };

  Archetype.prototype.hasEntity = function (entity) {
    return this.entities.indexOf(entity) !== -1;
  };

  Archetype.prototype.handleEntityChange = function (entity, component) {
    if (this.hasEntity(entity)) {
      // Does this entity need to be removed
      if (!this.matchesEntity(entity)) {
        this.handleEntityRemove(entity, component);
      }
    } else {
      // Does this entity need to be added
      if (this.matchesEntity(entity)) {
        this.handleEntityAdd(entity, component);
      }
    }
  };

  Archetype.prototype.handleEntityAdd = function (entity, component) {
    if (this.matchesEntity(entity)) {
      if (!this.hasEntity(entity)) {
        var ev_1 = {
          type: 'add',
          archetype: this,
          entity: entity,
          component: component
        };
        this.entities.push(entity);
        this.onAddListeners.forEach(function (listener) {
          return listener(ev_1);
        });
        this.onChangeListeners.forEach(function (listener) {
          return listener(ev_1);
        });
      }
    }
  };

  Archetype.prototype.handleEntityRemove = function (entity, component) {
    if (this.hasEntity(entity)) {
      var idx = this.entities.indexOf(entity);

      if (idx !== -1) {
        var ev_2 = {
          type: 'remove',
          archetype: this,
          entity: entity,
          component: component
        };
        this.entities.splice(idx, 1);
        this.onRemoveListeners.forEach(function (listener) {
          return listener(ev_2);
        });
        this.onChangeListeners.forEach(function (listener) {
          return listener(ev_2);
        });
      }
    }
  };

  return Archetype;
}();

exports.default = Archetype;
},{}],"../../../src/ecs/EntityPool.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Entity_1 = __importDefault(require("./Entity"));

var EntityPool =
/** @class */
function () {
  function EntityPool(size) {
    this.size = size;
    this.head = -1;
    this.entities = new Array(size);

    for (var idx = 0; idx < size; idx++) {
      this.entities[++this.head] = new Entity_1.default();
    }
  }

  Object.defineProperty(EntityPool.prototype, "length", {
    get: function get() {
      return this.size - this.head - 1;
    },
    enumerable: true,
    configurable: true
  }); // Take an Entity from the pool

  EntityPool.prototype.renew = function (components) {
    if (components === void 0) {
      components = [];
    }

    if (this.head >= 0) {
      var entity = this.entities[this.head--];
      return entity.renew(components);
    } else {
      throw new Error('EntityPool: Attempted to take an Entity from an exhausted pool.');
    }
  }; // Release an Entity back into the pool


  EntityPool.prototype.release = function (entity) {
    if (entity instanceof Entity_1.default) {
      if (this.head < this.size - 1) {
        this.entities[++this.head] = entity.reset();
      } else {
        throw new Error('EntityPool: Attempted to release an Entity back into a full pool.');
      }
    } else {
      throw new Error('EntityPool: Released object was not an Entity.');
    }
  };

  return EntityPool;
}();

exports.default = EntityPool;
},{"./Entity":"../../../src/ecs/Entity.ts"}],"../../../src/ecs/EntityManager.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var EntityPool_1 = __importDefault(require("./EntityPool"));

var EntityManager =
/** @class */
function () {
  function EntityManager(_a) {
    var poolSize = (_a === void 0 ? {
      poolSize: 1000
    } : _a).poolSize;
    this.entities = new Map();
    this.archetypes = new Map();
    this.entityChangeDisposers = new Map();
    this.entityPool = new EntityPool_1.default(poolSize);
  }

  EntityManager.prototype.filter = function (types) {
    return Array.from(this.entities.values()).filter(function (entity) {
      return entity.hasComponents.apply(entity, types);
    });
  };

  EntityManager.prototype.addEntity = function (entity) {
    var _this = this;

    if (!this.entities.has(entity.id)) {
      this.entities.set(entity.id, entity); // Add entity listener

      this.entityChangeDisposers.set(entity.id, entity.onChange(function (ev) {
        var type = ev.type,
            entity = ev.entity,
            component = ev.component;

        switch (type) {
          case 'add':
            _this.handleEntityAddComponent(entity, component);

            break;

          case 'remove':
            _this.handleEntityRemoveComponent(entity, component);

        }
      })); // Add entity to archetypes

      this.archetypes.forEach(function (archetype) {
        archetype.handleEntityAdd(entity);
      });
    }
  };

  EntityManager.prototype.removeEntity = function (entity) {
    if (this.entities.has(entity.id)) {
      this.entities.delete(entity.id); // clean up entity listener disposers

      if (this.entityChangeDisposers.has(entity.id)) {
        this.entityChangeDisposers.get(entity.id)();
        this.entityChangeDisposers.delete(entity.id);
      } // Remove entity from archetypes


      this.archetypes.forEach(function (archetype) {
        archetype.handleEntityRemove(entity);
      });
    }
  };

  EntityManager.prototype.hasEntity = function (entityId) {
    return this.entities.has(entityId);
  };

  EntityManager.prototype.getEntity = function (entityId) {
    return this.entities.get(entityId);
  };

  EntityManager.prototype.renewEntity = function (components) {
    if (components === void 0) {
      components = [];
    }

    var entity = this.entityPool.renew(components);
    this.addEntity(entity);
    return entity;
  };

  EntityManager.prototype.releaseEntity = function (entity) {
    if (this.hasEntity(entity.id)) {
      this.removeEntity(entity);
      this.entityPool.release(entity);
    }
  };

  EntityManager.prototype.addArchetype = function (klass) {
    var type = klass.name;

    if (!this.archetypes.has(type)) {
      var archetype_1 = new klass();
      this.archetypes.set(type, archetype_1); // Add matching entities to archetypes

      this.entities.forEach(function (entity) {
        archetype_1.handleEntityAdd(entity);
      });
      return archetype_1;
    } else {
      throw new Error("EntityManager: Could not add archetype as '" + type + "' already exists.");
    }
  };

  EntityManager.prototype.removeArchetype = function (klass) {
    var archetype = this.archetypes.get(klass.name);

    if (archetype) {
      this.archetypes.delete(klass.name);
      return archetype;
    } else {
      throw new Error("EntityManager: Could not delete archetype as '" + klass.name + "' does not exists.");
    }
  };

  EntityManager.prototype.hasArchetype = function (klass) {
    return this.archetypes.has(klass.name);
  };

  EntityManager.prototype.getArchetype = function (klass) {
    var archetype = this.archetypes.get(klass.name);

    if (archetype) {
      return archetype;
    } else {
      throw new Error("EntityManager: Could not get archetype as '" + klass.name + "' does not exists.");
    }
  };

  EntityManager.prototype.handleEntityAddComponent = function (entity, component) {
    if (this.hasEntity(entity.id)) {
      this.archetypes.forEach(function (archetype) {
        archetype.handleEntityChange(entity, component);
      });
    }
  };

  EntityManager.prototype.handleEntityRemoveComponent = function (entity, component) {
    if (this.hasEntity(entity.id)) {
      this.archetypes.forEach(function (archetype) {
        archetype.handleEntityChange(entity, component);
      });
    }
  };

  return EntityManager;
}();

exports.default = EntityManager;
},{"./EntityPool":"../../../src/ecs/EntityPool.ts"}],"../../../src/ecs/System.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var System =
/** @class */
function () {
  function System(options) {
    if (options === void 0) {
      options = {};
    }

    this.enabled = true;
    Object.assign(this, options);
  }

  System.prototype.init = function (_) {// stub
  };

  System.prototype.enable = function () {
    this.enabled = true;
  };

  System.prototype.disable = function () {
    this.enabled = false;
  };

  return System;
}();

exports.default = System;
},{}],"../../../src/ecs/World.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var EntityManager_1 = __importDefault(require("./EntityManager"));

var World =
/** @class */
function () {
  function World(_a) {
    var poolSize = (_a === void 0 ? {
      poolSize: 1000
    } : _a).poolSize;
    this.manager = new EntityManager_1.default();
    this.systems = new Map();
    this.manager = new EntityManager_1.default({
      poolSize: poolSize
    });
  }

  Object.defineProperty(World.prototype, "systemTypes", {
    get: function get() {
      return Array.from(this.systems.keys());
    },
    enumerable: true,
    configurable: true
  });

  World.prototype.addSystem = function (system) {
    var type = system.constructor.name;

    if (!this.systems.has(type)) {
      this.systems.set(type, system);
      system.init(this.manager);
    } else {
      throw new Error("World: Could not add system as '" + type + "' already exists.");
    }
  };

  World.prototype.addSystems = function () {
    var _this = this;

    var systems = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      systems[_i] = arguments[_i];
    }

    systems.forEach(function (system) {
      return _this.addSystem(system);
    });
  };

  World.prototype.removeSystem = function (klass) {
    var system = this.systems.get(klass.name);

    if (system) {
      this.systems.delete(klass.name);
      return system;
    } else {
      throw new Error("World: Could not delete system as '" + klass.name + "' does not exists.");
    }
  };

  World.prototype.hasSystem = function (klass) {
    return this.systems.has(klass.name);
  };

  World.prototype.getSystem = function (klass) {
    var system = this.systems.get(klass.name);

    if (system) {
      return system;
    } else {
      throw new Error("World: Could not get system as '" + klass.name + "' does not exists.");
    }
  };

  World.prototype.addArchetype = function (klass) {
    return this.manager.addArchetype(klass);
  };

  World.prototype.removeArchetype = function (klass) {
    return this.manager.removeArchetype(klass);
  };

  World.prototype.hasArchetype = function (klass) {
    return this.manager.hasArchetype(klass);
  };

  World.prototype.getArchetype = function (klass) {
    return this.manager.getArchetype(klass);
  };

  World.prototype.createEntity = function (components) {
    if (components === void 0) {
      components = [];
    }

    return this.manager.renewEntity(components);
  };

  World.prototype.removeEntity = function (entityId) {
    var entity = this.getEntity(entityId);

    if (entity) {
      this.manager.releaseEntity(entity);
    }
  };

  World.prototype.getEntity = function (entityId) {
    return this.manager.getEntity(entityId);
  };

  World.prototype.getEntities = function (entityIds) {
    return entityIds.map(this.getEntity.bind(this));
  };

  World.prototype.update = function (dt, time) {
    var _this = this;

    this.systems.forEach(function (system) {
      if (system.enabled) {
        system.update(_this.manager, dt, time);
      }
    });
  };

  return World;
}();

exports.default = World;
},{"./EntityManager":"../../../src/ecs/EntityManager.ts"}],"../../../src/ecs/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Component_1 = require("./Component");

exports.Component = Component_1.default;
exports.ComponentTypes = Component_1.ComponentTypes;

var Entity_1 = require("./Entity");

exports.Entity = Entity_1.default;

var Archetype_1 = require("./Archetype");

exports.Archetype = Archetype_1.default;
exports.ArchetypeChangeEvent = Archetype_1.ArchetypeChangeEvent;
exports.ArchetypeChangeListener = Archetype_1.ArchetypeChangeListener;

var EntityManager_1 = require("./EntityManager");

exports.EntityManager = EntityManager_1.default;

var System_1 = require("./System");

exports.System = System_1.default;

var World_1 = require("./World");

exports.World = World_1.default;
},{"./Component":"../../../src/ecs/Component.ts","./Entity":"../../../src/ecs/Entity.ts","./Archetype":"../../../src/ecs/Archetype.ts","./EntityManager":"../../../src/ecs/EntityManager.ts","./System":"../../../src/ecs/System.ts","./World":"../../../src/ecs/World.ts"}],"RenderingContext.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ctx;

exports.createRenderingContext = function (canvas) {
  ctx = canvas.getContext('2d');
};

exports.getRenderingContext = function () {
  return ctx;
};
},{}],"archetypes/BirdsArchetype.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var ecs_1 = require("../../../../src/ecs");

var BirdsArchetype =
/** @class */
function (_super) {
  __extends(BirdsArchetype, _super);

  function BirdsArchetype() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.filters = [_this.include('position'), _this.include('velocity'), _this.include('acceleration')];
    return _this;
  }

  return BirdsArchetype;
}(ecs_1.Archetype);

exports.default = BirdsArchetype;
},{"../../../../src/ecs":"../../../src/ecs/index.ts"}],"archetypes/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var BirdsArchetype_1 = require("./BirdsArchetype");

exports.BirdsArchetype = BirdsArchetype_1.default;
},{"./BirdsArchetype":"archetypes/BirdsArchetype.ts"}],"components/AccelerationComponent.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var ecs_1 = require("../../../../src/ecs");

var AccelerationComponent =
/** @class */
function (_super) {
  __extends(AccelerationComponent, _super);

  function AccelerationComponent() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  return AccelerationComponent;
}(ecs_1.Component);

exports.default = AccelerationComponent;
},{"../../../../src/ecs":"../../../src/ecs/index.ts"}],"components/PositionComponent.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var ecs_1 = require("../../../../src/ecs");

var PositionComponent =
/** @class */
function (_super) {
  __extends(PositionComponent, _super);

  function PositionComponent() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  return PositionComponent;
}(ecs_1.Component);

exports.default = PositionComponent;
},{"../../../../src/ecs":"../../../src/ecs/index.ts"}],"components/VelocityComponent.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var ecs_1 = require("../../../../src/ecs");

var VelocityComponent =
/** @class */
function (_super) {
  __extends(VelocityComponent, _super);

  function VelocityComponent() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  return VelocityComponent;
}(ecs_1.Component);

exports.default = VelocityComponent;
},{"../../../../src/ecs":"../../../src/ecs/index.ts"}],"components/index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var AccelerationComponent_1 = __importDefault(require("./AccelerationComponent"));

exports.AccelerationComponent = AccelerationComponent_1.default;

var PositionComponent_1 = __importDefault(require("./PositionComponent"));

exports.PositionComponent = PositionComponent_1.default;

var VelocityComponent_1 = __importDefault(require("./VelocityComponent"));

exports.VelocityComponent = VelocityComponent_1.default;
},{"./AccelerationComponent":"components/AccelerationComponent.ts","./PositionComponent":"components/PositionComponent.ts","./VelocityComponent":"components/VelocityComponent.ts"}],"lib/vec2/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Creates a new, empty Vector2
 *
 * @returns {Vector2} a new 2D vector
 */

function create() {
  return new Float32Array(2);
}

exports.create = create;
/**
 * Creates a new Vector2 initialized with values from an existing vector
 *
 * @param {Vector2} a vector to clone
 * @returns {Vector2} a new 2D vector
 */

exports.clone = function (a) {
  var out = create();
  out[0] = a[0];
  out[1] = a[1];
  return out;
};
/**
 * Creates a new Vector2 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {Vector2} a new 2D vector
 */


exports.fromValues = function (x, y) {
  var out = create();
  out[0] = x;
  out[1] = y;
  return out;
};
/**
 * Set the components of a Vector2 to the given values
 *
 * @param {Vector2} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {Vector2} out
 */


exports.set = function (out, x, y) {
  out[0] = x;
  out[1] = y;
  return out;
};
/**
 * Subtracts vector b from vector a
 *
 * @param {Vector2} out the receiving vector
 * @param {Vector2} a the first operand
 * @param {Vector2} b the second operand
 * @returns {Vector2} out
 */


exports.sub = function (out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  return out;
};
/**
 * Adds two Vector2's
 *
 * @param {Vector2} out the receiving vector
 * @param {Vector2} a the first operand
 * @param {Vector2} b the second operand
 * @returns {Vector2} out
 */


exports.add = function (out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  return out;
};
/**
 * Calculates the euclidian distance between two Vector2's
 *
 * @param {Vector2} a the first operand
 * @param {Vector2} b the second operand
 * @returns {Number} distance between a and b
 */


exports.distance = function (a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  return Math.sqrt(x * x + y * y);
};
/**
 * Normalize a Vector2
 *
 * @param {Vector2} out the receiving vector
 * @param {Vector2} a vector to normalize
 * @returns {Vector2} out
 */


exports.normalize = function (out, a) {
  var x = a[0];
  var y = a[1];
  var len = x * x + y * y;

  if (len > 0) {
    len = 1 / Math.sqrt(len);
    out[0] = x * len;
    out[1] = y * len;
  }

  return out;
};
/**
 * Scales a Vector2 by a scalar number
 *
 * @param {Vector2} out the receiving vector
 * @param {Vector2} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {Vector2} out
 */


exports.scale = function (out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  return out;
};
/**
 * Calculates the length of a Vector2
 *
 * @param {Vector2} a vector to calculate length of
 * @returns {Number} length of a
 */


exports.length = function (a) {
  var x = a[0];
  var y = a[1];
  return Math.sqrt(x * x + y * y);
};
},{}],"assemblages/BirdAssemblage.ts":[function(require,module,exports) {
"use strict";

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  }
  result["default"] = mod;
  return result;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var components_1 = require("../components");

var vec2 = __importStar(require("../lib/vec2"));

var MAX_SPEED = Number("2");

var BirdAssemblage = function BirdAssemblage(x, y) {
  return [new components_1.PositionComponent(vec2.fromValues(x, y)), new components_1.VelocityComponent(vec2.fromValues(Math.random() * MAX_SPEED - 1, Math.random() * MAX_SPEED - 1)), new components_1.AccelerationComponent(vec2.fromValues(0, 0))];
};

exports.default = BirdAssemblage;
},{"../components":"components/index.ts","../lib/vec2":"lib/vec2/index.ts"}],"systems/FlockingSystem.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  }
  result["default"] = mod;
  return result;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var ecs_1 = require("../../../../src/ecs");

var vec2 = __importStar(require("../lib/vec2"));

var archetypes_1 = require("../archetypes");

var MAX_SPEED = Number("2");
var MAX_FORCE = Number("0.03");
var NEIGHBOR_DISTANCE = Number("50");
var DESIRED_SEPARATION = Number("25");
var RADIUS = Number("2"); // Predefine vectors for scratch work within loop

var separation = vec2.create();
var alignment = vec2.create();
var cohesion = vec2.create();
var diff = vec2.create();
var steer = vec2.create();
var desired = vec2.create();

var FlockingSystem =
/** @class */
function (_super) {
  __extends(FlockingSystem, _super);

  function FlockingSystem() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  FlockingSystem.prototype.update = function (manager, dt) {
    var entities = manager.getArchetype(archetypes_1.BirdsArchetype).entities;
    var width = window.innerWidth,
        height = window.innerHeight;
    var len = entities.length;

    for (var i = 0; i < len; i++) {
      var bird = entities[i];
      var loc = bird.components.position.value;
      var vel = bird.components.velocity.value;
      var acc = bird.components.acceleration.value;
      vec2.set(separation, 0, 0);
      vec2.set(alignment, 0, 0);
      vec2.set(cohesion, 0, 0);
      var separationCount = 0;
      var alignmentCount = 0;

      for (var j = 0; j < len; j++) {
        var other = entities[j];
        var otherLoc = other.components.position.value;
        var otherVel = other.components.velocity.value;
        var d = vec2.distance(loc, otherLoc);

        if (d > 0) {
          if (d < DESIRED_SEPARATION) {
            vec2.sub(diff, loc, otherLoc);
            vec2.normalize(diff, diff);
            vec2.scale(diff, diff, 1 / d);
            vec2.add(separation, separation, diff);
            separationCount++;
          }

          if (d < NEIGHBOR_DISTANCE) {
            vec2.add(alignment, alignment, otherVel);
            vec2.add(cohesion, cohesion, otherLoc);
            alignmentCount++;
          }
        }
      }

      if (separationCount > 0) {
        vec2.scale(separation, separation, 1 / separationCount);
        vec2.scale(separation, separation, 2); // weight separation

        vec2.add(acc, acc, separation);
      }

      if (alignmentCount > 0) {
        vec2.scale(alignment, alignment, 1 / alignmentCount);
        limit(alignment, alignment, MAX_FORCE);
        vec2.scale(cohesion, cohesion, 1 / alignmentCount);
        this.steer(bird, cohesion);
        vec2.add(acc, acc, alignment);
        vec2.add(acc, acc, cohesion);
      } // Update velocity


      vec2.add(vel, vel, acc); // Limit speed

      limit(vel, vel, MAX_SPEED);
      vec2.add(loc, loc, vel); // Reset acceleration to zero

      vec2.set(acc, 0, 0); // Overflow borders

      if (loc[0] < -RADIUS) {
        loc[0] = width + RADIUS;
      }

      if (loc[1] < -RADIUS) {
        loc[1] = height + RADIUS;
      }

      if (loc[0] > width + RADIUS) {
        loc[0] = -RADIUS;
      }

      if (loc[1] > height + RADIUS) {
        loc[1] = -RADIUS;
      }
    }
  };

  FlockingSystem.prototype.steer = function (entity, target) {
    var loc = entity.components.position.value;
    var vel = entity.components.velocity.value;
    vec2.set(steer, 0, 0);
    vec2.sub(desired, target, loc);
    var d = vec2.length(desired);

    if (d > 0) {
      vec2.normalize(desired, desired);
      vec2.scale(desired, desired, MAX_SPEED);
      vec2.sub(steer, desired, vel);
      limit(steer, steer, MAX_FORCE);
    }

    vec2.set(target, steer[0], steer[1]);
  };

  FlockingSystem.prototype.borders = function (entity) {
    var loc = entity.components.position.value;
    var width = window.innerWidth,
        height = window.innerHeight;

    if (loc[0] < -RADIUS) {
      loc[0] = width + RADIUS;
    }

    if (loc[1] < -RADIUS) {
      loc[1] = height + RADIUS;
    }

    if (loc[0] > width + RADIUS) {
      loc[0] = -RADIUS;
    }

    if (loc[1] > height + RADIUS) {
      loc[1] = -RADIUS;
    }
  };

  return FlockingSystem;
}(ecs_1.System);

exports.default = FlockingSystem;

var limit = function limit(out, a, b) {
  var length = vec2.length(a);

  if (length > b) {
    var lim = 1 / length * b;
    out[0] = a[0] * lim;
    out[1] = a[1] * lim;
  } else {
    out[0] = a[0];
    out[1] = a[1];
  }

  return out;
};
},{"../../../../src/ecs":"../../../src/ecs/index.ts","../lib/vec2":"lib/vec2/index.ts","../archetypes":"archetypes/index.ts"}],"systems/RenderSystem.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var ecs_1 = require("../../../../src/ecs");

var archetypes_1 = require("../archetypes");

var RenderingContext_1 = require("../RenderingContext");

var HALF_PI = Math.PI / 2;
var RADIUS = Number("2");

var RenderSystem =
/** @class */
function (_super) {
  __extends(RenderSystem, _super);

  function RenderSystem() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.render = function (ctx, entity) {
      var loc = entity.components.position.value;
      var vel = entity.components.velocity.value;
      var theta = heading2D(vel) + HALF_PI;
      ctx.save();
      ctx.translate(loc[0], loc[1]);
      ctx.rotate(theta);
      ctx.beginPath();
      ctx.moveTo(0, RADIUS);
      ctx.lineTo(0, 0);
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
    };

    return _this;
  }

  RenderSystem.prototype.update = function (manager, dt) {
    var _this = this;

    var ctx = RenderingContext_1.getRenderingContext();
    var entities = manager.getArchetype(archetypes_1.BirdsArchetype).entities; // Clear screen

    ctx.fillStyle = 'rgba(240, 240, 240, 0.1)';
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight); // Render entities

    entities.forEach(function (bird) {
      return _this.render(ctx, bird);
    });
  };

  return RenderSystem;
}(ecs_1.System);

exports.default = RenderSystem;

var heading2D = function heading2D(a) {
  return -Math.atan2(-a[1], a[0]);
};
},{"../../../../src/ecs":"../../../src/ecs/index.ts","../archetypes":"archetypes/index.ts","../RenderingContext":"RenderingContext.ts"}],"index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var stats_js_1 = __importDefault(require("stats.js"));

var ecs_1 = require("../../../src/ecs");

var RenderingContext_1 = require("./RenderingContext");

var archetypes_1 = require("./archetypes");

var BirdAssemblage_1 = __importDefault(require("./assemblages/BirdAssemblage"));

var FlockingSystem_1 = __importDefault(require("./systems/FlockingSystem"));

var RenderSystem_1 = __importDefault(require("./systems/RenderSystem"));

var FLOCK_SIZE = Number("750");
var stats = new stats_js_1.default();
var world = new ecs_1.World(); // Archetypes

world.addArchetype(archetypes_1.BirdsArchetype); // Systems

world.addSystems(new FlockingSystem_1.default(), new RenderSystem_1.default());

var init = function init() {
  // Add Stats
  document.body.appendChild(stats.dom);
  var canvas = document.getElementById('flocking');
  RenderingContext_1.createRenderingContext(canvas);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  for (var i = 0; i < FLOCK_SIZE; i++) {
    world.createEntity(BirdAssemblage_1.default(window.innerWidth / 2, window.innerHeight / 2));
  } // Start loop


  requestAnimationFrame(loop);
};

var frame = 0;

var loop = function loop() {
  stats.begin();
  world.update(0, frame++);
  stats.end();
  requestAnimationFrame(loop);
};

document.addEventListener('DOMContentLoaded', init, false);
},{"stats.js":"../node_modules/stats.js/build/stats.min.js","../../../src/ecs":"../../../src/ecs/index.ts","./RenderingContext":"RenderingContext.ts","./archetypes":"archetypes/index.ts","./assemblages/BirdAssemblage":"assemblages/BirdAssemblage.ts","./systems/FlockingSystem":"systems/FlockingSystem.ts","./systems/RenderSystem":"systems/RenderSystem.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53965" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/src.77de5100.js.map