![](http://i.imgur.com/WMdX9YR.png)

CLI Graph
=========
Easily draw function graphs in text mode.

## Installation

```sh
$ npm install cli-graph
```

## Example

```js
// Dependencies
var CliGraph = require("../lib");

// Create a new function graph
var g1 = new CliGraph({
    height: 20
  , width: 20
  , center: { y: 18 }
}).setFunction(function (x) {
    return x * x / 5;
});
console.log(g1.toString());

// Another function
var g2 = new CliGraph({
    height: 30
  , width: 30
  , marks: {
        hAxis: "-"
      , vAxis: "|"
      , center: "+"
      , point: "."
  }
});

g2.setFunctionX(function (x) {
    return x;
});

console.log(g2.toString());
```

Running the script above we get the following output:

```sh
                    ▲
                    │
  •                 │                 •
                    │
                    │
                    │
    •               │               •
                    │
                    │
      •             │             •
                    │
        •           │           •
                    │
          •         │         •
                    │
            •       │       •
                    │
              •     │     •
────────────────•─•─•─•─•──────────────▶
                    │

                              ▲
                              |                           .
                              |                         .
                              |                       .
                              |                     .
                              |                   .
                              |                 .
                              |               .
                              |             .
                              |           .
                              |         .
                              |       .
                              |     .
                              |   .
                              | .
------------------------------.----------------------------▶
                            . |
                          .   |
                        .     |
                      .       |
                    .         |
                  .           |
                .             |
              .               |
            .                 |
          .                   |
        .                     |
      .                       |
    .                         |
  .                           |

```

## Documentation
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

## How to contribute
1. File an issue in the repository, using the bug tracker, describing the
   contribution you'd like to make. This will help us to get you started on the
   right foot.
2. Fork the project in your account and create a new branch:
   `your-great-feature`.
3. Commit your changes in that branch.
4. Open a pull request, and reference the initial issue in the pull request
   message.

## License
See the [LICENSE](./LICENSE) file.
