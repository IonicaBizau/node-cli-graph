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

console.log("Below you will see the sinus graph:")
// output graph
console.log(graph.toString());
