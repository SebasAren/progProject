# Programmeerproject
Name: Sebastiaan Arendsen

## Site link
[Github](https://flewtje.github.io/progProject/app/index.html)

## Problem statement
I want to visualize the importance of internet access to the welfare of a country. In these modern times internet access is vital to the productivity in a country and their access to information. Welfare of a country can be quantized in different ways. I'd like to find out what the main factors influenced by the quality of internet connections in the world. I hope governments would be interested in this information so as to supply better internet (when I'm there on holiday).

## Solution
The way I want to provide this information is by making a datamap of the orld  which is interactive as shown in the figure in docs/sketch.png.

### Main features
* A map of the world which can be obtained from http://datamaps.github.io (MVP)
* A way to select which aspect of internet quality is shown on the map.(MVP: Be able to drag countries onto other views.)
* Map should be colored based on the selected quality parameter.(MVP)
* Plots should be able to change between different datasets (e.g. GDP, Happy Planet Index, other welfare indexes) (MVP)
* Multiple views should be visible to in which users can place certain user selected datasets (e.g. GDP, HPI, [ISEW](https://en.wikipedia.org/wiki/Index_of_Sustainable_Economic_Welfare) and other factors) (Extra: Give users complete freedom over which data is plotted in which view and possibly even the type of graph needed.)
* [Scatter plot with regression line?](https://bl.ocks.org/ctufts/298bfe4b11989960eeeecc9394e9f118)

## Prerequisites
### Data sources
* [More internet access data](https://theinclusiveinternet.eiu.com/explore/countries/performance)
    * Really clean and varied data on internet usage and quality in countries.
* [Happy Planet Index](http://happyplanetindex.org/countries)

### External components
* jQuery: for manipulation of the DOM.
* d3-tip: easy way to make a tooltip in D3.
* Bootstrap: for easy customizable layout.

### Similar visualization
A similiar visualization is Happy Planet Index. It has a map in which the colors represent a quantity of the measured index. Clicking on the country gives more information about the country.

I'm not planning to implement my visualization in the same way. I'm hoping to make it a bit simpler to implement and a bit less visually *smooth*. 
