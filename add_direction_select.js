function add_directions_dropdown(directions) {
    
  var select = d3.select("#direction")
    .text("Pick wavelength and direction: ")
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
      
      selectedDirection = parseInt(d3.select(this).property("value"));

      // update the value in other dropdown menu
      d3.selectAll("select option").filter(function(d, i) {
        return i == selectedDirection;
      }).attr("selected", "true");
      update_graph_direction();
     });

  update_graph_direction();
}