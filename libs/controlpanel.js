function add_patch_number_toggle() {
  
  // add_patch_number_toggle
  // probably need an if statement to hide this for tensor BSDF
  var toggle = d3.select("#patch-number-toggle")
      .append("div")
      .attr("class", "btn-group btn-group-sm btn-group-toggle")
      .attr("data-toggle", "buttons")
      .html("patch numbers: &nbsp;" )
    
  var hide_button = toggle.append("label")
      .attr("class","btn btn-secondary focus active")
      .text("Hide")
  
  hide_button.append("input")
      .attr("type","radio")
      .attr("name", "showpatchnumbers")
      .attr("id","hidepatchnumbers")
      .attr("value","hide")
      .attr("autocomplete", "off")
      .attr("checked")

  hide_button.on("mouseup", function(d) {
  });

  var show_button = toggle.append("label")
      .attr("class","btn btn-secondary")
      .text("Show")

  show_button.append("input")
      .attr("type","radio")
      .attr("name", "showpatchnumbers")
      .attr("id","showpatchnumbers")
      .attr("value","show")
      .attr("autocomplete", "off")

  show_button.on("mouseup", function(d) {    
  });
    
}