/* scripts.js
 * Sebastiaan Arendsen
 * 6060072
 *
 * All scripts used in the visualization are defined here.
 */

// list of buttons that need activity
var buttons = ['map', 'left', 'right'];

// on DOM load this will be executed
$(function() {

    // init the map
    var map = new Datamap({
        element: document.getElementById('map'),
        responsive: true
    });

    // create listeners for all buttons defined in buttons
    $.each(buttons, function(i, button) {
        $('.' + button + '-btn').click(function() {
            controlButtons(button)($(this));
        });
    });

    $('.datamaps-subunit').mousedown(function(event) {
        dragController($(this), event);
        $(document).off('mouseup');
        $(document).mouseup(function(event) {
            var country = $('.drag-div').html();
            $('.drag-div').remove();
            pickController(country , event);
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
            'left': (country.pageX) + 'px',
            'top': (country.pageY) + 'px',
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
function pickController(country, position) {
    console.log($('.hover-plot'));
    $('.hover-plot').removeClass('hover-plot');
}
