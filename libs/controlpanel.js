function add_patch_number_toggle() {
  
  // add_patch_number_toggle
  // probably need an if statement for klems BSDF
  var toggle = d3.select("#patch-number-toggle")
    .append("p")
    .text("Patch Numbers: ")
    .append("select").attr("id","patch-number-select")
      .append("option").attr("default","True").attr("value","hide").text("Hide")
      
    d3.select("#patch-number-select")
      .append("option").attr("value","show").text("Show")
  
    
}