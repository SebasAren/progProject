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
    svgScatter,
    tipScatter;

var scatterHpi = 'hpi';
var scatterInternet = 'average broadband download';

function initScatterPlot() {
    marginScatter = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 40
    };

    tipScatter = d3.tip().attr('class', 'd3-tip').html(function(d){
        return d.ISO;
    })


    widthScatter = $('#scatter').width() - marginScatter.left - marginScatter.right;
    heightScatter = $('#scatter').height() - marginScatter.top - marginScatter.bottom;

    xScatter = d3.scale.linear()
        .range([0, widthScatter]);

    yScatter = d3.scale.linear()
        .range([heightScatter, 0]);

    svgScatter = d3.select('#scatter')
        .append('g')
        .attr('transform', 'translate(' + marginScatter.left + ',' + marginScatter.top + ')');
    svgScatter.call(tipScatter);

    countryScatter = ['USA', 'CAN', 'KOR'];

    var data = addScatterData('average broadband download', 'hpi');

    xScatter.domain(d3.extent(data, function(d) {
        return +d.x;
    }));
    yScatter.domain(d3.extent(data, function(d) {
        return +d.y;
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
        })
        .on('mouseover', tipScatter.show)
        .on('mouseout', tipScatter.hide)
        .on('click', function(d) { addCountryScatter(d.ISO, false); });
}

function addScatterData(internetIndex, happyIndex) {
    var data = [];
    for (var i = 0; i < countryScatter.length; i++) {
        data.push({
            'x': +internetData.find(item => item.ISO === countryScatter[i])[internetIndex],
            'y': happyData.find(item => item.ISO === countryScatter[i])[happyIndex],
            'ISO': countryScatter[i]
        });
    }
    return data;
}

function addCountryScatter(country, addData=true) {

    if (countryScatter.includes(String(country)) && addData) return false;
    else if (addData) countryScatter.push(String(country));
    else if (country == false)  1 + 1; 
    else countryScatter.splice(countryScatter.indexOf(String(country)), 1);

    var data = addScatterData(scatterInternet, scatterHpi);
    xScatter.domain(d3.extent(data, function(d) { return +d.x; }));
    yScatter.domain(d3.extent(data, function(d) { return +d.y; }));

    // update data in plot
    var circles = svgScatter.selectAll('circle').data(data);

    // delete the unneeded data
    circles.exit().remove();

    // update existing points to new scale
    circles.attr('cx', function(d) { return xScatter(d.x); })
        .attr('cy', function(d) { return yScatter(d.y); });

    // add new data points
    circles.enter().append('circle')
        .attr('class', 'dot')
        .attr('r', 3.5)
        .attr('cx', function(d) { return xScatter(d.x); })
        .attr('cy', function(d) { return yScatter(d.y); })
        .on('mouseover', tipScatter.show)
        .on('mouseout', tipScatter.hide)
        .on('click', function(d) { addCountryScatter(d.ISO, addData=false); });

    // update x-axis
    svgScatter.select('.x.axis')
        .transition()
        .duration(750)
        .call(d3.svg.axis().scale(xScatter).orient('bottom'));

    // update y-axis
    svgScatter.select('.y.axis')
        .transition()
        .duration(750)
        .call(d3.svg.axis().scale(yScatter).orient('left'));
}

function changeDataScatter(changeInternetData=false, changeHpiData=false) {
    if (changeInternetData) scatterInternet = changeInternetData;
    if (changeHpiData) scatterHpi = changeHpiData;
    addCountryScatter(false, false);
}
