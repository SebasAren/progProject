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
