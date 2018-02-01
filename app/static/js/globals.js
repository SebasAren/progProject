/* globals.js 
 * Sebastiaan Arendsen
 * 6060072
 * Programmeerproject
 *
 * In this file all the globally used variables are defined. This is
 * done so it is easier to keep track of names used and avoid
 * duplicates.
 */

'use strict';

// list of buttons used on the page
var buttons = ['map', 'left', 'right'];

// these will be functions used to convert country codes
var countryConverter,
    reverseCountryConverter;

// data containers
var internetData,
    happyData;

var map;

// variables used in the bar chart
// scales
var x0Bar,
    x1Bar,
    y1Bar,
    y2Bar,
    colorBar;

// information
var countryBar,
    marginBar,
    widthBar,
    heightBar,
    svgBar,
    tipBar;

// bar data selection and initialization
var dataBar = ['Nominal GDP', 'average broadband download'];

// scatter data selection and initialization
var scatterInternet = 'average broadband download',
    scatterHpi = 'hpi';

// variables used in the scatter plot
// scales
var xScatter,
    yScatter,
    colorScatter;

// information
var countryScatter,
    marginScatter,
    widthScatter,
    heightScatter,
    svgScatter,
    tipScatter,
    lineScatter;
