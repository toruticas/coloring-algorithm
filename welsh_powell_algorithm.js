var WelshPowellAlgorithm = (function() {
  var _graph = {}
  var _vertices = 0
  var _colours = {}
  var _colorOptions = ["#F00", "#0F0", "#00F", "#000", "#FF0", "#0FF", "#F0F"]
  var _counter

  var WelshPowellJS = (function() {
    var nextColorProvider = function(color = 0) { return () => color++; };

    // vertices = [a, b, c, d];
    // edges = [[a,b],[c,d],[d,d]];
    function color({vertices = [], edges = [], colors = []}) {
      let nextColor = nextColorProvider();
      let graph = { vertices, edges, colors, nextColor };
      graph.colors = new Array(graph.vertices.length);

      // color
      let remaining = colorStep(graph);
      while(remaining.length) {
        remaining = colorStep(graph, remaining);
      }

      return graph.colors;
    }


    function countEdges(valence, edges) {
      edges.forEach(e => {
        if(e[0] !== e[1]) {
          valence[e[0]]++;
          valence[e[1]]++;
        }
      });
    }

    function maxValence(vertices, edges) {
      let valence = new Object;
      vertices.forEach(v => valence[v] = 0);
      countEdges(valence, edges);

      // swapping key value
      let valueSwapped = new Object;
      Object.keys(valence).forEach(k => {
        valueSwapped[valence[k]] = k;
      });

      let max = Object.keys(valueSwapped).sort()[0];
      return valueSwapped[max];
    }

    function getVertexIndex(graph, vertex) {
      return graph.vertices.indexOf(vertex);
    }

    function getColor(graph, vertex) {
      return graph.colors[getVertexIndex(graph, vertex)];
    }

    function isConnectedToColoredVertex(graph, vertex) {
      let index = getVertexIndex(graph, vertex);
      let connected = new Set;

      graph.edges.forEach((e) => {
        if (e[0] === vertex) connected.add(e[1]);
        if (e[1] === vertex) connected.add(e[0]);
      });

      return [...connected].filter(x => getColor(graph, x) !== undefined).length;
    }

    function colorStep(graph, remaining = graph.vertices) {
      let color = graph.nextColor();
      let maxVertex = maxValence(remaining, graph.edges);

      // get index of first element
      let vertexIndex = getVertexIndex(graph, maxVertex);
      graph.colors[vertexIndex] = color;

      graph.vertices.forEach(x => {
        _counter++;
        vertexIndex = getVertexIndex(graph, x);
        // make sure not already colored
        if(!graph.colors[vertexIndex]) {
          // if it's not connected to a colored vertex
          if(!isConnectedToColoredVertex(graph, x)) {
            // color
            graph.colors[vertexIndex] = color;
          }
        }
      });

      return graph.vertices.filter((x, i) => graph.colors[i] === undefined);
    }

    return color
  })()

  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function run(graph) {
    var graphCopy = JSON.parse(JSON.stringify(graph))

    _counter = 0
    _colours = {}
    _graph = {
      vertices: Object.keys(graph),
      edges: []
    }

    for (var node in graphCopy) {
      for (var neighbor of graphCopy[node]) {
        graphCopy[neighbor].slice(graphCopy[neighbor].indexOf(node), 1)
        _graph.edges.push([node, neighbor])
      }
    }

    var colors = WelshPowellJS(_graph)
    var mapColors = {}

    for (var i = 0; i < colors.length; i++) {
      mapColors[colors[i]] = mapColors[colors[i]] || getRandomColor()
      _colours[Object.keys(graph)[i]] = mapColors[colors[i]]
    }

    return {
      colours: _colours,
      counter: _counter,
    }
  }

  return {
    run: run,
  }
})()
