// Dependencies
var CliGraph = require("../lib");

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
