/* scatter.js
 *
 * Sebastiaan Arendsen
 * Programmeerproject
 */

'use strict';

var xScatter,
    yScatter,
    countryScatter,
    marginScatter,
    widthScatter,
    heightScatter,
    svgScatter;

function initScatterPlot() {
    marginScatter = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 40
    };

    widthScatter = $('#scatter').width() - marginScatter.left - marginScatter.right;
    heightScatter = $('#scatter').height() - marginScatter.top - marginScatter.bottom;

    xScatter = d3.scale.linear()
        .range([0, widthScatter]);

    yScatter = d3.scale.linear()
        .range([heightScatter, 0]);

    svgScatter = d3.select('#scatter')
        .append('g')
        .attr('transform', 'translate(' + marginScatter.left + ',' + marginScatter.top + ')');

    var data = [];
    var countries = ['USA', 'CAN', 'KOR'];

    for (var i = 0; i < countries.length; i++) {
        data.push({
            'x': +internetData.find(item => item.ISO === countries[i])['average broadband download'],
            'y': happyData.find(item => item.ISO === countries[i]).hpi
        });
    }

    xScatter.domain(d3.extent(data, function(d) {
        return d.x;
    }));
    yScatter.domain(d3.extent(data, function(d) {
        return d.y;
    }));

    svgScatter.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + heightScatter + ')')
        .call(d3.svg.axis().scale(xScatter).orient('bottom'));

    svgScatter.append('g')
        .attr('class', 'y axis')
        .call(d3.svg.axis().scale(yScatter).orient('left'));

    svgScatter.selectAll('.dot')
        .data(data)
        .enter().append('circle')
        .attr('class', 'dot')
        .attr('r', 3.5)
        .attr('cx', function(d) {
            return xScatter(d.x);
        })
        .attr('cy', function(d) {
            return yScatter(d.y);
        });
}

function addCountryScatter() {

}

function changeDataScatter() {

}
