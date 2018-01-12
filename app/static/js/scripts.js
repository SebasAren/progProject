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
        $(document.body).mouseup(function(event) {
            $('.drag-div').remove();
            pickController($(this), event);
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
            element.css({
                'outline': '#00FF00 dotted thick'
            });
        }

        // reset if not on plot
        else {
            element.css({
                'outline': 'none' 
            });
        }
    }
    
    // create div to be draggable
    $('<div class="drag-div"/>')
        .css({
            'left': (country.pageX) + 'px',
            'top': (country.pageY) + 'px',
        })
        .appendTo($('body'))
        .html('Test')

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
function pickController(clicked, country) {
    return undefined;
}
