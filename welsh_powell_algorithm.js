var WelshPowellAlgorithm = (function() {
  var _graph = {}
  var _vertices = 0
  var _colours = {}
  var _colorOptions = ["red", "green", "blue", "black"]
  var _count

  function isSafe(current, option) {
    for (neighbor of _graph[current]) {
      if (_colours[neighbor] === option) {
        return false
      }
    }

    return true
  }

  function algorithm() {
    var nbColors = 0
    var allColors = []

    _colours[Object.keys(_graph)[0]] = _colorOptions[0]

    for (var i = 0; i < _vertices.length; i++) {
      allColors.push(i)
    }

    var currentColor = allColors.pop(0)
    console.log(currentColor);
    nbColors++

    // while (Object.keys(_graph).length) {
    //   var index = 0
    //
    //   while (index < Object.keys(_graph).length) {
    //     var conflict = false
    //     var curretNode = Object.keys(_graph)[index]
    //
    //     if (!isSafe(curretNode, currentColor)) {
    //       conflict = true
    //     }
    //
    //     if (!conflict) {
    //       _colours[curretNode] = currentColor
    //       delete _graph[curretNode]
    //     } else {
    //       index++
    //     }
    //   }
    //
    //   currentColor = allColors.pop(0)
    //   nbColors++
    // }
  }

  function ordena(graph) {
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
    _graph = ordena(graph)
    _vertices = Object.keys(graph).length
    _count = 0

    // console.time('brute_force');
    algorithm()
    // console.timeEnd('brute_force');
    // console.log(_count);
    //
    // console.log(Object.keys(graph).length);
    // console.log(Object.keys(_colours).length);

    return _colours
  }

  return {
    run: run,
  }
})()


// PSEUDO CODE
// Algoritmo WP(G=(V,E))
// inicio
// Ordenar os vértices {x1, x2, ..., xn} tq grau(xi) >= grau(xi+1)
// para i<-2 até n faça  {inicilizar conjuntos de cores vazios}
//    Ci <- {}
// C1 <- {x1} {x1 recebe cor 1}
// para i <- 2 até n faça
//    k = Mínimo{j | Adj(xi) Inter Cj = {}, j=0, 1, ..., n
//    ck = Ck U {xj}
// fim-para
// retornar Máximo{ j | Cj <> {}, j=1, 2, ..., n}
// fim.
