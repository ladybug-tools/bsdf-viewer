// generate cont. legend.
// modified from http://bl.ocks.org/nbremer/a43dbd5690ccd5ac4c6cc392415140e7

var color = d3.scaleLinear()
	.domain([0, 50, 100])
	.range(["#2c7bb6", "#ffff8c", "#d7191c"])
	.interpolate(d3.interpolateHcl);

//Extra scale since the color scale is interpolated
var transmitScale = d3.scaleLinear()
	.domain([0, 100])
	.range([0, 100]);

//Calculate the variables for the transmit gradient
var numStops = 10;
transmitRange = transmitScale.domain();
transmitRange[2] = transmitRange[1] - transmitRange[0];
transmitPoint = [];

for(var i = 0; i < numStops; i++) {
	transmitPoint.push(i * transmitRange[2] / (numStops - 1) + transmitRange[0]);
}

//Create the gradient
svg.append("defs")
	.append("linearGradient")
	.attr("id", "legend")
	.attr("x1", "0%").attr("y1", "0%")
	.attr("x2", "100%").attr("y2", "0%")
	.selectAll("stop") 
	.data(d3.range(numStops))                
	.enter().append("stop") 
	.attr("offset", function(d,i) { return transmitScale( transmitPoint[i] ) / 100; })   
	.attr("stop-color", function(d,i) { return color( transmitPoint[i] ); });

// draw legend
var legendWidth = 300;

//Color Legend container
var legendsvg = svg.append("g")
	.attr("class", "legendWrapper")
	.attr("transform", "translate(480, 540)");

//Draw the Rectangle
legendsvg.append("rect")
	.attr("class", "legendRect")
	.attr("x", -legendWidth/2)
	.attr("y", 0)
	//.attr("rx", 8/2)
	.attr("width", legendWidth)
	.attr("height", 12)
	.style("fill", "url(#legend)");
	
//Append title
legendsvg.append("text")
	.attr("class", "legendTitle")
	.attr("x", 0)
	.attr("y", 30)
	.style("text-anchor", "middle")
	.text("% of Incident Flux Existing Patch");

//Set scale for x-axis
var xScale = d3.scaleLinear()
	 .range([-legendWidth / 2, legendWidth / 2])
	 .domain([0, 100] );

legendsvg.append("g")
	.attr("class", "axis axis--x")
	.call(
		d3.axisTop(xScale)
		.ticks(5)
		.tickFormat(function(d) { return d + "%"; })
		);