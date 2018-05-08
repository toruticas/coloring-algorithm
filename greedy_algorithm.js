var GreedyAlgorithm = (function() {
  var _graph = {}
  var _vertices = 0
  var _colours = {}
  var _counter = 0
  var _colorOptions = []

  for (var i = 0; i < 10; i++) {
    _colorOptions[i] = getRandomColor()
  }

  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function greedyColoring() {
    _colours[Object.keys(_graph)[0]] = _colorOptions[0]

    var available = new Array(_vertices).fill(true)

    for (var u = 1; u < _vertices; u++) {
      _counter++

      var list = _graph[Object.keys(_graph)[u]]
      for (var i = 0; i < list.length; i++) {
        if (_colours[list[i]]) {
          available[_colorOptions.indexOf(_colours[list[i]])] = false
        }
      }

      var cr
      for (cr = 0; cr < _vertices; cr++) {
        if (available[cr]) {
          break;
        }
      }

      if (!_colorOptions[cr]) {
        _colorOptions[cr] = getRandomColor()
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
