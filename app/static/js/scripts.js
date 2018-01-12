/* scripts.js
 * Sebastiaan Arendsen
 * 6060072
 *
 * All scripts used in the visualization are defined here.
 */

// list of buttons that need activity
var buttons = ['map', 'left', 'right'];

// on DOM load this will be executed (jQuery magic)
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

    $('.datamaps-subunit').mousedown(function(e) {
        dragController($(this), e);
        $(document.body).mouseup(function(e) {
            pickController($(this), e);
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

function dragController(clicked, country) {

    // movement manager of the new element
    function moveElement(position, element) {
        element.offset({
            'left': position.pageX - element[0].clientWidth / 2,
            'top': position.pageY - element[0].clientHeight / 2
        });
    }
    function highlightPlot(position, element) {
        if (position.pageX > element.offset().left &&
        position.pageX < (element.offset().left + element.width())
        && position.pageY > element.offset().top
        && position.pageY < element.offset().top
        + element.height()) {
            element.css({
                'outline': '#00FF00 dotted thick'
            });
        }
        else {
            element.css({
                'outline': 'none' 
            });
        }
    }
    console.log(country);
    
    var div = $('<div class="drag-div"/>')
        .css({
            'left': (country.pageX) + 'px',
            'top': (country.pageY) + 'px',
        })
        .appendTo($('body'))
        .html('Test')
        // functions needed to control the new element
        .mousemove(function(event) {
            moveElement(event, $(this));
            var leftElement = $('.left-plot');
            var rightElement = $('.right-plot');
            highlightPlot(event, leftElement);
            highlightPlot(event, rightElement);
        })
        .mouseleave(function(event) {
            moveElement(event, $(this));
        })
        .mouseout(function(event) {
            moveElement(event, $(this));
        });
}

function pickController(clicked, country) {
    console.log('trigger');
    $('.drag-div').remove();
}
