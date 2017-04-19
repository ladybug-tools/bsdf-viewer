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

			var block = WavelengthData.querySelector("WavelengthDataBlock");
			
			block.querySelector("RowAngleBasis").textContent.endsWith("Klems Full") ? ' ' : alert('This viewer only works for Klems Full Angle Basis.');
			
			rawdata = d3.csvParseRows(block.querySelector("ScatteringData").textContent.replace('\n', '')).slice(0, 145);
		 
			return {
				direction: block.querySelector("WavelengthDataDirection").textContent,
				cAngleBasis: block.querySelector("ColumnAngleBasis").textContent,
				rAngleBasis: block.querySelector("RowAngleBasis").textContent,
				scatteringDataType: block.querySelector("ScatteringDataType").textContent,
				data: [].map.call(rawdata, function(d) { return d.map(Number).slice(0, 145); })
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
      alert("Failed to load file");
    }
};
