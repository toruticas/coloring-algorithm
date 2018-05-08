var AlgorithmBruteForce = (function() {
  var _graph = {}
  var _colours = {}
  var _colorOptions = ["#F00", "#0F0", "#00F", "#000"]
  var _count

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
    for (var option of _colorOptions) {
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

    console.log("Solution exist and Following are the assigned colours:");
    console.log(_colours);

    return true
  }

  function run(graph) {
    _graph = graph
    _count = 0

    console.time('brute_force');
    colouring()
    console.timeEnd('brute_force');
    console.log(_count);

    console.log(Object.keys(graph).length);
    console.log(Object.keys(_colours).length);

    return _colours
  }

  return {
    run: run,
  }
})()
