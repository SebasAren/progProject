/* map.js
 * Sebastiaan Arendsen
 * 6060072
 * Programmeerproject
 *
 * Contains functions to control the datamap and update it's color.
 */

'use strict';

// this will always show data from the global datasource internetData
function addDataToMap(dataIndex) {

    // datacontainer
    var plotData = {};

    // loop over the original dataset to fix the data format and find minMax
    $.each(internetData, function(_, entry) {

        // if first time using the data transform to 3 letter ISO country code
        if (entry.ISO.length < 3) {
            entry.ISO = countryConverter(entry.ISO);
        }
    });

    /* Remove the old legend. 
     * While this is a bit of a 'hacky way to do it' it seems like datamaps 
     * is actually working pretty smoothly when doing it this way.
     * More fancy 'd3-type' changes caused all kinds of complications, making
     * them not worth my time to fix.
     */
    $('.datamaps-legend').remove();
    // set the new map scale
    var scale = setMapScale(dataIndex);

    // remake the legend
    var mapLegend = {
        legendTitle: cleanText(dataIndex),
        defaultFillName: 'No data',
        labels: {}
    };

    // all data entries will be 9 categories, so again a bit of an 'ugly' fix
    for (var i = 0; i < 9; i++) {

        // this functions gives you the upper and lower bounds of a quantized scale
        var bounds = scale.invertExtent(i);
        mapLegend.labels[i] = String(parseInt(bounds[0])) + '-' + String(parseInt(bounds[1]));
    }

    // prepare the new data to be visualized
    $.each(internetData, function(_, entry) {
        plotData[entry.ISO] = {
            value: entry[dataIndex],
            fillKey: scale(entry[dataIndex])
        }
    });

    // update both map and legend
    map.updateChoropleth(plotData);
    map.legend(mapLegend);
}

var setMapScale = function(dataIndex) {

    // ES6 version of python range()
    var range = [...Array(9).keys()];
    
    var domainScale = [];
    $.each(internetData, function(_, entry) {
        domainScale.push(entry[dataIndex]);
    }) 

    // this will return the actual scale to be used
    return d3.scale.quantile()
        .domain(domainScale)
        .range(range);
}
