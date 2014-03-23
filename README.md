ASCII Function Graphs
=====================

Easily draw function graphs via NodeJS in Terminal.

## Constructor

### `new FunctionGraph (options)``

`options` is an object containing the following fields:

 - `height`: the height of the graph (default: 40)
 - `width`: the width of the graph (default: 60)
 - `center` an object containing:
   - `x`: the *x* origin (default: width / 2)
   - `y`: the *y* origin (default: height / 2)

## Methods

### `addPoint (x, y)`

`x` and `y` are the coordinates of the new point that will be added

### `toString()`

Returns the stringified graph.

## Example
```js
// dependencies
var FunctionGraph = require("function-graphs");

/**
 *  We will print the graph for this function.
 *
 */
function foo (x) {
    return Math.sin(x) * 3;
}


// create a new function graph
var graph = new FunctionGraph ({
    height: 30
  , width: 50
});

// for [-25, 48) add points
for (var i = -25; i < 48; ++i) {
    graph.addPoint(i, foo(i));
}

// output graph
console.log(graph.toString());
```

## How to test
```sh
$ npm install function-graphs
$ cd node_modules
$ npm test
$ npm test

> function-graphs@0.1.0 test /home/.../function-graphs
> node test/1.js

Below you will see the sinus graph:
                         ^
                         |
                         |
                         |
                         |
                         |
                         |
                         |
                         |
                         |
                         |
                         |
                         |
 ##    ##     #     ##   |##     #     #     ##
             # #         |      # #   # #
#--#--#--#---------#--#--#--#--#---------#--#--#->
          # #   # #      |         # #
    ##     #     #     ##|   ##     #     ##    ##
                         |
                         |
                         |
                         |
                         |
                         |
                         |
                         |
                         |
                         |
                         |
                         |


```

## Changelog

 - 0.1.0
   Initial release

## License
See the LICENSE file.
