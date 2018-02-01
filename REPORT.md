# Final report

## Short description
This visualization shows the internet speeds around the world in a datamap, multiple parameters can be shown in the map. The individual countries can than be dragged to the other visualizations. 

These other two visualizations are:
* Grouped bar chart with double y-axis, showing a user-selected economic parameter and the selected internet parameter.
* Scatter plot with regression line, showing a Happy Planet Index parameter versus the selected internet parameter.

### Screenshot
![Map](doc/map.png)

## Design
The code is structured in the following way:
* First there is a file with globally defined variables used in the code. This is done this way to keep a better idea of the global namespace.
* The file control.js is the only file which executes code on document load. It initializes all the plots and adds listeners to the buttons. It is also responsible for the drag functionality.
* The other javascript files all control their respective plots.

### Details
#### control.js
* I first create 2 functions to onvert 2-code and 3-code country names.
* On load I create the datamap and configure it to use the colorbrewer colors.
* I load the data using a d3 queue followed by initializing the plots.
* I add listeners to the buttons.
* I add the drag functionality, which is mainly controlled by jQuery listeners and functionality.
    - On mousedown a div is spawned with a country flag in the middle.
    - The div has some special css features which make it always be on top.
    - Besides the div additional listeners are created to control the movement of the div.
    - When the mouse cursor is above a plot it is highlighted
    - On mouseup (dropping the draggable) the highlighted plot is updated with the selected country.
* A simple cleanText function is used all over the code to replace the ugly data indexes with clean descriptive text.

#### map.js
* The update function first transforms the country code to the correct format.
* It replaces the legend with an updated one.
* It creates a new quantized scale and sets the labels based on this scale.
* I change the displayed data to the chosen data.

#### scatter.js
The scatter plot is something I would probably rewrite if I had the time. Its initialization function is doing too much which is also done in the update function. Besides this 'double' work its update function works in a different way than the update function of the bar chart. This leads to inconsistencies in the way the update functions have to be called. 

* The scatter plot is initialized by setting all required parts.
* It also adds the line chart based on a least mean squares formula.
* The addCountryScatter function decides how the data should be updated based on the input it receives.
    - After this decision has been made the plot is updated in the correct fashion.
* changeDataScatter is a function which is called when the user wants to change the data shown in the scatter plot.
    - This function then calls the addCountryScatter function to update the plot.
* leastSquaresequation is a function which produces the regression line formula.

#### bar.js
The bar chart is in my opinion a much better written plot. The initialization function creates only the things it should, the framework in which data can be added and updated.
* initBarChart sets up the bar chart so it can be updated. 
    - It uses 5 different scales
    - Chooses the initially used countries
* updateBarChart actually adds the data to the chart and updates already present data to fit the new scales.
* updateData tries to add all countries to the chart or throws a 'fancy' error message to the user.
    - The function calls valueBarUpdate to find the data it needs.

## Challenges
I found it hard to find a subject to start this exercise. My initial idea was to do something with music, but information about music is hard to find for free. I decided to change and this made it a bit hard to do within a day.

Other challenges I had during the project was getting the regression line correct. I had to resort to copying someone else's solution to the formula. This process wasn't helped by the weird way the scatter plot is updated. 

Initially I was afraid the drag functionallity would take a lot of my time, but this was relatively easy to fix. jQuery was really easy to use and made me enjoy making the functionallty.

The datamap was a relatively frustrating library to use. It had some fairly weird ways to do stuff and took a lot of my time.

I changed the idea I had about the multi-line graph to a scatter plot with a regression line. This was mainly due to not being able to find data over a time period, which is what a multi-line graph would need. I'm pretty happy with the way this turned out.
