function load_xml_file(xmlFile){

	d3.xml(xmlFile, function(error, data) {
		if (error) throw error;
		parsed_data = [].map.call(data.querySelectorAll("WavelengthData"), function(WavelengthData) {

			var block = WavelengthData.querySelector("WavelengthDataBlock");
			
			block.querySelector("RowAngleBasis").textContent.endsWith("Klems Full") ? ' ' : alert('This viewer only works for Klems Full Angle Basis.');
			
			var rawdata = d3.csvParseRows(block.querySelector("ScatteringData").textContent.replace('\n', '')).slice(0, 145);
		 
			return {
				direction: block.querySelector("WavelengthDataDirection").textContent,
				cAngleBasis: block.querySelector("ColumnAngleBasis").textContent,
				rAngleBasis: block.querySelector("RowAngleBasis").textContent,
				scatteringDataType: block.querySelector("ScatteringDataType").textContent,
				data: [].map.call(rawdata, function(d) { return d.map(Number).slice(0, 145); })
			};
		});
		// directions = parsed_data.map(function(d){ return d.direction; });
		// values = parsed_data.map(function(d){ return d.data[144] })
		// value = parsed_data[0][selected_patch] 
	 });
}