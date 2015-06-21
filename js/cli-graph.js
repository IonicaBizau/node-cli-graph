(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            currentQueue[queueIndex].run();
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],2:[function(require,module,exports){
// Dependencies
var Ul = require("ul");

/**
 * CliGraph
 * Creates a new CliGraph instance.
 *
 * Example:
 *
 * ```js
 * var g = new CliGraph();
 * ```
 *
 * @name CliGraph
 * @function
 * @param {Object} options An object containing the following fields:
 *
 *  - `height` (Number): The graph height (default: `40`).
 *  - `width` (Number): The graph width (default: `60`).
 *  - `aRatio` (Number): The horizontal aspect ratio (default: `2`).
 *  - `center` (Object): An object containing:
 *    - `x` (Number): The `x` origin (default: `width / 2`)
 *    - `y` (Number): The `y` origin (default: `height / 2`)
 *  - `marks` (Object): An object containing:
 *    - `hAxis` (String): The character for drawing horizontal axis (default `"─"`).
 *    - `vAxis` (String): The character for drawing vertical axis (default "│").
 *    - `center` (String): The character for axis intersection (default `"┼"`).
 *    - `point` (String): The character for drawing points (default `"•"`).
 *    - `rightArrow` (String): The character for drawing the right arrow (default `"▶"`).
 *    - `topArrow` (String): The character for drawing the top arrow (default `"▲"`).
 *    - `background` (String): The background character (default `" "`).
 *
 * @return {CliGraph} The CliGraph instance.
 */
function CliGraph(options) {

    // Initialize variables
    var self = this
      , settings = self.options = Ul.deepMerge(options, CliGraph.defaults)
      , i = 0
      , character = null
      , str = ""
      ;

    self.graph = [];
    settings.width *= settings.aRatio;

    // Set the center of the graph
    settings.center = Ul.merge(settings.center, {
        x: settings.width  / 2
      , y: settings.height / 2
    });

    settings.center.x = Math.round(settings.center.x);
    settings.center.y = Math.round(settings.center.y);

    // Background
    for (i = 0; i < settings.height; ++i) {
        self.graph[i] = new Array(settings.width).join(settings.marks.background).split("");
    }

    // Center
    self.graph[settings.center.y][settings.center.x] = settings.marks.center;

    // Ox axis
    for (i = 0; i < settings.width; ++i) {
        character = settings.marks.hAxis;
        if (i === settings.center.x) {
            character = settings.marks.center;
        } else if (i === settings.width - 1) {
            character = settings.marks.rightArrow;
        }

        self.graph[settings.center.y][i] = character;
    }

    // Oy asis
    for (i = 0; i < settings.height; ++i) {
        character = settings.marks.vAxis;
        if (i === settings.center.y) {
            character = settings.marks.center;
        } else if (i === 0) {
            character = settings.marks.topArrow;
        }

        self.graph[i][settings.center.x] = character;
    }

};

window.CliGraph = CliGraph;

/**
 * addPoint
 * Adds a point on the `x` and `y` coordinates.
 *
 * @name addPoint
 * @function
 * @param {Number} x The `x` coordinate.
 * @param {Number} y The `y` coordinate.
 * @param {String} chr The point character (default: the one provided in defaults).
 * @return {CliGraph} The CliGraph instance.
 */
CliGraph.prototype.addPoint = function (x, y, chr) {

    var self = this;

    x = self.options.center.x + Math.round(x) * self.options.aRatio;
    y = self.options.center.y - Math.round(y);

    if (x >= self.options.width || x < 0
        || y >= self.options.height || y < 0
        || !self.graph[y] || isNaN(x) || isNaN(y)) {
        return;
    }

    self.graph[y][x] = chr || self.options.marks.point;
    return self;
};

/**
 * isPoint
 * Checks if on given coordinates there is a point.
 *
 * @name isPoint
 * @function
 * @param {Number} x The `x` coordinate.
 * @param {Number} y The `y` coordinate.
 * @param {String} chr The point character (default: the one provided in defaults).
 */
CliGraph.prototype.isPoint = function (x, y, chr) {
    x = this.options.center.x + Math.round(x) * this.options.aRatio;
    y = this.options.center.y - Math.round(y);
    if (x >= this.options.width || x < 0
        || y >= this.options.height || y < 0
        || !this.graph[y] || isNaN(x) || isNaN(y)) {
        return;
    }

    if (chr) {
        return this.graph[y][x] === chr;
    }

    return this.graph[y][x] !== this.options.marks.background;
};

/**
 * toString
 * Stringifies the graph.
 *
 * @name toString
 * @function
 * @return {String} The stringified graph.
 */
CliGraph.prototype.toString = function () {
    var self = this
      , str = ""
      ;

    for (var i = 0; i < self.graph.length; ++i) {
        str += self.graph[i].join("") + "\n";
    }

    return str;
};

/**
 * setFunctionX
 * Adds the function on the graph, iterating the x axis.
 *
 * @name setFunctionX
 * @function
 * @param {Function} foo A function that receives `x` as the first parameter and returns the `y` value.
 * @param {Number} min The minimum `x` (default: the lowest possible value).
 * @param {Number} max The maximum `x`.(default: the highest possible value).
 * @param {String} chr The point character (default: the one provided in defaults).
 * @return {CliGraph} The CliGraph instance.
 */
CliGraph.prototype.setFunctionX = function (foo, min, max, chr) {
    var self = this;

    min = min === undefined ? self.options.center.x - self.options.width : min;
    max = max === undefined ? self.options.width - self.options.center.x : max;

    if (min > max) {
        var aux = min;
        min = max;
        max = aux;
    }

    for (var i = min; i <= max; ++i) {
        self.addPoint(i, foo(i), chr);
    }

    return self;
};

/**
 * setFunctionY
 * Adds the function on the graph, iterating the y axis.
 *
 * @name setFunctionY
 * @function
 * @param {Function} foo A function that receives `y` as the first parameter and returns the `x` value.
 * @param {Number} min The minimum `y` (default: the lowest possible value).
 * @param {Number} max The maximum `y`.(default: the highest possible value).
 * @param {String} chr The point character (default: the one provided in defaults).
 * @return {CliGraph} The CliGraph instance.
 */
CliGraph.prototype.setFunctionY = function (foo, min, max, chr) {
    var self = this;

    min = min === undefined ? self.options.center.y - self.options.height : min;
    max = max === undefined ? self.options.height - self.options.center.y / 2 : max;

    if (min > max) {
        var aux = min;
        min = max;
        max = aux;
    }

    for (var i = min; i <= max; ++i) {
        self.addPoint(foo(i), i, chr);
    }

    return self;
};

// Defaults
CliGraph.defaults = {
    width: 60
  , height: 40
  , marks: {
        hAxis: "─"
      , vAxis: "│"
      , center: "┼"
      , point: "•"
      , rightArrow: "▶"
      , topArrow: "▲"
      , background: " "
    }
  , center: {}
  , aRatio: 2
};

module.exports = CliGraph;

},{"ul":3}],3:[function(require,module,exports){
(function (process){
// Dependencies
var Typpy = require("typpy")
  , Deffy = require("deffy")
  ;

// Constructor
function Ul() {}

/**
 * merge
 * One level merge. Faster than `deepMerge`.
 *
 * @name merge
 * @function
 * @param dst {Object} The destination object.
 * @param src {Object} The source object (usually defaults).
 * @return {Object} The result object.
 */
Ul.prototype.merge = function (dst, src, p) {
    var res = {}
      , k = null
      ;

    src = Deffy(src, {});
    dst = Deffy(dst, {});

    for (k in src) { res[k] = src[k]; }
    for (k in dst) {
        if (undefined === dst[k]) {
            continue;
        }
        res[k] = dst[k];
    }

    return res;
};

/**
 * deepMerge
 * Recursively merge the objects from arguments, returning a new object.
 *
 * Usage: `Ul.deepMerge(obj1, obj2, obj3, obj4, ..., objN)`
 *
 * @name deepMerge
 * @function
 * @return {Object} The merged objects.
 */
Ul.prototype.deepMerge = function () {

    var dst = {}
      , src
      , p
      , args = [].splice.call(arguments, 0)
      ;

    while (args.length > 0) {
        src = args.splice(-1)[0];
        if (Typpy(src) !== "object") { continue; }
        for (p in src) {
            if (!src.hasOwnProperty(p)) { continue; }
            if (Typpy(src[p]) === "object") {
                dst[p] = this.deepMerge(src[p], dst[p] || {});
            } else {
                if (src[p] !== undefined) {
                    dst[p] = src[p];
                }
            }
        }
    }

    return dst;
};

/**
 * clone
 * Deep clone of the provided item.
 *
 * @name clone
 * @function
 * @param {Anything} item The item that should be cloned
 * @return {Anything} The cloned object
 */
Ul.prototype.clone = function (item) {

    if (!item) { return item; }
    var self = this
      , types = [Number, String, Boolean]
      , result
      , i
      ;

    types.forEach(function(type) {
        if (item instanceof type) {
            result = type(item);
        }
    });

    if (typeof result == "undefined") {
        if (Array.isArray(item)) {
            result = [];
            item.forEach(function(child, index) {
                result[index] = self.clone(child);
            });
        } else if (typeof item == "object") {
            if (!item.prototype) {
                if (item instanceof Date) {
                    result = new Date(item);
                } else {
                    result = {};
                    for (i in item) {
                        result[i] = self.clone(item[i]);
                    }
                }
            } else {
                result = item;
            }
        } else {
            result = item;
        }
    }

    return result;
};

/**
 * home
 * Get the home directory path on any platform. The value can be
 * accessed using `Ul.HOME_DIR` too.
 *
 * @name home
 * @function
 * @return {String} The home directory path.
 */
Ul.prototype.HOME_DIR = process.env[(process.platform == "win32") ? "USERPROFILE" : "HOME"];
Ul.prototype.home = function () {
    return this.HOME_DIR;
};

module.exports = new Ul();

}).call(this,require('_process'))
},{"_process":1,"deffy":4,"typpy":6}],4:[function(require,module,exports){
// Dependencies
var Typpy = require("typpy");

/**
 * Deffy
 * Computes a final value by providing the input and default values.
 *
 * @name Deffy
 * @function
 * @param {Anything} input The input value.
 * @param {Anything|Function} def The default value or a function getting the
 * input value as first argument.
 * @param {Object|Boolean} options The `empty` value or an object containing
 * the following fields:
 *
 *  - `empty` (Boolean): Handles the input value as empty field (`input || default`). Default is `false`.
 *
 * @return {Anything} The computed value.
 */
function Deffy(input, def, options) {

    // Default is a function
    if (typeof def === "function") {
        return def(input);
    }

    options = Typpy(options) === "boolean" ? {
        empty: options
    } : {
        empty: false
    };

    // Handle empty
    if (options.empty) {
        return input || def;
    }

    // Return input
    if (Typpy(input) === Typpy(def)) {
        return input;
    }

    // Return the default
    return def;
}

module.exports = Deffy;

},{"typpy":5}],5:[function(require,module,exports){
/**
 * Typpy
 * Gets the type of the input value.
 *
 * @name Typpy
 * @function
 * @param {Anything} input The input value.
 * @return {String} The input value type (always lowercase).
 */
function Typpy(input) {

    if (typeof input === "string") {
        return "string";
    }

    if (null === input) {
        return "null";
    }

    if (undefined === input) {
        return "undefined";
    }

    return input.constructor.name.toLowerCase();
}

module.exports = Typpy;

},{}],6:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}]},{},[2]);
