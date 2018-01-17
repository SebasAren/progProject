# HTML
* Don't use any style attributes in your html, keep this in classes and your css files
* Try to keep your indents on the correct level. parent -> sibling - element sibling -> children
* Place some comments to indicate important places in your file

# Javascript
* 'use strict'; above each file, so you are sure when a var will be defined global
* Keep your global namespace as clean as possible.
    - If global namespace is needed use a highly specific name for that variable: eg: widthScatterPlot
* Opening curly braces should be placed on the same line as the statement they are opening.
    - After each opening curly brace should be an extra indent level.
## Callbacks
* Callbacks returning a single value should be one-lined
    - eg: function(d) { return d.x; }
* Longer callbacks should be treated as normal functions.
