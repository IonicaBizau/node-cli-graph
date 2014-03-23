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

### ``addPoint (x, y)

`x` and `y` are the coordinates of the new point that will be added

### `toString()`

Returns the stringified graph.

## Example
```js
// dependencies
var FunctionGraph = require("../index");

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
