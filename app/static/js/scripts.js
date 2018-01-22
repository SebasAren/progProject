/* scripts.js
 * Sebastiaan Arendsen
 * 6060072
 *
 * All scripts used in the visualization are defined here.
 */
'use strict';

// list of buttons that need activity
var buttons = ['map', 'left', 'right'];
var countryConverter;
var internetData,
    happyData,
    map;

// https://www.worldatlas.com/aatlas/ctycodes.htm
$.getJSON('data/countryTable.json', function(data) {
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
});


$(function() {    
    // disable 'right-mouse menu' to use right mouse button later
    // document.oncontextmenu = function() { return false; };

    // init the map
    map = new Datamap({
        element: document.getElementById('map'),
        responsive: true,
        geographyConfig: {
            borderColor: '#000000',
            popupTemplate: function(geography, data) {
                return '<div class="hoverinfo">' + geography.properties.name +'<br>' + data.value + ' ';
            }
        },
        fills: {
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
            internetData = data1;
            happyData = data2;
            console.log(happyData);
            console.log(internetData);

            // initial data should show download speed
            addDataToMap('average broadband download');
            initScatterPlot();
            initBarChart();
        });

    // create listeners for all buttons defined in buttons
    $.each(buttons, function(i, button) {
        $('.' + button + '-btn').click(function() {
            controlButtons(button)($(this));
        });
    });

    // triggered on mousedown on country in the datamap
    $('.datamaps-subunit').mousedown(function(event) {

        if (event.button == 2) {
            // TODO: create a tooltip with a link to wikipedia?

        }

        else {
            // control the drag behaviour of the 'map element'
            dragController($(this), event);

            // remove mouseup listener from document to stop double triggers
            $(document).off('mouseup');

            // reapply mouseup listener
            $(document).mouseup(function(event) {

                // get country
                var country = $('.drag-div').html();
                $('.drag-div').remove();
                pickController(country);

                // remove draggable div and handle data transfer

                // remove listener again
                $(document).off('mouseup');
            });
        }
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
            changeDataScatter(input.attr('name'), false);
        }
        if (type == 'right') {
            changeDataScatter(false, input.attr('name'));
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
            'left': (country.pageX - 150) + 'px',
            'top': (country.pageY - 150) + 'px',
        })
        .appendTo($(document.body))
        .html(clicked[0].classList[1])

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
    if ($('.hover-plot').length != 0) {
        if ($('.hover-plot').children()[1].id == 'scatter') {
            addCountryScatter(country);
        }
    }
    $('.hover-plot').removeClass('hover-plot');
}
