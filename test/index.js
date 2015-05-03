// Dependencies
var Assert = require("assert")
  , CliGraph = require("../lib")
  , Fs = require("fs")
  ;

const CIRCLE = Fs.readFileSync(__dirname + "/circle", "utf-8");

it("should create the graph and stringify it", function (cb) {
    var circle = new CliGraph({ height: 32, width: 32 }).setFunctionX(function (x) {
        return Math.sqrt(200 - x * x);
    }).setFunctionX(function (x) {
        return -Math.sqrt(200 - x * x);
    }).setFunctionY(function (y) {
        return Math.sqrt(200 - y * y);
    }).setFunctionY(function (y) {
        return -Math.sqrt(200 - y * y);
    });
    Assert.equal(circle.toString(), CIRCLE);
    cb();
});
