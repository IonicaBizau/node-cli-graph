// dependencies
var FunctionGraph = require("../index");

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
