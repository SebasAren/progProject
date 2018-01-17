# Design
## Data sources
* [GDP and other economic factors](https://data.oecd.org/gdp/gross-domestic-product-gdp.htm)
** This site has a lot of extra statistics which I want to make use of. The above page is just an example
* [Happy planet index](http://happyplanetindex.org/)
* [The inclusive internet index](https://theinclusiveinternet.eiu.com/)
Data sources should be indexed on the country they belong to. All of these datasets are already ordered on the country theey belong to, so this should be fairly easy.

## Technical components
![](doc/diagram.jpg)
The idea is that users first select a variable about internet quality with which the map will be colored. After this they can click (perhaps drag) the country to add it to both plots below the map. (The countries can be dragged to each plot individually)

The first plot will be a grouped bar chart in which each group represents a selected country. Users can select which variables about welfare they want to show in the bar chart (perhaps limited to avoid scaling issues).

The other view will show a user controllable scatter plot with a regression line. This plot will show the user selected internet quality parameter vs the selected happy planet index parameter.

## Code implementation
The idea is to use a sort of MVC (Model-view-controller. The user speaks to a 'controller' (the listeners on the buttons and datamap). These controllers fetch data from the data model to present a view (d3 graphs) to the user.

To make this work the datasets are stored as global variables, so each part of the code can access it. Each button (or dragged country) triggers a data update function, which fetches and processes the data in such a way that it can easily be added to the plot chosen by the user.

After the data has been processed it will be added to the plot using the d3 data update paradigm.

Improvements:
Try to get the various control functions into separate objects from the same class-subclass structures.

## Implementations needed
* Structure in which the selected countries will be stored, so this can be used by all visualizations. 
* Controllers for each visualization
* Extra: way to make the countries draggable from the map to the graphs.

## List of libraries
* [D3-datamaps](http://datamaps.github.io/)
* [D3-tip](https://github.com/Caged/d3-tip)
* [jQuery](https://jquery.com/)
* [Bootstrap](https://getbootstrap.com/)
