// Dependencies
var CliGraph = require("../index");

// Create a new function graph
var graph = new CliGraph({
    center: { y: 38 }
}).setFunction(function (x) {
    return x * x;
});
console.log(graph.toString());

// Another function
var graph = new CliGraph({
    height: 30
  , width: 30
  , marks: {
        hAxis: '-'
      , vAxis: '|'
      , center: '+'
      , point: '.'
  }
});

graph.setFunction(function (x) {
    return x;
});

console.log(graph.toString());
