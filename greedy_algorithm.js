var GreedyAlgorithm = (function() {
  var _graph = {}
  var _vertices = 0
  var _colours = {}
  var _counter = 0
  var _colorOptions = ["#F00", "#0F0", "#00F", "#000", "#FF0", "#0FF", "#F0F"]

  function greedyColoring() {
    var result = (new Array(_vertices)).map(() => -1)
    _colours[Object.keys(_graph)[0]] = _colorOptions[0]

    var available = new Array(_vertices).fill(true)

    for (var u = 0; u < _vertices; u++) {
      _counter++

      var list = _graph[Object.keys(_graph)[u]]
      for (var i = 0; i < list.length; i++) {
        if (_colours[list[i]]) {
          available[i] = false
        }
      }

      var cr = 0
      for (; cr < _vertices; cr++) {
        if (available[cr]) {
          break;
        }
      }

      _colours[Object.keys(_graph)[u]] = _colorOptions[cr]

      available = new Array(_vertices).fill(true)
    }
  }

  function run(graph) {
    _graph = graph
    _counter = 0
    _vertices = Object.keys(graph).length

    greedyColoring()

    return {
      colours: _colours,
      counter: _counter
    }
  }

  return {
    run: run,
  }
})()
