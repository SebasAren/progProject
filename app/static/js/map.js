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

    var min = Infinity,
        max = -Infinity;

    // loop over the original dataset to fix the data format
    $.each(internetData, function(_, entry) {

        // if first time using the data transform to 3 letter ISO country code
        if (entry.ISO.length < 3) {
            entry.ISO = countryConverter(entry.ISO);
        }


        if (+entry[dataIndex] > max) max = +entry[dataIndex];
        else if (+entry[dataIndex] < min) min = +entry[dataIndex];

        //plotData[entry.ISO] = {
            //value: +entry[dataIndex]
        //}
    });

    var quantile = d3.scale.quantize()
        .domain([min, max])
        .range(['0', '1', '2', '3', '4', '5', '6', '7', '8']);

    $.each(internetData, function(_, entry) {
        plotData[entry.ISO] = {
            value: entry[dataIndex],
            fillKey: quantile(entry[dataIndex])
        }
    });
    //$.each(plotData, function(_, entry) {
        //entry['fillKey'] = quantile(entry.value);
    //});
    
    map.updateChoropleth(plotData);
}
