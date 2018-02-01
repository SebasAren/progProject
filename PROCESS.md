# First weekend
Worked a lot on the drag function. Was a lot of work to get it to work. jQuery was very useful. 
Found [Economic data API](https://data.oecd.org/api/sdmx-json-documentation/) which I will probably want to use.

## Monday 15-1-2018
Encountered some issues with the datamap update function. Apparently the data isn't properly updated by the updateChloropeth function. Will need to look into this.

Drag funtion is fully functional. All I need is a a working secondary plot to show this.

## Tuesday 16-1-2018
Finished the technical implementation of the data map and it's interactivity. Buttons can now change the data shown on the map and the colors are distinguishable. Started work on the scatter plot. It is now statically functional, but should be easily extended to accept additional countries and change the data shown.

## Wednesday 17-1-2018
Finished the technical details of the scatter plot. All that's left is to add the regression line to the plot and make the last plot.

I also finally have a good grasp of the enter().append() and exit().remove() internal workings, which should make the last plot a lot easier to make.

## Friday 19-1-2018
Was pretty ill and only worked a bit on adding the regression line to the scatter plot. Still needs some work to get done.

## Monday 22-1-2018
Started working on the grouped bar chart. Got it working with a single y-axis and all data-types. Will need to make another y-axis and make it update with buttons and the drag-functionality. Interactivity should be pretty easy.

## Tuesday 23-1-2018
Today I finished the grouped bar chart with double y-axis. I also changed the type of visualization it has become. It will now show a country as a group with 2 bars, one showing the selected internet quality parameter and the other showing the selected economic parameter.

## Wednesday 24-1-2018
Today I finished the regression line and the last bit of interactivity that needed to be done. All that's left is making the axis labels and plot titles. I am very pleased with the "end result".

## Thursday 25-1-2018
Didn't have any motivation to work on the project today, so decided to take my mind of things a bit and work a bit on the website of my study association, which is a django-based website. This was really fun and educational. At the end of the day I got a good idea for the draggable divs. I will place the flag of the country selected instead of just the ugly name of the country. I want to have this finished before my presentation tomorrow.

## Friday 26-1-2018
Changed the drag function to actually drag something identifying the country. The country flags are looking really cute and actually add something to the overall look of the visualization. After that I prepared my site for the presentation.

## Sunday 28-1-2018
Decided to move all the definitions of global variables to a single file to keep them under better control.

## Monday 29-1-2018
Today I fixed a lot of issues. I created an error handler which notifies the user when there is no data present of the country in a required dataset. I also gave all the plots a useful axis label. Tommorow I will probably create a function which will apply the correct units to the axis labels.

## Tuesday 30-1-2018
I fixed a lot of small bugs and ugly things. Made the axis labels a lot nicer to read.

## Wednesday 31-1-2018
Worked on information display in the form of a modal which is now functional. I also tried to fix the large white space under the map, but this was a lot harder than I anticipated. Apparently the Bootstrap 'container' class which was needed to make the tooltip stick to the correct position doesn't like to be scaled by the user. Will have to rethink how I will fix this.

## Thursday 01-2-2018
Today I worked to fix all the deadline requirements. No coding happened.
