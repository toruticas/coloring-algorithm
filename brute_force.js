var AlgorithmBruteForce = (function() {
  var _graph = {}
  var _colours = {}
  var _colorOptions = []
  var _count
  var _chromaticNumber

  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function isSafe(current, option) {
    for (neighbor of _graph[current]) {
      if (_colours[neighbor] === option) {
        return false
      }
    }

    return true
  }

  function util(pos) {
    _count++

    if (pos >= Object.keys(_graph).length) {
      return true
    }

    var current = Object.keys(_graph)[pos]

    for (var i = 0; i < _chromaticNumber; i++) {
      if (!_colorOptions[i]) {
        _colorOptions[i] = getRandomColor()
      }
      
      var option = _colorOptions[i]

      if (isSafe(current, option)) {
        _colours[current] = option

        if (util(pos+1)) {
          return true
        }
      }
    }
  }

  function colouring() {
    if (util(0) == false) {
      return false
    }

    return true
  }

  function run(graph, chromaticNumber = 4) {
    _graph = graph
    _count = 0
    _chromaticNumber = chromaticNumber

    colouring()

    return {
      colours: _colours,
      counter: _count
    }
  }

  return {
    run: run,
  }
})()
