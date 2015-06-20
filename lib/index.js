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
