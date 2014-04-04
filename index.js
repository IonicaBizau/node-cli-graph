/**
 *  Function Graph
 *  ==============
 *  Easily draw function graphs via NodeJS in Terminal.
 *
 *  Example
 *  =======
 *
 *     var FunctionGraph = require("function-graph");
 *
 *     function foo (x) {
 *         return Math.sin(x) * 3;
 *     }
 *
 *
 *     var graph = new FunctionGraph ({
 *         height: 30
 *       , width: 50
 *       , marks: {
 *             hAxis: '─'
 *           , vAxis: '│'
 *           , center: '┼'
 *           , point: '•'
 *       }
 *     });
 *
 *     for (var i = -25; i < 48; ++i) {
 *         graph.addPoint(i, foo(i));
 *     }
 *
 *     console.log(graph.toString());
 *
 *  Licensed under MIT license. See README file for more details.
 *
 */
function FunctionGraph (options) {

    // use `new` to create a new instance
    if (this.constructor !== FunctionGraph) {
        throw new Error ("Use new constructor to create a new instance of this function.");
    }

    // get instance
    var self = this;

    // set an empty array for _graph field
    self._graph = [];

    // merge defaults with options
    options.width  = options.width || 60;
    options.height = options.height || 40;

    // set the center of the graph
    options.center = options.center || {
        x: Math.floor (options.width  / 2)
      , y: Math.floor (options.height / 2)
    };

    // set marks
    options.marks = options.marks || {};

    // these are the default marks
    defaultMarks = {
        hAxis: '-'
      , vAxis: '|'
      , center: '+'
      , point: '#'
      , rightArrow: ">"
      , topArrow: "^"
    };

    // merge defaults
    for (var mark in defaultMarks) {
        options.marks[mark] = options.marks[mark] || defaultMarks[mark];
    }

    // build the graph using spaces
    for (var i = 0; i < options.height; ++i) {
        self._graph[i] = [];
        for (var ii = 0; ii < options.width; ++ii) {
            self._graph[i].push(" ");
        }
    }

    self._graph[options.center.y][options.center.x] = options.marks.center;

    for (var i = 0; i < options.width; ++i) {
        var character = options.marks.hAxis;
        if (i === options.center.x) {
            character = options.marks.center;
        } else if (i === options.width - 1) {
            character = options.marks.rightArrow;
        }

        self._graph[options.center.y][i] = character;
    }

    for (var i = 0; i < options.height; ++i) {
        var character = options.marks.vAxis;
        if (i === options.center.y) {
            character = options.marks.center;
        } else if (i === 0) {
            character = options.marks.topArrow;
        }

        self._graph[i][options.center.x] = character;
    }

    function addPoint (x, y) {
        x = options.center.x + parseInt(x);
        y = options.center.y - parseInt(y);

        if (x >= options.width || x < 0 || y >= options.height || y < 0) {
            return;
        }

        if (!self._graph[y]) {
            return;
        }

        self._graph[y][x] = options.marks.point;
    }
    self.addPoint = addPoint;

    self.toString = function () {
        var str = "";
        for (var i = 0; i < self._graph.length; ++i) {
            str += self._graph[i].join("") + "\n";
        }

        return str;
    };
}

module.exports = FunctionGraph;
