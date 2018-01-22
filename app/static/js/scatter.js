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
    tipScatter,
    lineScatter;

var scatterHpi = 'hpi';
var scatterInternet = 'average broadband download';

function initScatterPlot() {

    // set margins for plot
    marginScatter = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 40
    };

    // initialize tooltip
    tipScatter = d3.tip().attr('class', 'd3-tip text-center').html(function(d) {
        var rv = '<b>Country: </b>' + d.ISO + '<br><b>x: </b>' + d.x + '<br><b>y: </b>' + d.y;
        return rv;
    })

    // set width and height of plot
    widthScatter = $('#scatter').width() - marginScatter.left - marginScatter.right;
    heightScatter = $('#scatter').height() - marginScatter.top - marginScatter.bottom;

    // initialize x-scale
    xScatter = d3.scale.linear()
        .range([0, widthScatter]);

    // initialize y-scale
    yScatter = d3.scale.linear()
        .range([heightScatter, 0]);

    // set up scatter plot
    svgScatter = d3.select('#scatter')
        .append('g')
        .attr('transform', 'translate(' + marginScatter.left + ',' + marginScatter.top + ')');
    svgScatter.call(tipScatter);

    // set initial countries to add to plot
    countryScatter = ['USA', 'KOR', 'AUS', 'BRA', 'NLD'];

    // get initial data
    var data = addScatterData('average broadband download', 'hpi');
    var regressionValues = determineRegression(data);

    // set domain of plot
    xScatter.domain(d3.extent(data, function(d) {
        return +d.x;
    }));
    yScatter.domain(d3.extent(data, function(d) {
        return +d.y;
    }));

    console.log(xScatter.domain()[1]);
    console.log(xScatter.range()[1], xScatter.range()[0]);
    console.log(regressionValues[0], regressionValues[1]);

    // set line graph
    svgScatter.append('line')
        .attr('class', 'line')
        .attr('x1', function() { return xScatter.range()[0]; })
        .attr('y1', function() { return yScatter(xScatter.domain()[0] * regressionValues[0] + regressionValues[1]); })
        .attr('x2', function() { return xScatter.range()[1]; })
        .attr('y2', function() { return yScatter(xScatter.domain()[1] * regressionValues[0] + regressionValues[1]); });

    // set x-axis
    svgScatter.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + heightScatter + ')')
        .call(d3.svg.axis().scale(xScatter).orient('bottom'));

    // set y-axis
    svgScatter.append('g')
        .attr('class', 'y axis')
        .call(d3.svg.axis().scale(yScatter).orient('left'));

    // add dots
    svgScatter.selectAll('.dot')
        .data(data)
        .enter().append('circle')
        .attr('class', 'dot')
        .attr('r', 3.5)

        // set position
        .attr('cx', function(d) {
            return xScatter(d.x);
        })
        .attr('cy', function(d) {
            return yScatter(d.y);
        })

        // add tooltip
        .on('mouseover', tipScatter.show)
        .on('mouseout', tipScatter.hide)

        // remove country on click
        .on('click', function(d) { addCountryScatter(d.ISO, false); });

    // add regression line
    //svgScatter.selectAll('.line')
        //.data(regressionData)
        //.enter().append('line')
        //.attr('class', 'line')
        //.attr('d', lineScatter);
}

function addScatterData(internetIndex, happyIndex) {

    // create data container
    var data = [];
    for (var i = 0; i < countryScatter.length; i++) {

        // add data if it's available, or catch the error and display a friendly message
        try {
            data.push({
                'x': +internetData.find(item => item.ISO === countryScatter[i])[internetIndex],
                'y': happyData.find(item => item.ISO === countryScatter[i])[happyIndex],
                'ISO': countryScatter[i]
            });
        } 
        catch(error) {
            console.log('Country absent in one of the datasets (temp fix)');

            // remove the country from the list
            countryScatter.splice(i, 1);
        }
    }
    return data;
}

function addCountryScatter(country, addData=true) {
    
    // decide what to do when calling this function
    if (countryScatter.includes(String(country)) && addData) return false;
    else if (addData) countryScatter.push(String(country));

    // pass or continue doesn't work
    else if (country == false)  1 + 1;
    else countryScatter.splice(countryScatter.indexOf(String(country)), 1);

    // get data and update domain
    var data = addScatterData(scatterInternet, scatterHpi);
    xScatter.domain(d3.extent(data, function(d) { return +d.x; }));
    yScatter.domain(d3.extent(data, function(d) { return +d.y; }));

    // get regression data
    var regressionData = determineRegression(data);

    // update data in plot
    var circles = svgScatter.selectAll('circle').data(data);
    var line = svgScatter.selectAll('line').data(regressionData);
    console.log(line);

    // delete the unneeded data
    circles.exit().remove();
    line.exit().remove();
    console.log(line);

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

    line.enter().append('path')
        .attr('class', 'line')
        .attr('d', lineScatter);
    
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

// https://dracoblue.net/dev/linear-least-squares-in-javascript/
function determineRegression(data) {

    var sumX = 0,
        sumY = 0,
        sumXY = 0,
        sumXX = 0,
        count = 0;

    var x = 0;
    var y = 0;

    if (data.length === 0) {
        return [];
    }

    for (var v = 0; v < data.length; v++) {
        x = +data[v].x;
        y = +data[v].y;
        sumX += x;
        sumY += y;
        sumXX += x*x;
        sumXY += x*x;
        count++;
    }

    // y = x * m + b
    var m = (count*sumXY - sumX*sumY) / (count * sumXX - sumX*sumX);
    var b = (sumY/count) - (m*sumX) / count;
    return [m, b];
}
