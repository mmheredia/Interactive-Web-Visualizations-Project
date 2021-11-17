# Interactive Web Visualizations Challenge

--- 

This project consisted of building an interactive dashboard to explore a [Belly Button Biodiversity dataset](http://robdunnlab.com/projects/belly-button-biodiversity/), which catalogs the microbes that colonize human navels.

Using the D3.js JavaScript library, the sample.json file was read to use to create the following interactive diagrams. 

---

## Demographic Info

A demographic information panel was created by using each key-value from the metadata within the samples.json file. The panel was then manipulated to update each time a new test subject ID number is selected. 

## Horizontal Bar Chart

A horizontal bar chart was created using sample_values, otu_ids, and otu_labels, data read from the samples.json file. The chart consists of a dropdown menu to display the top 10 OTUs found in the selected individual. The chart was then manipulated to update each time a new test subject ID number is selected.

## Bubble Chart

A bubble chart was created using values retrieved from the samples.json file. Of which, included otu_ids for the x values, sample_values for the y values, sample_values for the marker size, otu_ids for the marker colors, and otu_labels for the text values. The chart was then manipulated to update each time a new test subject ID number is selected.

## Guage Chart

A guage chart was created by using the weekly washing frequency of the individual selected. The chart was modified so that the values range from 0 to 9, and update each time a new test subject ID number is selected.

---

The final step in this project, included deploying the app to GitHub pages to ultimately host the belly button biodiversity dashboard website.