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

    // loop over the original dataset to fix the data format and find minMax
    $.each(internetData, function(_, entry) {

        // if first time using the data transform to 3 letter ISO country code
        if (entry.ISO.length < 3) {
            entry.ISO = countryConverter(entry.ISO);
        }
    });

    var scale = setMapScale(dataIndex);

    var mapLegend = {
        legendTitle: dataIndex,
        defaultFillName: 'No data',
        labels: {}
    };

    for (var i = 0; i < 9; i++) {
        var bounds = scale.invertExtent(i);
        mapLegend.labels[i] = String(parseInt(bounds[0])) + '-' + String(parseInt(bounds[1]));
    }

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
    $('.datamaps-legend').remove();
    
    var domainScale = [];
    $.each(internetData, function(_, entry) {
        domainScale.push(entry[dataIndex]);
    }) 

    return d3.scale.quantile()
        .domain(domainScale)
        .range(range);
}
