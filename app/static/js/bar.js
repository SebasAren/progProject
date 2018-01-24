/* Sebastiaan Arendsen
 * 6060072
 * Programmeerproject
 *
 * Contains functions to control the grouped bar chart
 */

'use strict';

var x0Bar,
    x1Bar,
    y1Bar,
    y2Bar,
    countryBar,
    marginBar,
    widthBar,
    heightBar,
    svgBar,
    tipBar,
    colorBar;

// container for data selections
var dataBar = ['Nominal GDP', 'average broadband download'];

// initializes the bar chart
function initBarChart() {
    marginBar = {
        top: 20,
        right: 60,
        bottom: 70,
        left: 60
    };

    // initializes the tooltip
    tipBar = d3.tip().attr('class', 'd3-tip text-center').html(function(d) {
        var rv = '<b>' + d.label + ': </b>' + d.value;
        return rv;
    });

    // determine the size of the plot
    widthBar = $('#bar').width() - marginBar.left - marginBar.right;
    heightBar = $('#bar').height() - marginBar.top - marginBar.bottom;

    // setup first x-scale: 0.1 is padding
    x0Bar = d3.scale.ordinal()
        .rangeRoundBands([0, widthBar], .1);

    // setup second x-scale
    x1Bar = d3.scale.ordinal();

    // setup y scaling
    y1Bar = d3.scale.linear()
        .range([heightBar, 0]);

    // second y-scale
    y2Bar = d3.scale.linear()
        .range([heightBar, 0]);

    // setup color scaling
    colorBar = d3.scale.ordinal()
        // TODO: make this a colorbrewer color
        .range(['#ca0020','#f4a582']);

    // setup svg with margins
    svgBar = d3.select('#bar')
        .append('g')
        .attr('transform', 'translate(' + marginBar.left + ',' + marginBar.top + ')')
        .call(tipBar);

    // initialize countries for first plot
    countryBar = ['USA', 'CAN', 'CHN', 'NLD'];

    // create x-axis
    svgBar.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + heightBar + ')')
        .call(d3.svg.axis().scale(x0Bar).tickSize(0).orient('bottom'));

    // create y-axis 1
    svgBar.append('g')
        .attr('class', 'y1 axis')
        .call(d3.svg.axis().scale(y1Bar).orient('left'));

    // idem for second y-axis
    svgBar.append('g')
        .attr('class', 'y2 axis')
        .attr('transform', 'translate(' + widthBar + ',0)')
        .call(d3.svg.axis().scale(y2Bar).orient('right'));

    // create group for future legend
    svgBar.append('g')
        .attr('class', 'bar-legend')
        .attr('transform', 'translate(0,' + (heightBar + (marginBar.bottom / 2)) + ')')

    // update the bar chart with the actual data
    updateBarChart();
}

// function to update the bar chart
function updateBarChart() {

    // get new data based on user selection
    var data = updateData();

    // apparently this was needed to actually stop the colors from breaking
    colorBar = d3.scale.ordinal()
        .range(['#ca0020','#f4a582']);

    // update domain of the groups
    x0Bar.domain(countryBar);

    // update the domain to correspond to each data type
    x1Bar.domain(dataBar).rangeRoundBands([0, x0Bar.rangeBand()]);

    // update the y scaling to scale to the maximum data
    y1Bar.domain([0, d3.max(data, function(country) {
        return d3.max(country.values, function(d) {
            if (d.label == dataBar[0]) {
                return d.value;
            }
        });
    })]);

    // idem for second y-axis
    y2Bar.domain([0, d3.max(data, function(country) {
        return d3.max(country.values, function(d) {
            if (d.label == dataBar[1]) {
                return d.value;
            }
        })
    })]);

    // update legend for the bar chart
    svgBar.select('.bar-legend').call(d3.legend.color().scale(x1Bar).labels(dataBar));

    // update color of the legend
    $.each($('#bar').find('.swatch'), function(i, _) {
        $(this).css('fill', colorBar.range()[i]);
    })

    // create groups
    var slice = svgBar.selectAll('.slice').data(data);

    // remove obsolete data points
    slice.exit().remove().transition().duration(750);

    // update old data points to new scaling
    slice.attr('transform', function(d) {
        return 'translate(' + x0Bar(d.country) + ',0)';
    });

    // add new data points
    slice.enter().append('g')
        .transition().duration(750)
        .attr('class', 'slice')
        .attr('transform', function(d) {
            return 'translate(' + x0Bar(d.country) +',0)';
        });

    // now make the actual bars
    var bars = slice.selectAll('rect')
        .data(function(d) { return d.values; });

    // remove old bars
    bars.exit().remove().transition().duration(750);

    // update remaining bars
    bars.transition().duration(750)
        .attr('width', x1Bar.rangeBand())
        .attr('x', function(d) { return x1Bar(d.label); })
        .style('fill', function(d) { return colorBar(d.label); })
        .attr('y', function(d) {
            // pick correct scaling
            if (d.label == dataBar[0]) {
                return y1Bar(d.value);
            }
            else {
                return y2Bar(d.value);
            }
        })
        .attr('height', function(d) {
            if (d.label == dataBar[0]) {
                return heightBar - y1Bar(d.value);
            }
            else {
                return heightBar - y2Bar(d.value);
            }
        });
    
    // add new databars to the plot
    bars.enter().append('rect')
        .transition().duration(750)
        .attr('width', x1Bar.rangeBand())
        .attr('x', function(d) { return x1Bar(d.label); })
        .style('fill', function(d) { return colorBar(d.label); })
        .attr('y', function(d) {
            if (d.label == dataBar[0]) {
                return y1Bar(d.value);
            }
            else {
                return y2Bar(d.value);
            }
        })
        .attr('height', function(d) {
            if (d.label == dataBar[0]) {
                return heightBar - y1Bar(d.value);
            }
            else {
                return heightBar - y2Bar(d.value);
            }
        });

    // add tooltip and remove functionallity to bars
    bars.on('click', function(d, i) {
            countryBar.splice(countryBar.indexOf(d3.select(this.parentNode).data()[0].country), 1);
            updateBarChart();
        })
        .on('mouseover', tipBar.show)
        .on('mouseout', tipBar.hide);

    // update axes
    svgBar.select('.x')
        .transition().duration(750)
        .call(d3.svg.axis().scale(x0Bar).orient('bottom'));

    svgBar.select('.y1').transition().duration(750)
        .call(d3.svg.axis().scale(y1Bar).orient('left'));

    svgBar.select('.y2').transition().duration(750)
        .call(d3.svg.axis().scale(y2Bar).orient('right'));
}

function updateData() {
    var data = [];
    for (var i = 0; i < countryBar.length; i++) {
        try {
            data.push({
                'country': countryBar[i],
                'values': valueBarUpdate(countryBar[i])
            })
        }
        catch(error) {
            console.log('works');
            countryBar.splice(i, 1);
        }
    }
    return data;
}

function valueBarUpdate(currentCountry) {
    var rv = [];
    for (var i = 0; i < dataBar.length; i++) {
        rv.push({
            'value': +internetData.find(item => item.ISO === currentCountry)[dataBar[i]],
            'label': dataBar[i]
        })
    }
    return rv;
}
