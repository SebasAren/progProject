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
    })
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


function dragController(clicked, e) {
    function moveElement(position, element) {
        console.log(element);
        //element.css({
            //'left': position.pageX + 'px',
            //'top': position.pageY + 'px'
        //});
        element.offset({
            left: position.pageX,
            top: position.pageY
        });
    }
    
    console.log(clicked.attr('class'));
    console.log(e.pageY, e.pageX);
    var div = $('<div class="btn"/>')
        .css({
            'left': e.pageX + 'px',
            'top': e.pageY + 'px',
            // basically hardcoding the position and 'depth' of the item
            'position': 'absolute',
            'z-index': '1000'
        })
        .appendTo($('body'))
        .html('Test')
        .mousemove(function(event) {
            moveElement(event, $(this));
        })
        .mouseleave(function(event) {
            moveElement(event, $(this));
        })
        .mouseout(function(event) {
            moveElement(event, $(this));
        })
        .mouseenter(function(event) {
            moveElement(event, $(this));
        });
}
