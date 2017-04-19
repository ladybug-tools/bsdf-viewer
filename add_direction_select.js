function add_directions_dropdown(directions) {
    
  var select = d3.select("#direction")
    .text("Change the direction: ")
    .append("select")
  
  // add options based on directions
  select.selectAll("option")
      .data(directions)
      .enter()
      .append("option")
      .attr("value", function(d, i){ return i; })
      .text(function(d) { return d;});
    
  	// add change event to update the values and colors
    select.on("change", function(d) {
      index = d3.select(this).property("value");
//       // update the value in other dropdown menu
//       d3.selectAll("select option").filter(function(d) {
//         return d == sortBy;
//       }).attr("selected", "true");
//       updateImageGrid(graph.brushed(), false);
//     });
}