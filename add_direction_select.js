function add_directions_dropdown() {
    
  var select = d3.select("#direction")
    .text("Change the direction: ")
    .append("select")
  
  // add options based on directions
  select.selectAll("option")
      .data(directions)
      .enter()
      .append("option")
      .attr("value", function(d, i){ return d.replace(" ", "_"); })
      .text(function(d) { return d.replace(" ", "_");});
    
  	// add change event to resort images
//     select.on("change", function(d) {
//       sortBy = d3.select(this).property("value");
//       // update the value in other dropdown menu
//       d3.selectAll("select option").filter(function(d) {
//         return d == sortBy;
//       }).attr("selected", "true");
//       updateImageGrid(graph.brushed(), false);
//     });
}