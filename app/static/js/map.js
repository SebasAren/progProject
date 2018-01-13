/* map.js
 * Sebastiaan Arendsen
 * Programmeerproject
 *
 * Contains functions to control the datamap
 */

// this will always show data from the global datasource internetData
function addDataToMap(dataIndex) {
 
    var plotData = {};
    $.each(internetData, function(_, entry) {
        if (entry.ISO.length < 3) {
            entry.ISO = countryConverter(entry.ISO);
        }

        var i = 0;
        var data;
        $.each(entry, function(_, dataPoint) {
            if (i == (dataIndex + 1)) {
                data = dataPoint;
                return false;
            }
            i++;
        });
        plotData[entry.ISO] = {
            value: data
        };
    });

    map.updateChoropleth(plotData);
}
