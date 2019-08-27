/* parse tensor-tree input bsdf file. */
function load_tt_xml_file(xmlFile, callback){
    d3.xml(xmlFile, function(error, data) {
        if (error) throw error;
        var parsed_data = parse_tt_xml_data(data);
        return callback(parsed_data);
    });
}


function parse_tt_xml_data(data){
    // this can be TensorTree3 or TensorTree4
    const data_structure = data.querySelector("DataDefinition").querySelector('IncidentDataStructure').textContent;
    // number of division in data structure based on TensorTree3 versus TensorTree4
    const n = data_structure[data_structure.length - 1] == '3' ? 8 : 16;
    return [].map.call(data.querySelectorAll("WavelengthData"), function(WavelengthData) {

        var block = WavelengthData.querySelector("WavelengthDataBlock");
        block.querySelector("AngleBasis")
            .textContent.endsWith("LBNL/Shirley-Chiu") ? ' ' : alert('This viewer only works for LBNL/Shirley-Chiu Angle Basis.');

        const wavelength = WavelengthData.querySelector("Wavelength").textContent; 

        const direction_type = block.querySelector("WavelengthDataDirection").textContent;

        const raw_data = parse_tt_scattering_data(block.querySelector("ScatteringData").textContent, n);

        return {
            direction: wavelength + " " + direction_type,
            AngleBasis: block.querySelector("AngleBasis").textContent,
            scatteringDataType: block.querySelector("ScatteringDataType").textContent,
            data: raw_data
        };
    });
}


function readTTXMLFile(file) {
    
    var f = file;
    
    if (f) {
        var r = new FileReader();

        r.onloadstart = function(e) {
            document.getElementById('ttfileinput').innerHTML = "parsing file...";
        };
      
        r.onload = function(e) {
            // read in file
            var contents = e.target.result;
            var raw = r.result;
        
            // parse file to an xml object
            load_tt_xml_text(raw, update_on_new_file);
        };
      
        r.readAsText(f);
    
    } else { 
      alert("Failed to load file!");
    }
};


function load_tt_xml_text(xmlText, callback){
    var oParser = new DOMParser();
    var data = oParser.parseFromString(xmlText, "text/xml");
    var parsed_data = parse_tt_xml_data(data);
    return callback(parsed_data);
}


function parse_tt_scattering_data(data) {
    // from http://blog.stevenlevithan.com/archives/regex-recursion
    const group_regex = /[^{]+{(?:[^{}]|{[^{}]*})*}/g;
    let tree = [];
    let nodes;
    while ((nodes = group_regex.exec(data)) !== null) {
        nodes.forEach((node) => {
            // Now for each matrix try to get the leaves.
            tree.push(parse_node(node));
        })
    };

    return tree;
  }


function parse_node(node){
    const regex = /{.*?}/g;
    let leaves = [];
    let branch;
    while ((branch = regex.exec(node.trim())) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (branch.index === branch.lastIndex) {
            regex.lastIndex++;
        }
        
        // The result can be accessed through the `m`-variable.
        branch.forEach((m) => {
            leaves.push(
                m.substring(1, m.length - 1).trim().split(/[\s,]+/)
                .map(function(f){return parseFloat(f);})
            );
        });
    }
    return leaves;
}
