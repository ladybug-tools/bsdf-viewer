/* parse input bsdf file. */

/*

This conversion factor can be calculate on the fly but I just hard-coded them for now.
So many thanks to David Geisler-Moroder for providing the numbers and guidance for
understanding XML files. 

*/

const c_factor = [
	41.90425372, 42.87638872, 42.87638872, 42.87638872, 42.87638872, 42.87638872,
	42.87638872, 42.87638872, 42.87638872, 45.62809984, 45.62809984, 45.62809984,
	45.62809984, 45.62809984, 45.62809984, 45.62809984, 45.62809984, 45.62809984,
	45.62809984, 45.62809984, 45.62809984, 45.62809984, 45.62809984, 45.62809984,
	45.62809984, 42.33302093, 42.33302093, 42.33302093, 42.33302093, 42.33302093,
	42.33302093, 42.33302093, 42.33302093, 42.33302093, 42.33302093, 42.33302093,
	42.33302093, 42.33302093, 42.33302093, 42.33302093, 42.33302093, 42.33302093,
	42.33302093, 42.33302093, 42.33302093, 44.6724406, 44.6724406, 44.6724406,
	44.6724406, 44.6724406, 44.6724406, 44.6724406, 44.6724406, 44.6724406, 44.6724406,
	44.6724406, 44.6724406, 44.6724406, 44.6724406, 44.6724406, 44.6724406, 44.6724406,
	44.6724406, 44.6724406, 44.6724406, 44.6724406, 44.6724406, 44.6724406, 44.6724406,
	44.6724406, 44.6724406, 44.6724406, 44.6724406, 44.6724406, 44.6724406, 44.6724406,
	44.6724406, 44.6724406, 44.6724406, 44.6724406, 44.6724406, 44.6724406, 44.6724406,
	44.6724406, 44.6724406, 44.6724406, 44.6724406, 44.6724406, 44.6724406, 44.6724406,
	44.6724406, 44.6724406, 44.6724406, 50.79962511, 50.79962511, 50.79962511,
	50.79962511, 50.79962511, 50.79962511, 50.79962511, 50.79962511, 50.79962511,
	50.79962511, 50.79962511, 50.79962511, 50.79962511, 50.79962511, 50.79962511,
	50.79962511, 50.79962511, 50.79962511, 50.79962511, 50.79962511, 50.79962511,
	50.79962511, 50.79962511, 50.79962511, 45.62809984, 45.62809984, 45.62809984,
	45.62809984, 45.62809984, 45.62809984, 45.62809984, 45.62809984, 45.62809984,
	45.62809984, 45.62809984, 45.62809984, 45.62809984, 45.62809984, 45.62809984,
	45.62809984, 57.02153605, 57.02153605, 57.02153605, 57.02153605, 57.02153605,
	57.02153605, 57.02153605, 57.02153605, 57.02153605, 57.02153605, 57.02153605,
	57.02153605
];

function split_list(arr, n) {
	var res = [];
	while (arr.length) {
	  res.push(arr.splice(0, n));
	}
	return res;
  }

function load_xml_file(xmlFile, callback){
	d3.xml(xmlFile, function(error, data) {
		if (error) throw error;
		var parsed_data = parse_xml_data(data);
		return callback(parsed_data);
	});
}


function load_xml_text(xmlText, callback){
	var oParser = new DOMParser();
	var data = oParser.parseFromString(xmlText, "text/xml");
	var parsed_data = parse_xml_data(data);
	return callback(parsed_data);
}


function parse_xml_data(data){
	
	return [].map.call(data.querySelectorAll("WavelengthData"), function(WavelengthData) {
    	var separator = ' ';
    	var psv = d3.dsvFormat(separator);
			var block = WavelengthData.querySelector("WavelengthDataBlock");
			
			block.querySelector("RowAngleBasis").textContent.endsWith("Klems Full") ? ' ' : alert('This viewer only works for Klems Full Angle Basis.');
			var wavelength = WavelengthData.querySelector("Wavelength").textContent; 
			
			var direction_type = block.querySelector("WavelengthDataDirection").textContent;
			var rawdata = split_list(
				block.querySelector("ScatteringData")
				.textContent.split(/[\s,]+/)
				.filter(function(f){return f != ''}),
				145);
			return {
				direction: wavelength + " " + direction_type,
				cAngleBasis: block.querySelector("ColumnAngleBasis").textContent,
				rAngleBasis: block.querySelector("RowAngleBasis").textContent,
				scatteringDataType: block.querySelector("ScatteringDataType").textContent,
				data: [].map.call(
					rawdata,
					function(d) {
						return d.filter(function(f){return f != ''})
							.map(function(f, i){
								return parseFloat(f) * 100 / c_factor[i];
							});
					}
				)
			};
		});
}


function readXMLFile(file) {
    
	var f = file;
    
	if (f) {
		var r = new FileReader();

		r.onloadstart = function(e) {
			document.getElementById('fileinput').innerHTML = "parsing file...";
		};
	  
		r.onload = function(e) {
			// read in file
			var contents = e.target.result;
			var raw = r.result;
        
			// parse file to an xml object
			load_xml_text(raw, update_on_new_file);
		};
      
		r.readAsText(f);
    
	} else { 
      alert("Failed to load file!");
    }
};
