function from_square_to_disk(a, b){
    /*
    convert from (a, b) cartesian coordinates on a square to (u, v) coordinates on a
    disk based on shirley chiu mapping.

    see page 4 of 7 from this link:
        http://pdfs.semanticscholar.org/4322/6a3916a85025acbb3a58c17f6dc0756b35ac.pdf
    
    */
    let r = 0;
    let phi = 0;
    if( a >= b && a > -b){
        // Quadrant 1
        r = a;
        phi = Math.PI / 4 * b / a;
    } else if (b > a && b >= -a){
        // Quadrant 2
        r = b;
        phi = Math.PI / 4 * (2 - a / b);
    } else if (-a > b && -a >= -b){
        // Quadrant 3
        r = -a;
        phi = Math.PI / 4 * (4 + b / a);
    } else if (-b > -a && -b >= a ){
        // Quadrant 4
        r = -b;
        phi = Math.PI / 4 * (6 - a / b);
    }

    return [r * Math.cos(phi), r * Math.sin(phi)]
}


function gen_features(depth){
    /*
    This function generates data needed for d3 projection. We are creating a grid of
    squares here and structure them as a geoJson file so we can use d3's native
    projection functionalities to project these squares based on  
    depth = tensor_tree_depth */
    let data = [];
    const step = 1 / (depth * 4);
    let x_count = 0,
        y_count = 0;
    for(var x = 0; x < 1; x += step){
        x_count += 1;
        y_count = 0;
        for(var y = 0; y < 1; y += step){
            y_count += 1;
            // generate all the coordinates for 4 different quadrant
            // the id for each patch is set to {quadrant_id}:{x_count}:{y_count}
            var coor_1 = [[[x, y], [x, y + step], [x + step, y + step], [x + step, y], [x, y]]];
            var id_1 = "Q1:" + x_count + ":" + y_count;
            var coor_2 = [[[x, -y], [x, -y - step], [x + step, -y - step], [x + step, -y], [x, -y]]];
            var id_2 = "Q2:" + x_count + ":" + y_count;
            var coor_3 = [[[-x, -y], [-x, -y - step], [-x - step, -y - step], [-x - step, -y], [x, -y]]];
            var id_3 = "Q3:" + x_count + ":" + y_count;
            var coor_4 = [[[-x, y], [-x, y + step], [-x - step, y + step], [-x - step, y], [x, y]]];
            var id_4 = "Q4:" + x_count + ":" + y_count;

            data.push({"type": "Feature", "geometry": { "type":"Polygon", "coordinates": coor_1, "id": id_1}, "selected": false});
            data.push({"type": "Feature", "geometry": { "type":"Polygon", "coordinates": coor_2, "id": id_2}, "selected": false});
            data.push({"type": "Feature", "geometry": { "type":"Polygon", "coordinates": coor_3, "id": id_3}, "selected": false});
            data.push({"type": "Feature", "geometry": { "type":"Polygon", "coordinates": coor_4, "id": id_4}, "selected": false});
        }
    }

    return data;
}
