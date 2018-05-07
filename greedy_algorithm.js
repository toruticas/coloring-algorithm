var GreedyAlgorithm = (function() {
  var _graph = {}
  var _vertices = 0
  var _colours = {}
  var _colorOptions = ["red", "green", "blue", "black", "cyan", "magenta", "yellow"]

  function greedyColoring() {
    var result = (new Array(_vertices)).map(() => -1)
    _colours[Object.keys(_graph)[0]] = _colorOptions[0]

    var available = new Array(_vertices).fill(true)

    for (var u = 0; u < _vertices; u++) {
      var list = _graph[Object.keys(_graph)[u]]
      for (var i = 0; i < list.length; i++) {
        // console.log(list[i]);
        if (_colours[list[i]]) {
          available[i] = false
        }
      }

      var cr = 0
      for (; cr < _vertices; cr++) {
        if (available[cr]) {
          console.log("BREAK");
          break;
        }
      }

      console.log(Object.keys(_graph)[u], cr);
      _colours[Object.keys(_graph)[u]] = _colorOptions[cr]

      available = new Array(_vertices).fill(true)
    }
  }

  function run(graph) {
    _graph = graph
    _vertices = Object.keys(graph).length

    greedyColoring()

    console.log(Object.keys(graph).length);
    console.log(Object.keys(_colours).length);

    return _colours
  }

  return {
    run: run,
  }
})()
