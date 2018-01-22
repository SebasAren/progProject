/* Sebastiaan Arendsen
 * 6060072
 * Programmeerproject
 *
 * Contains functions to control the grouped bar chart
 */

'use strict';

var x0Bar,
    x1Bar,
    yBar,
    countryBar,
    marginBar,
    widthBar,
    heightBar,
    svgBar,
    tipBar,
    colorBar;

// container for data selections
var barInternet = 'average broadband download';
var barEconomic = ['Nominal GDP', 'average broadband download'];

// initializes the bar chart
function initBarChart() {
    marginBar = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 60
    };

    // initializes the tooltip
    tipBar = d3.tip().attr('class', 'd3-tip text-center').html(function(d) {
        var rv = '<b>Country: </b>' + d.ISO; 
        return rv;
    });

    // determine the size of the plot
    widthBar = $('#bar').width() - marginBar.left - marginBar.right;
    heightBar = $('#bar').height() - marginBar.top - marginBar.bottom;

    // setup first x-scale
    x0Bar = d3.scale.ordinal()
        .rangeRoundBands([0, widthBar], .1);

    // setup second x-scale
    x1Bar = d3.scale.ordinal();

    // setup y scaling
    yBar = d3.scale.linear()
        .range([heightBar, 0]);

    // setup color scaling
    colorBar = d3.scale.ordinal()
        .range(["#ca0020","#f4a582","#d5d5d5","#92c5de","#0571b0"]);

    // setup svg with margins
    svgBar = d3.select('#bar')
        .append('g')
        .attr('transform', 'translate(' + marginBar.left +',' + marginBar.top + ')')
        .call(tipBar);

    // initialize countries for first plot
    countryBar = ['USA', 'CAN', 'CHN', 'NLD'];

    // create x-axis
    svgBar.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + heightBar + ')')
        .call(d3.svg.axis().scale(x0Bar).tickSize(0).orient('bottom'));

    // create y-axis
    svgBar.append('g')
        .attr('class', 'y axis')
        .call(d3.svg.axis().scale(yBar).orient('left'));

    // update the bar chart with the actua data
    updateBarChart();
}

// function to update the bar chart
function updateBarChart() {
    var data = updateData();
    console.log(data);

    // update domain of the goups
    x0Bar.domain(countryBar);

    // update the domain to correspond to each data type
    x1Bar.domain(barEconomic).rangeRoundBands([0, x0Bar.rangeBand()]);

    // update the y scaling to scale to the maximum data
    yBar.domain([0, d3.max(data, function(country) {
        return d3.max(country.values, function(d) {
            return d.value;
        });
    })]);

    // create groups
    var slice = svgBar.selectAll('.slice')
        .data(data)
        .enter().append('g')
        .attr('class', 'slice')
        .attr('transform', function(d) {
            return 'translate(' + x0Bar(d.country) +',0)';
        });

    slice.selectAll('rect')
        .data(function(d) { return d.values; })
    .enter().append('rect')
        .attr('width', x1Bar.rangeBand())
        .attr('x', function(d) { return x1Bar(d.label); })
        .style('fill', function(d) { return colorBar(d.label); })
        .attr('y', function(d) { return yBar(d.value); })
        .attr('height', function(d) { return heightBar - yBar(d.value); });

    d3.select('.x')
        .transition().duration(750)
        .call(d3.svg.axis().scale(x0Bar).orient('bottom'));

    d3.select('.y').transition().duration(750)
        .call(d3.svg.axis().scale(yBar).orient('left'));


}

// internetIndex is same as the one from scatter
function updateData() {
    var data = [];
    for (var i = 0; i < countryBar.length; i++) {
        data.push({
            'country': countryBar[i],
            'values': valueBarUpdate(countryBar[i])
        })
    }
    return data;
}

function valueBarUpdate(currentCountry) {
    var rv = [];
    for (var i = 0; i < barEconomic.length; i++) {
        rv.push({
            'value': +internetData.find(item => item.ISO === currentCountry)[barEconomic[i]],
            'label': barEconomic[i]
        })
    }
    return rv;
}
