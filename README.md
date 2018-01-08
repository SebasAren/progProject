# Programmeerproject
Name: Sebastiaan Arendsen

## Problem statement
I want to visualize the importance of internet access to the welfare of a country. In these modern times internet access is vital to the productivity in a country and their access to information. Welfare of a country can be quantized in different ways. I'd like to find out what the main factors influenced by the quality of internet connections in the EU. I hope governments would be interested in this information so as to supply better internet (when I'm there on holiday).

## Solution
The way I want to provide this information is by making a datamap of the EU which is interactive as shown in the figure in docs/sketch.png.

### Main features
* A map of the EU which can be obtained from http://datamaps.github.io(MVP)
* A slider with which to change the year shown on the map.
* Map should be colored based on the average internet connection in that country in that year.(MVP)
* When country is clicked, data of that country should be added to the plots below.(MVP: Version in which it isn't added but just changed to this country)
* Plots should be able to change between different datasets (e.g. GDP, Happy Planet Index, other welfare indexes) (MVP)

## Prerequisites
### Data sources
* [Internet access data](http://appsso.eurostat.ec.europa.eu/nui/show.do?dataset=isoc_ci_it_en2&lang=en)
** This data will need to be filtered and processed to be useable.
* [GDP](https://data.worldbank.org/indicator/NY.GDP.MKTP.CD)
** One example of economic data. Is easily useable.
* [Happy Planet Index](http://happyplanetindex.org/countries)

### External components
* jQuery: for manipulation of the DOM.
* d3-tip: easy way to make a tooltip in D3.

### Similar visualization
A similiar visualization is Happy Planet Index. It has a map in which the colors represent a quantity of the measured index. Clicking on the country gives more information about the country.

I'm not planning to implement my visualization in the same way. I'm hoping to make it a bit simpler to implement and a bit less visually *smooth*. 
