
[![cli-graph](http://i.imgur.com/WMdX9YR.png)](#)

# cli-graph [![PayPal](https://img.shields.io/badge/%24-paypal-f39c12.svg)][paypal-donations] [![Travis](https://img.shields.io/travis/IonicaBizau/node-cli-graph.svg)](https://travis-ci.org/IonicaBizau/node-cli-graph/) [![Version](https://img.shields.io/npm/v/cli-graph.svg)](https://www.npmjs.com/package/cli-graph) [![Downloads](https://img.shields.io/npm/dt/cli-graph.svg)](https://www.npmjs.com/package/cli-graph) [![Get help on Codementor](https://cdn.codementor.io/badges/get_help_github.svg)](https://www.codementor.io/johnnyb?utm_source=github&utm_medium=button&utm_term=johnnyb&utm_campaign=github)

> Easily draw function graphs in text mode.

## :cloud: Installation

```sh
$ npm i --save cli-graph
```


Or you can check out [**the browser version, online**](https://ionicabizau.github.io/node-cli-graph).

## :clipboard: Example



```js
// Dependencies
var CliGraph = require("cli-graph");

// Create a new function graph
var g1 = new CliGraph({
    height: 20
  , width: 20
  , center: { y: 18 }
}).setFunctionX(function (x) {
    return x * x / 5;
});
console.log(g1.toString());
// =>
//                     ▲
//                     │
//   •                 │                 •
//                     │
//                     │
//     •               │               •
//                     │
//                     │
//       •             │             •
//                     │
//                     │
//         •           │           •
//                     │
//           •         │         •
//                     │
//             •       │       •
//               •     │     •
//                 •   │   •
// ──────────────────•─•─•────────────────▶
//                     │

// Another function
var g2 = new CliGraph({
    height: 30
  , width: 30
  , marks: {
        hAxis: '-'
      , vAxis: '|'
      , center: '+'
      , point: '.'
  }
});

g2.setFunctionX(function (x) {
    return x;
});

console.log(g2.toString());
// =>
//                               ▲
//                               |                           .
//                               |                         .
//                               |                       .
//                               |                     .
//                               |                   .
//                               |                 .
//                               |               .
//                               |             .
//                               |           .
//                               |         .
//                               |       .
//                               |     .
//                               |   .
//                               | .
// ------------------------------.----------------------------▶
//                             . |
//                           .   |
//                         .     |
//                       .       |
//                     .         |
//                   .           |
//                 .             |
//               .               |
//             .                 |
//           .                   |
//         .                     |
//       .                       |
//     .                         |
//   .                           |

var circle = new CliGraph({ height: 32, width: 32 }).setFunctionX(function (x) {
    return Math.sqrt(200 - x * x);
}).setFunctionX(function (x) {
    return -Math.sqrt(200 - x * x);
}).setFunctionY(function (y) {
    return Math.sqrt(200 - y * y);
}).setFunctionY(function (y) {
    return -Math.sqrt(200 - y * y);
});


console.log(circle.toString());
// =>
//                                 ▲
//                                 │
//                         • • • • • • • • •
//                     • •         │         • •
//                 • •             │             • •
//               •                 │                 •
//             •                   │                   •
//           •                     │                     •
//         •                       │                       •
//         •                       │                       •
//       •                         │                         •
//       •                         │                         •
//     •                           │                           •
//     •                           │                           •
//     •                           │                           •
//     •                           │                           •
// ────•───────────────────────────┼───────────────────────────•──▶
//     •                           │                           •
//     •                           │                           •
//     •                           │                           •
//     •                           │                           •
//       •                         │                         •
//       •                         │                         •
//         •                       │                       •
//         •                       │                       •
//           •                     │                     •
//             •                   │                   •
//               •                 │                 •
//                 • •             │             • •
//                     • •         │         • •
//                         • • • • • • • • •
//                                 │
```

## :memo: Documentation


### `CliGraph(options)`
Creates a new CliGraph instance.

Example:

```js
var g = new CliGraph();
```

#### Params
- **Object** `options`: An object containing the following fields:
 - `height` (Number): The graph height (default: `40`).
 - `width` (Number): The graph width (default: `60`).
 - `aRatio` (Number): The horizontal aspect ratio (default: `2`).
 - `center` (Object): An object containing:
   - `x` (Number): The `x` origin (default: `width / 2`)
   - `y` (Number): The `y` origin (default: `height / 2`)
 - `marks` (Object): An object containing:
   - `hAxis` (String): The character for drawing horizontal axis (default `"─"`).
   - `vAxis` (String): The character for drawing vertical axis (default "│").
   - `center` (String): The character for axis intersection (default `"┼"`).
   - `point` (String): The character for drawing points (default `"•"`).
   - `rightArrow` (String): The character for drawing the right arrow (default `"▶"`).
   - `topArrow` (String): The character for drawing the top arrow (default `"▲"`).
   - `background` (String): The background character (default `" "`).

#### Return
- **CliGraph** The CliGraph instance.

### `addPoint(x, y, chr)`
Adds a point on the `x` and `y` coordinates.

#### Params
- **Number** `x`: The `x` coordinate.
- **Number** `y`: The `y` coordinate.
- **String** `chr`: The point character (default: the one provided in defaults).

#### Return
- **CliGraph** The CliGraph instance.

### `isPoint(x, y, chr)`
Checks if on given coordinates there is a point.

#### Params
- **Number** `x`: The `x` coordinate.
- **Number** `y`: The `y` coordinate.
- **String** `chr`: The point character (default: the one provided in defaults).

### `toString()`
Stringifies the graph.

#### Return
- **String** The stringified graph.

### `setFunctionX(foo, min, max, chr)`
Adds the function on the graph, iterating the x axis.

#### Params
- **Function** `foo`: A function that receives `x` as the first parameter and returns the `y` value.
- **Number** `min`: The minimum `x` (default: the lowest possible value).
- **Number** `max`: The maximum `x`.(default: the highest possible value).
- **String** `chr`: The point character (default: the one provided in defaults).

#### Return
- **CliGraph** The CliGraph instance.

### `setFunctionY(foo, min, max, chr)`
Adds the function on the graph, iterating the y axis.

#### Params
- **Function** `foo`: A function that receives `y` as the first parameter and returns the `x` value.
- **Number** `min`: The minimum `y` (default: the lowest possible value).
- **Number** `max`: The maximum `y`.(default: the highest possible value).
- **String** `chr`: The point character (default: the one provided in defaults).

#### Return
- **CliGraph** The CliGraph instance.



## :yum: How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].

## :dizzy: Where is this library used?
If you are using this library in one of your projects, add it in this list. :sparkles:


 - [`ascii-heart`](https://github.com/nuvipannu/ascii-heart#readme) (by Nuvi Pannu)—Create ASCII hearts using Node.js.
 - [`cli-circle`](https://github.com/IonicaBizau/node-cli-circle)—Generate ASCII circles with NodeJS.
 - [`datanow`](https://datanow.io) (by Glen Arrowsmith)—DataNow.io's command line tool and node SDK.

## :scroll: License

[MIT][license] © [Ionică Bizău][website]

[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[license]: http://showalicense.com/?fullname=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica%40gmail.com%3E%20(http%3A%2F%2Fionicabizau.net)&year=2014#license-mit
[website]: http://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
