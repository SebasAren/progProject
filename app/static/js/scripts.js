$(function() {
    var map = new Datamap({
        element: document.getElementById('map'),
        setProjection: function(element) {
            var projection = d3.geo.equirectangular()
                .center([23.11, 53.58])
                .rotate([4.4, 0])
                .scale(400)
                .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
            var path = d3.geo.path()
                .projection(projection);

            return {path: path, projection: projection};
        }
    });
});

$(function() {
    $('#ex1').slider({
        formatter: function(value) {
            return 'Current value: ' + value;
        }
    });
});
