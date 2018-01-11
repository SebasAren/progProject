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

    // create listeners fot all buttons defined in buttons
    $.each(buttons, function(i, button) {
        $('.' + button + '-btn').click(function() {
            controlButtons(button)($(this));
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
