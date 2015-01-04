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
var FunctionGraph = module.exports = function (options) {

    // Initialize variables
    var self = this
      , settings = self.options = Ul.merge(Ul.clone(FunctionGraph.defaults), options)
      , i = 0
      , character = null
      , str = ""
      ;

    self.graph = [];
    settings.width *= settings.aRatio;

    // Set the center of the graph
    settings.center = Ul.merge({
        x: settings.width  / 2
      , y: settings.height / 2
    }, settings.center);

    settings.center.x = parseInt(settings.center.x);
    settings.center.y = parseInt(settings.center.y);

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


    /**
     * addPoint
     * Adds a point on the `x` and `y` coordinates.
     *
     * @name addPoint
     * @function
     * @param {Number} x The `x` coordinate.
     * @param {Number} y The `y` coordinate.
     * @return {CliGraph} The CliGraph instance.
     */
    self.addPoint = function addPoint (x, y) {

        x = settings.center.x + parseInt(x) * settings.aRatio;
        y = settings.center.y - parseInt(y);

        if (x >= settings.width || x < 0 || y >= settings.height || y < 0) {
            return;
        }

        if (!self.graph[y]) {
            return;
        }

        self.graph[y][x] = settings.marks.point;
        return self;
    };

    /**
     * toString
     * Stringifies the graph.
     *
     * @name toString
     * @function
     * @return {String} The stringified graph.
     */
    self.toString = function () {
        str = "";
        for (i = 0; i < self.graph.length; ++i) {
            str += self.graph[i].join("") + "\n";
        }
        return str;
    };

    /**
     * setFunction
     * Adds the function on the graph.
     *
     * @name setFunction
     * @function
     * @param {Function} foo A function that receives `x` as the first parameter and returns the `y` value.
     * @param {Number} min The minimum `x` (default: the lowest possible value).
     * @param {Number} max The maximum `x`.(default: the highest possible value).
     * @return {CliGraph} The CliGraph instance.
     */
    self.setFunction = function (foo, min, max) {
        min = min || - (settings.width + settings.center.x) / 2;
        max = max || (settings.width + settings.center.x) / 2;
        for (i = min; i <= max; ++i) {
            self.addPoint(i, foo(i));
        }
        return self;
    };

    return self;
};

// Defaults
FunctionGraph.defaults = {
    width: 60
  , height: 40
  , marks: {
        hAxis: '─'
      , vAxis: '│'
      , center: '┼'
      , point: '•'
      , rightArrow: "▶"
      , topArrow: "▲"
      , background: " "
    }
  , center: {}
  , aRatio: 2
};
