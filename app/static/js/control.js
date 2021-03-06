/* control.js
 * Sebastiaan Arendsen
 * 6060072
 * Programmeerproject
 *
 * In this script file all functions are defined which have no 
 * a global scope and are used to control the flow of the page.
 * It also contains the on load function which will initialize all
 * the visualizations.
 */
'use strict';

// https://www.worldatlas.com/aatlas/ctycodes.htm
$.getJSON('data/countryTable.json', function(data) {

    // function to convert 2-codes to 3 codes
    countryConverter = function(twoCode) {
        var threeCode;
            $.each(data, function(country, nestedValues) {
                if (twoCode == nestedValues.FIELD2) {
                    threeCode = nestedValues.FIELD3;
                    return false;
                }
            });
        if (threeCode) {
            return threeCode;
        }
        else {
            return twoCode;
        }
    };

    // reverse function of countryConverter
    reverseCountryConverter = function(threeCode) {
        var twoCode;
        $.each(data, function(country, nestedValues) {
            if (threeCode == nestedValues.FIELD3) {
                twoCode = nestedValues.FIELD2;
                return false;
            }
        });
        if (twoCode) {
            return twoCode.toLowerCase();
        }
        else {
            return threeCode;
        }
    }
});


/* jQuery version of on window load
 * 
 * Everything in this function will be executed on load of the DOM.
 */
$(function() {    
    // init the map
    map = new Datamap({
        element: document.getElementById('map'),
        // apparently needed to not ruin my page layout
        responsive: true,
        geographyConfig: {
            // make border of countries black for more contrast
            borderColor: '#000000',
            popupTemplate: function(geography, data) {
                return '<div class="hoverinfo">' + geography.properties.name +'<br>' + data.value + ' ';
            }
        },
        fills: {
            // These are fancy green colors defined by colorbrewer
            0: colorbrewer.YlGn['9'][0],
            1: colorbrewer.YlGn['9'][1],
            2: colorbrewer.YlGn['9'][2],  
            3: colorbrewer.YlGn['9'][3], 
            4: colorbrewer.YlGn['9'][4], 
            5: colorbrewer.YlGn['9'][5], 
            6: colorbrewer.YlGn['9'][6], 
            7: colorbrewer.YlGn['9'][7], 
            8: colorbrewer.YlGn['9'][8], 
            defaultFill: 'grey'
        }
    });

    // load data for plots
    queue()
        .defer(d3.json, 'data/inclusive-internet-index-data.json')
        .defer(d3.json, 'data/hpi.json')
        .await(function(error, data1, data2) {
            if (error) throw error;

            // make datasets globally available
            internetData = data1;
            happyData = data2;

            // initial data should show download speed
            addDataToMap('average broadband download');

            // initialize the other two plots
            initScatterPlot();
            initBarChart();
        });

    // create listeners for all buttons defined in buttons
    $.each(buttons, function(_, button) {
        $('.' + button + '-btn').click(function() {
            controlButtons(button)($(this));
        });
    });

    // listener for << button
    $('#left').click(function() {
        countryBar = countryScatter.slice();
        updateBarChart();
    })
    // listener for > button
    $('#right').click(function() {
        for (var i = 0; i < countryBar.length; i++) {
            addCountryScatter(countryBar[i]);
        }
    })

    // triggered on mousedown on country in the datamap
    $('.datamaps-subunit').mousedown(function(event) {

        // control the drag behaviour of the 'map element'
        dragController($(this), event);

        // remove mouseup listener from document to stop double triggers
        $(document).off('mouseup');

        // reapply mouseup listener
        $(document).mouseup(function(event) {

            // get country
            var country = $('.drag-div').attr('name');
            $('.drag-div').remove();
            pickController(country);

            // remove listener again
            $(document).off('mouseup');
        });
    });
}); 

/* Function to control the face of the buttons and how they look.
 * Changes the classes to other bootstrap states.
 */
var controlButtons = function(type) {
    return function(input) {
        $.each($('.' + type + '-btn.btn-success'), function() {
            $(this).attr('class', 'btn ' + type + '-btn');
        });
        if (type == 'map') {
            addDataToMap(input.attr('name'));
            dataBar[1] = input.attr('name')
            changeDataScatter(input.attr('name'), false);
            updateBarChart();
        }
        if (type == 'right') {
            changeDataScatter(false, input.attr('name'));
        }
        if (type == 'left') {
            dataBar[0] = input.attr('name')
            updateBarChart();
        }
        input.attr('class', 'btn btn-success ' + type + '-btn');
    };
};

// function to control the draggable
function dragController(clicked, country) {

    // movement manager of the new element
    function moveElement(position, element) {
        element.offset({
            'left': position.pageX - element[0].clientWidth / 2,
            'top': position.pageY - element[0].clientHeight / 2
        });
    }

    // highlights the plot on which the draggable is placed
    function highlightPlot(position, element) {

        // check wether position of mouse is above plot
        if (position.pageX > element.offset().left &&
        position.pageX < (element.offset().left + element.width())
        && position.pageY > element.offset().top
        && position.pageY < element.offset().top
        + element.height()) {

            // change the style of the plot
            element.addClass('hover-plot');
        }

        // reset if not on plot
        else {
            element.removeClass('hover-plot');
        }
    }

    // create div to be draggable
    $('<div class="drag-div"/>')
        .css({
            // the 150 is half the size of a .drag-div
            'left': (country.pageX - 150) + 'px',
            'top': (country.pageY - 150) + 'px'
        })

        // it should be nested on the body and contain info on the country
        .appendTo($(document.body))
        .html('<img src="static/flags/' + reverseCountryConverter(clicked[0].classList[1]) + '.png"/>')
        .attr('name', clicked[0].classList[1])

        // functions needed to control the new element
        .mousemove(function(event) {

            // move the element
            moveElement(event, $(this));

            // check if mouse is above one of the plots
            highlightPlot(event, $('.left-plot'));
            highlightPlot(event, $('.right-plot'));
        });
}

// triggered when the draggable is droppped
function pickController(country) {
    // check if a plot is actually being hovered over
    if ($('.hover-plot').length != 0) {
        if ($('.hover-plot').children()[1].id == 'scatter') {
            // add the country to the scater plot
            addCountryScatter(country);
        }
        // only other option is the bar chart
        else {
            // check if country is already in plot
            if (countryBar.includes(String(country))) {
                $('.hover-plot').removeClass('hover-plot');
                return false;
            }
            countryBar.push(country);
            updateBarChart();
        }
    }
    // when visualization has been updated remove the hover "class"
    $('.hover-plot').removeClass('hover-plot');
}

// simple function to clean up text
function cleanText(ugly) {
    var convert = {
        'average broadband download': 'Average Broadband Download (kbit/s)',
        'average broadband upload': 'Average Broadband Upload (kbit/s)',
        'average mobile download': 'Average Mobile Download (kbit/s)',
        'ping': 'Latency (ms)',
        'Nominal GDP': 'Total Nominal GDP (Million $)',
        'Level of literacy': 'Level of Literacy (%)',
        'Democracy Index': 'Democracy Index (1-10)',
        'Year of Schooling': 'Year of Schooling (years)',
        'Urbanization rate': 'Urbanization rate (%)',
        'hpi': 'Happy Planet Index',
        'ecological footprint': 'Ecological Footprint',
        'inequality': 'Inequality',
        'life expectancy': 'Life Expectancy (Years)',
        'wellbeing': 'Wellbeing',
    }
    return convert[ugly];
}
