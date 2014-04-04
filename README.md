ASCII Function Graphs
=====================

Easily draw function graphs via NodeJS in Terminal.

## Constructor

### `new FunctionGraph (options)`

`options` is an object containing the following fields:

 - `height`: the height of the graph (default: 40)
 - `width`: the width of the graph (default: 60)
 - `center` an object containing:
   - `x`: the *x* origin (default: width / 2)
   - `y`: the *y* origin (default: height / 2)
 - `marks` an object containing:
   - `hAxis`: the character for drawing horizontal axis (default '-')
   - `vAxis`: the character for drawing vertical axis (default '|')
   - `center`: the character for axis intersection (default '+')
   - `point`: the character for drawing points (default '#')

## Methods

### `addPoint (x, y)`

`x` and `y` are the coordinates of the new point that will be added

### `toString()`

Returns the stringified graph.

## Example
```js
// dependencies
var FunctionGraph = require("function-graph");

/**
 *  We will print the graph for this function.
 *
 */
function foo (x) {
    return Math.sin(x);
}


// create a new function graph
var graph = new FunctionGraph ({
    height: 30
  , width: 60
  , marks: {
        hAxis: '─'
      , vAxis: '│'
      , center: '┼'
      , point: '•'
  }
});

// for [-25, 48) add points
for (var i = -25; i < 48; i += 0.001) {
    graph.addPoint(i * 2, 5 * foo(i));
}

console.log("Below you will see the sinus graph:")
// output graph
console.log(graph.toString());
```

## How to test
```sh
$ npm install function-graph
$ cd node_modules/function-graph
$ npm test

> function-graph@0.1.0 test /home/.../function-graph
> node test/1.js

Below you will see the sinus graph:
                              ^
                              │
                              │
                              │
                              │
                              │
                              │
                              │
                              │
                              │
                              │
       ••••         •••       │••••         •••         ••••
       •  •        •• ••      │•  •        •• ••        •  •
      ••  ••       •   •      ••  ••       •   ••      ••
      •    •      ••   ••     •    •      ••    •      •
─────••────••─────•─────••────•────••─────•─────••────••───>
•    •      •    ••      •    •     ••   ••      •    •
•   ••      ••   •       ••  ••      •   •       ••  ••
••  •        •• ••        •  •│      •• ••        •  •
 ••••         •••         ••••│       •••         ••••
                              │
                              │
                              │
                              │
                              │
                              │
                              │
                              │
                              │
                              │
```

## Changelog

 - `0.1.2`
   - better example
   - added comments

 - `0.1.1`

   - Added `options.marks` setting ([#4](https://github.com/IonicaBizau/function-graphs/pull/4))

 - `0.1.0`

   Initial release

## License
See the LICENSE file.
