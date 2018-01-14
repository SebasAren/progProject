/* map.js
 * Sebastiaan Arendsen
 * Programmeerproject
 *
 * Contains functions to control the datamap
 */

'use strict';

// this will always show data from the global datasource internetData
function addDataToMap(dataIndex) {
 
    // datacontainer
    var plotData = {};

    // loop over the original dataset to fix the data format
    $.each(internetData, function(_, entry) {

        // if first time using the data transform to 3 letter ISO country code
        if (entry.ISO.length < 3) {
            entry.ISO = countryConverter(entry.ISO);
        }

        var i = 0;
        // find the correct data entry in the datafile
        $.each(entry, function(_, dataPoint) {
            if (i == (dataIndex + 1)) {

                // store data in the json
                plotData[entry.ISO] = {
                    value: dataPoint
                };

                // break loop
                return false;
            }
            i++;
        });
    });
    
    // TODO: fix coloring of the map
    map.updateChoropleth(plotData);
}
