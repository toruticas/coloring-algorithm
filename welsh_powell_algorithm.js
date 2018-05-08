var WelshPowellAlgorithm = (function() {
  var _graph = {}
  var _vertices = 0
  var _colours = {}
  var _colorOptions = ["red", "green", "blue", "black"]
  var _counter

  function algorithm() {
    for (var i = 0; i < _vertices; i++) {
      if (_colours[Object.keys(_graph)[i]]) {
        continue
      } else {
        _colours[Object.keys(_graph)[i]] = _colorOptions[i]

        for (var j = i+1; j < _vertices; j++) {
          _counter++
          
          if (!(Object.keys(_graph)[i].indexOf(Object.keys(_graph)[j]) !== -1) && !_colours[Object.keys(_graph)[j]]) {
            _colours[Object.keys(_graph)[j]] = _colorOptions[i]
          } else {
            continue
          }
        }
      }
    }
  }

  function sortVertices(graph) {
    var newGraph = {}
    var counter = []

    for (var node in graph) {
      counter.push([node, graph[node].length])
    }

    counter.sort(function (a, b) {
      return a[1] < b[1]
    })

    for (var i = 0; i < counter.length; i++) {
      newGraph[counter[i][0]] = graph[counter[i][0]]
    }

    return newGraph
  }

  function run(graph) {
    _graph = sortVertices(graph)
    _vertices = Object.keys(graph).length
    _counter = 0

    algorithm()

    return {
      colours: _colours,
      counter: _counter,
    }
  }

  return {
    run: run,
  }
})()
