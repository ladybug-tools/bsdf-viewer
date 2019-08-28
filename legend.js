// modified from http://bl.ocks.org/syntagmatic/e8ccca52559796be775553b467593a9f
// License: GPL v3

function draw_legend(selector_id, colorscale) {

  var legendheight = document.getElementById("legend_cell").clientHeight,
      legendwidth = document.getElementById("legend_cell").clientWidth,
      margin = {top: 10, right: 60, bottom: 10, left: 2};

  var canvas = d3.select(selector_id)
    .style("height", legendheight + "px")
    .style("width", legendwidth + "px")
    .style("position", "relative")
    .append("canvas")
    .attr("height", legendheight - margin.top - margin.bottom)
    .attr("width", 1)
    .style("height", (legendheight - margin.top - margin.bottom) + "px")
    .style("width", (legendwidth - margin.left - margin.right) + "px")
    .style("border", "1px solid #000")
    .style("position", "absolute")
    .style("top", (margin.top) + "px")
    .style("left", (margin.left) + "px")
    .node();

  var ctx = canvas.getContext("2d");

  var legendscale = d3.scaleLog()
    .range([1, legendheight - margin.top - margin.bottom])
    .domain([100, 1e-3]);

  // image data hackery based on http://bl.ocks.org/mbostock/048d21cf747371b11884f75ad896e5a5
  var image = ctx.createImageData(1, legendheight);
  d3.range(legendheight).forEach(function(i) {
    var c = d3.rgb(colorscale(legendscale.invert(i)));
    image.data[ 4 * i] = c.r;
    image.data[4 * i + 1] = c.g;
    image.data[4 * i + 2] = c.b;
    image.data[4 * i + 3] = 255;
  });
  ctx.putImageData(image, 0, 0);

  // A simpler way to do the above, but possibly slower. keep in mind the legend width is stretched because the width attr of the canvas is 1
  // See http://stackoverflow.com/questions/4899799/whats-the-best-way-to-set-a-single-pixel-in-an-html5-canvas
  /*
  d3.range(legendheight).forEach(function(i) {
    ctx.fillStyle = colorscale(legendscale.invert(i));
    ctx.fillRect(0,i,1,1);
  });
  */

  var legendaxis = d3.axisRight()
    .scale(legendscale)
    .tickSize(10)
    .ticks(4)
    .tickPadding(13)
    .tickFormat(
      d3.format("6.3")
    );
    // .tickFormat(d3.format(".1e"));

  var svg = d3.select(selector_id)
    .append("svg")
    .attr("height", (legendheight) + "px")
    .attr("width", (legendwidth) + "px")
    .style("position", "absolute")
    .style("left", "0px")
    .style("top", "0px");

  svg
    .append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + (legendwidth - margin.left - margin.right + 3) + "," + (margin.top) + ")")
    .call(legendaxis);
};

