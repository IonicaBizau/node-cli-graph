// Dependencies
var Assert = require("assert")
  , CliGraph = require("../lib")
  , Fs = require("fs")
  ;

const CIRCLE = Fs.readFileSync(__dirname + "/circle", "utf-8");

it("should merge the options correctly", function (cb) {
    var circle = new CliGraph({ marks: { point: "foo" } });
    Assert.equal(circle.options.marks.point, "foo");
    cb();
});

it("should create the graph and stringify it", function (cb) {
    var radius = 49
      , circle = new CliGraph({ height: 100, width: 100 }).setFunctionX(function (x) {
            return Math.sqrt(radius * radius - x * x);
        }).setFunctionX(function (x) {
            return -Math.sqrt(radius * radius - x * x);
        }).setFunctionY(function (y) {
            return Math.sqrt(radius * radius - y * y);
        }).setFunctionY(function (y) {
            return -Math.sqrt(radius * radius - y * y);
        })
      ;

    Assert.equal(circle.toString(), CIRCLE);
    cb();
});
