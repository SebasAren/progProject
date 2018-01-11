/* scripts.js
 * Sebastiaan Arendsen
 * 6060072
 * 
 * All scripts used in the visualization are defined here.
 */

'use strict';

$(function() {

    // init the map
    var map = new Datamap({
        element: document.getElementById('map'),
        responsive: true
    });
    $('.map-btn').click(function() {
        controlMapButtons($(this));
    });

    $('.left-btn').click(function() {
        controlLeftButtons($(this));
    });
    
    $('.right-btn').click(function() {
        controlRightButtons($(this));
    });

    // add drag functionality to map
    //var drag = d3.drag();
    //d3.selectAll('.datamaps-subunit')
        //.call(drag.on('start', console.log('Yes')));
});

function controlMapButtons(input) {
    console.log(input.html());
    $.each($('.map-btn.btn-success'), function() {
        $(this).attr('class', 'btn map-btn');
    });
    input.attr('class', 'btn-success map-btn'); 
}

function controlLeftButtons(input) {
    console.log(input.html());
    $.each($('.left-btn.btn-success'), function() {
        $(this).attr('class', 'btn left-btn');
    });
    input.attr('class', 'btn-success left-btn'); 
}

function controlRightButtons(input) {
    console.log(input.html());
    $.each($('.right-btn.btn-success'), function() {
        $(this).attr('class', 'btn right-btn');
    });
    input.attr('class', 'btn-success right-btn'); 
}

function updateMap() {

}
