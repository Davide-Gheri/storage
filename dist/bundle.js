(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Storage", [], factory);
	else if(typeof exports === 'object')
		exports["Storage"] = factory();
	else
		root["Storage"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function tryParse(value) {
    try {
        return JSON.parse(value);
    }
    catch (e) {
        return value;
    }
}
exports.tryParse = tryParse;
function decode(s) {
    return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
}
exports.decode = decode;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Adapters_1 = __webpack_require__(2);
var ObjectStorage_1 = __webpack_require__(6);
/**
 * @ngdoc object
 * @name Storage
 *
 * @description
 * Storage is the library to save and get data in different ways.
 *
 */
var Storage = /** @class */ (function () {
    function Storage(adapter) {
        this.defaults = {
            localstorage: Adapters_1.Localstorage,
            sessionstorage: Adapters_1.Sessionstorage,
            cookie: Adapters_1.Cookiestorage,
            object: ObjectStorage_1.ObjectStorage
        };
        this.adapter = new Adapters_1.Localstorage();
        this.setAdapter(adapter);
    }
    Storage.prototype.setAdapter = function (adapter) {
        if (typeof adapter === 'string') {
            this.adapter = this.useAdapter(adapter);
        }
        else {
            this.adapter = adapter;
        }
        new Error("Adapter " + adapter + " not supported");
    };
    Storage.prototype.useAdapter = function (adapter) {
        if (Object.keys(this.defaults).indexOf(adapter) >= 0) {
            var ad = this.defaults[adapter];
            return new ad();
        }
        new Error("Adapter " + adapter + " not supported");
    };
    Storage.prototype.resolveAdapter = function (options) {
        return options ? this.useAdapter(options.adapter) || this.adapter : this.adapter;
    };
    Storage.prototype.get = function (key, def, options) {
        return this.resolveAdapter(options).get(key, def);
    };
    Storage.prototype.set = function (key, value, options) {
        return this.resolveAdapter(options).set(key, value);
    };
    Storage.prototype.delete = function (key, options) {
        return this.resolveAdapter(options).delete(key);
    };
    Storage.prototype.clear = function (options) {
        return this.resolveAdapter(options).clear();
    };
    return Storage;
}());
exports.Storage = Storage;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(3));
__export(__webpack_require__(4));
__export(__webpack_require__(5));


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(0);
var Localstorage = /** @class */ (function () {
    function Localstorage() {
    }
    Localstorage.prototype.get = function (key, def) {
        return utils_1.tryParse(localStorage.getItem(key)) || def;
    };
    Localstorage.prototype.set = function (key, value) {
        try {
            localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
            return true;
        }
        catch (e) {
            return false;
        }
    };
    Localstorage.prototype.delete = function (key) {
        try {
            localStorage.removeItem(key);
            return true;
        }
        catch (e) {
            return false;
        }
    };
    Localstorage.prototype.clear = function () {
        localStorage.clear();
    };
    return Localstorage;
}());
exports.Localstorage = Localstorage;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(0);
var Sessionstorage = /** @class */ (function () {
    function Sessionstorage() {
    }
    Sessionstorage.prototype.get = function (key, def) {
        return utils_1.tryParse(sessionStorage.getItem(key)) || def;
    };
    Sessionstorage.prototype.set = function (key, value) {
        try {
            sessionStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
            return true;
        }
        catch (e) {
            return false;
        }
    };
    Sessionstorage.prototype.delete = function (key) {
        try {
            sessionStorage.removeItem(key);
            return true;
        }
        catch (e) {
            return false;
        }
    };
    Sessionstorage.prototype.clear = function () {
        sessionStorage.clear();
    };
    return Sessionstorage;
}());
exports.Sessionstorage = Sessionstorage;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(0);
var Cookiestorage = /** @class */ (function () {
    function Cookiestorage() {
        this.defaults = {
            path: '/'
        };
    }
    Cookiestorage.prototype.setAttributes = function (options) {
        var attributes = Object.assign(this.defaults, options);
        if (typeof attributes.expires === 'number') {
            attributes.expires = new Date(new Date().getTime() * 1 + attributes.expires * 864e+5);
        }
        attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';
        return attributes;
    };
    Cookiestorage.prototype.get = function (key, def) {
        var jar = {};
        var cookies = document.cookie ? document.cookie.split('; ') : [];
        var i = 0;
        for (; i < cookies.length; i++) {
            var parts = cookies[i].split('=');
            var cookie = parts.slice(1).join('=');
            if (cookie.charAt(0) === '"') {
                cookie = cookie.slice(1, -1);
            }
            try {
                var name_1 = utils_1.decode(parts[0]);
                cookie = utils_1.decode(cookie);
                cookie = utils_1.tryParse(cookie);
                jar[name_1] = cookie;
                if (key === name_1) {
                    break;
                }
            }
            catch (e) { }
        }
        return key ? jar[key] || def : jar || def;
    };
    Cookiestorage.prototype.set = function (key, value, options) {
        var attributes = this.setAttributes(options);
        try {
            var result = JSON.stringify(value);
            if (/^[\{\[]/.test(result)) {
                value = result;
            }
        }
        catch (e) { }
        value = encodeURIComponent(String(value))
            .replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
        key = encodeURIComponent(String(key))
            .replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
            .replace(/[\(\)]/g, escape);
        var stringifiedAttributes = '';
        for (var attributeName in attributes) {
            if (!attributes[attributeName]) {
                continue;
            }
            stringifiedAttributes += '; ' + attributeName;
            if (attributes[attributeName] === true) {
                continue;
            }
            stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
        }
        return Boolean(document.cookie = key + '=' + value + stringifiedAttributes);
    };
    Cookiestorage.prototype.delete = function (key) {
        return this.set(key, '', { expires: -1 });
    };
    Cookiestorage.prototype.clear = function () {
        document.cookie.split(";").forEach(function (c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
    };
    return Cookiestorage;
}());
exports.Cookiestorage = Cookiestorage;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ObjectStorage = /** @class */ (function () {
    function ObjectStorage() {
        this.state = {};
    }
    ObjectStorage.prototype.get = function (key, def) {
        return key ? this.state[key] || def : this.state || def;
    };
    ObjectStorage.prototype.set = function (key, value) {
        try {
            this.state[key] = value;
            return true;
        }
        catch (e) {
            return false;
        }
    };
    ObjectStorage.prototype.delete = function (key) {
        try {
            delete this.state[key];
            return true;
        }
        catch (e) {
            return false;
        }
    };
    ObjectStorage.prototype.clear = function () {
        this.state = {};
    };
    return ObjectStorage;
}());
exports.ObjectStorage = ObjectStorage;


/***/ })
/******/ ]);
});
//# sourceMappingURL=bundle.js.map