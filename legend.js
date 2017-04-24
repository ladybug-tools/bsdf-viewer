// generate cont. legend.
// modified from http://bl.ocks.org/nbremer/a43dbd5690ccd5ac4c6cc392415140e7
function draw_legend(){
  
  var legendWidth = 500;
  
  var colorScale = d3.scaleLog()
  .domain([0.00000001, 0.5, 100])
    .range(["#2c7bb6", "#ffff8c", "#d7191c"]);

  //Extra scale since the color scale is interpolated
  var transmitScale = d3.scaleLinear()
    .domain([0, 100])
    .range([0, legendWidth]);

  //Calculate the variables for the transmit gradient
  var numStops = 50;
  transmitRange = transmitScale.domain();
  transmitRange[2] = transmitRange[1] - transmitRange[0];
  transmitPoint = [];

  for(var i = 0; i < numStops; i++) {
    transmitPoint.push(i * transmitRange[2] / (numStops - 1) + transmitRange[0]);
  }

  svg = d3.select("#viewer").select("svg");

  //Create the gradient
  svg.append("defs")
    .append("linearGradient")
    .attr("id", "legend")
    .attr("x1", "0%").attr("y1", "0%")
    .attr("x2", "100%").attr("y2", "0%")
    .selectAll("stop") 
    .data(d3.range(numStops))                
    .enter().append("stop") 
    .attr("offset",
					function(d,i) { return transmitScale( transmitPoint[i] ) / legendWidth; })   
    .attr("stop-color",
          function(d,i) { return colorScale( transmitPoint[i]); });

  // draw legend
  //Color Legend container
  var legendsvg = svg.append("g")
    .attr("class", "legendWrapper")
    .attr("transform", "translate(" + chwidth / 2 + ", 470)");

  //Draw the Rectangle
  legendsvg.append("rect")
    .attr("class", "legendRect")
    .attr("x", -legendWidth/2)
    .attr("y", 0)
    //.attr("rx", 8/2)
    .attr("width", legendWidth)
    .attr("height", 16)
    .style("fill", "url(#legend)");

  //Append title
  legendsvg.append("text")
    .attr("class", "legendTitle")
    .attr("x", 0)
    .attr("y", 30)
    .style("text-anchor", "middle")
    .text("% of Incident Flux Existing Patch");

  //Set scale for x-axis
  var xScale = d3.scaleLog()
     .range([-legendWidth / 2, legendWidth / 2])
     .domain([0.00000001, 100]);

  legendsvg.append("g")
    .attr("class", "axis axis--x")
  .attr("transform", "translate(0, 8)")
    .call(
      d3.axisTop(xScale)
      .ticks(8)
      .tickFormat(function(d) { return d + "%"; })
      );
}