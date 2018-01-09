# Programmeerproject
Name: Sebastiaan Arendsen

## Problem statement
I want to visualize the importance of internet access to the welfare of a country. In these modern times internet access is vital to the productivity in a country and their access to information. Welfare of a country can be quantized in different ways. I'd like to find out what the main factors influenced by the quality of internet connections in the world. I hope governments would be interested in this information so as to supply better internet (when I'm there on holiday).

## Solution
The way I want to provide this information is by making a datamap of the orld  which is interactive as shown in the figure in docs/sketch.png.

### Main features
* A map of the world which can be obtained from http://datamaps.github.io (MVP)
* A way to select which aspect of internet quality is shown on the map.
* Map should be colored based on the selected quality parameter.(MVP)
* When country is clicked, data of that country should be added to the plots below.(MVP: Version in which it isn't added but just changed to this country)
* Plots should be able to change between different datasets (e.g. GDP, Happy Planet Index, other welfare indexes) (MVP)
* Multiple views should be visible to in which users can place certain user selected datasets (e.g. GDP, HPI,[ISEW](https://en.wikipedia.org/wiki/Index_of_Sustainable_Economic_Welfare) and other factors) (Extra: Give users complete freedom over which data is plotted in which view and possibly even the type of graph needed.)


## Prerequisites
### Data sources
* [Internet access data](http://appsso.eurostat.ec.europa.eu/nui/show.do?dataset=isoc_ci_it_en2&lang=en)
    * This data will need to be filtered and processed to be useable.
* [More internet access data](https://theinclusiveinternet.eiu.com/explore/countries/performance)
    * Really clean and varied data on internet usage and quality in countries.
* [GDP](https://data.worldbank.org/indicator/NY.GDP.MKTP.CD)
    * One example of economic data. Is easily useable.
* [Happy Planet Index](http://happyplanetindex.org/countries)

### External components
* jQuery: for manipulation of the DOM.
* d3-tip: easy way to make a tooltip in D3.
* Bootstrap: for easy customizable layout.

### Similar visualization
A similiar visualization is Happy Planet Index. It has a map in which the colors represent a quantity of the measured index. Clicking on the country gives more information about the country.

I'm not planning to implement my visualization in the same way. I'm hoping to make it a bit simpler to implement and a bit less visually *smooth*. 
