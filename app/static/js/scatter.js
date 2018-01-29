/* scatter.js
 *
 * Sebastiaan Arendsen
 * Programmeerproject
 *
 * This file contains all the functions controlling the scatter plot and
 * the regression line. 
 */

'use strict';

function initScatterPlot() {

    // set margins for plot
    marginScatter = {
        top: 20,
        right: 130,
        bottom: 50,
        left: 100,
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
    colorScatter = d3.scale.category20();

    svgScatter = d3.select('#scatter')
        .append('g')
        .attr('transform', 'translate(' + marginScatter.left + ',' + marginScatter.top + ')');
    svgScatter.call(tipScatter);

    // set initial countries to add to plot
    countryScatter = ['USA', 'KOR', 'AUS', 'BRA', 'NLD'];

    // get initial data
    var data = addScatterData('average broadband download', 'hpi');
    var xData = data.map(function(d) { return d.x; });
    var yData = data.map(function(d) { return d.y; });
    var regression = leastSquaresequation(xData, yData);

    // create line function
    lineScatter = d3.svg.line()
        .x(function(d) { return xScatter(d.x); })
        .y(function(d) { return yScatter(regression(d.x)); });

    // set domain of scatter plot
    xScatter.domain(d3.extent(data, function(d) {
        return +d.x;
    })).nice();
    yScatter.domain(d3.extent(data, function(d) {
        return +d.y;
    })).nice();

    // set domain of colors
    colorScatter.domain(countryScatter);

    // create line
    svgScatter.selectAll('path')
        .data([data])
        .enter().append('path')
        .attr('class', 'line')
        .attr('d', lineScatter);

    svgScatter.append('g')
        .attr('class', 'scatter-legend')
        .attr('transform', 'translate(' + (widthScatter + marginScatter.right / 2) + ',0)')
        .call(d3.legend.color().scale(colorScatter).labels(countryScatter));

    svgScatter.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + heightScatter + ')')
        .call(d3.svg.axis().scale(xScatter).orient('bottom').ticks(5));

    // set y-axis
    svgScatter.append('g')
        .attr('class', 'y axis')
        .call(d3.svg.axis().scale(yScatter).orient('left'));

    // add dots
    svgScatter.selectAll('.dot')
        .data(data)
        .enter().append('circle')
        .attr('class', 'dot')
        .style('fill', function(d) {
            return colorScatter(d.ISO);
        })
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

    svgScatter.select('.x')
        .append('text')
        .attr('class', 'scatter-label')
        .text(cleanText(scatterInternet))
        .attr('text-anchor', 'end')
        .attr('transform', 'translate(' + widthScatter + ',' + 40 +')');

    svgScatter.select('.y')
        .append('text')
        .attr('class', 'scatter-label')
        .text(cleanText(scatterHpi))
        .attr('text-anchor', 'end')
        .attr('transform', 'rotate(-90) translate(0,' + (-50) + ')');

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
            $('#alert-box').addClass('alert alert-info')
                .html(countryScatter[i] + ' was not available in this data set');
            window.setTimeout(function() {
                $('#alert-box').removeClass('alert alert-info')
                    .html('');
            }, 3000)

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
    else if (country == false);
    else countryScatter.splice(countryScatter.indexOf(String(country)), 1);

    // get data and update domain
    var data = addScatterData(scatterInternet, scatterHpi);
    xScatter.domain(d3.extent(data, function(d) { return +d.x; }));
    yScatter.domain(d3.extent(data, function(d) { return +d.y; }));
    colorScatter.domain(countryScatter);

    // get regression data
    var xData = data.map(function(d) { return d.x; });
    var yData = data.map(function(d) { return d.y; });
    var regression = leastSquaresequation(xData, yData);

    lineScatter.x(function(d) { return xScatter(d.x); })
        .y(function(d) { return yScatter(regression(d.x)); });

    
    var lineElement = svgScatter.selectAll('path').data([data]);
    lineElement.exit().remove().transition().duration(750);

    lineElement
        .transition().duration(750)
        .attr('d', lineScatter);

    lineElement.enter().append('path')   
        .transition().duration(750)
        .attr('class', 'line')
        .attr('d', lineScatter);

    // update data in plot
    var circles = svgScatter.selectAll('circle').data(data);

    // delete the unneeded data
    circles.exit().remove().transition().duration(750);

    // update existing points to new scale
    circles.transition().duration(750)
        .attr('cx', function(d) { return xScatter(d.x); })
        .attr('cy', function(d) { return yScatter(d.y); })
        .style('fill', function(d) { return colorScatter(d.ISO); });

    // add new data points
    circles.enter().append('circle')
        .transition().duration(750)
        .attr('class', 'dot')
        .attr('r', 3.5)
        .style('fill', function(d) { return colorScatter(d.ISO); })
        .attr('cx', function(d) { return xScatter(d.x); })
        .attr('cy', function(d) { return yScatter(d.y); })

    circles.on('mouseover', tipScatter.show)
        .on('mouseout', tipScatter.hide)
        .on('click', function(d) { addCountryScatter(d.ISO, addData=false); });
    
    // update x-axis
    svgScatter.select('.x.axis')
        .transition()
        .duration(750)
        .call(d3.svg.axis().scale(xScatter).orient('bottom').ticks(5));

    // update y-axis
    svgScatter.select('.y.axis')
        .transition()
        .duration(750)
        .call(d3.svg.axis().scale(yScatter).orient('left'));

    svgScatter.selectAll('.scatter-label').remove();

    svgScatter.select('.x')
        .append('text')
        .attr('class', 'scatter-label')
        .text(cleanText(scatterInternet))
        .attr('text-anchor', 'end')
        .attr('transform', 'translate(' + widthScatter + ',' + 40 +')');

    svgScatter.select('.y')
        .append('text')
        .attr('class', 'scatter-label')
        .text(cleanText(scatterHpi))
        .attr('text-anchor', 'end')
        .attr('transform', 'rotate(-90) translate(0,' + (-50) + ')');
    svgScatter.select('.scatter-legend').call(d3.legend.color().scale(colorScatter).labels(countryScatter));
}

function changeDataScatter(changeInternetData=false, changeHpiData=false) {
    if (changeInternetData) scatterInternet = changeInternetData;
    if (changeHpiData) scatterHpi = changeHpiData;
    addCountryScatter(false, false);
}

// https://bl.ocks.org/nanu146/de5bd30782dfe18fa5efa0d8d299abce
function leastSquaresequation(XaxisData, Yaxisdata) {
    var ReduceAddition = function(prev, cur) { return prev + cur; };
    
    // finding the mean of Xaxis and Yaxis data
    var xBar = XaxisData.reduce(ReduceAddition) * 1.0 / XaxisData.length;
    var yBar = Yaxisdata.reduce(ReduceAddition) * 1.0 / Yaxisdata.length;

    var SquareXX = XaxisData.map(function(d) { return Math.pow(d - xBar, 2); })
        .reduce(ReduceAddition);
    
    var ssYY = Yaxisdata.map(function(d) { return Math.pow(d - yBar, 2); })
        .reduce(ReduceAddition);
      
    var MeanDiffXY = XaxisData.map(function(d, i) { return (d - xBar) * (Yaxisdata[i] - yBar); })
        .reduce(ReduceAddition);
      
    var slope = MeanDiffXY / SquareXX;
    var intercept = yBar - (xBar * slope);
    
// returning regression function
    return function(x){
      return x*slope+intercept;
    }

  }
