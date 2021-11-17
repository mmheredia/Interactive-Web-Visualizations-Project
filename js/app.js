// Create path to samples.json

const samplesJsonPath = "data/samples.json";

function init() {

    d3.json(samplesJsonPath).then(function(data) {
        
        // Check to be json is loading with data

        console.log(data);

        // Pupolate dropdown menu 

        var dropdownOptions = data['names'];

        // Use getElementById() method to select the id="selDataset" html element

        var sel = document.getElementById('selDataset');

        // Loop through dropdown names and set the "value" available to select in the dropdown menu

        for (var i = 0; i < dropdownOptions.length; i++) {

          var optionToSelect = document.createElement('option');

          optionToSelect.innerHTML = dropdownOptions[i];

          optionToSelect.value = dropdownOptions[i];

          sel.appendChild(optionToSelect);

        };

        var ID1 = data['names'][0];

        for (var i = 0; i < data['samples'].length; i++) {

            if (data['samples'][i]['id'] == ID1) {

                var reference = i

                // Use .reverse() to reflect data in correct order

                var demoPanelBody = d3.select(".panel-body");

                var otuIDs = data['samples'][i]['otu_ids'].reverse();

                var otuLabels = data['samples'][i]['otu_labels'].reverse();

                var sampleValues = data['samples'][i]['sample_values'].reverse();

                // Use Object.entries() to return an array of a given object's [key, value] pairs

                for (const [key, value] of Object.entries(data['metadata'][i])) {

                    // Append [key, value] items into the <p> section of the panel-body

                    demoPanelBody.append("p").text(`${key}: ${value}`)

                    // Check to [key, value] items load

                    console.log(`${key}: ${value}`);

                };
            };
        };

        // Create empty list of OTU labels values to later populate

        var otuIDStrings = [];

        for (var i = 0; i < otuLabels.length; i++) {

            otuIDStrings.push(`OTU: ${otuIDs[i]}`);
            
        };

        // Use if statement to only display the top 10 OTUs found in the individual 

        if (otuIDs.length >= 10) {

            var trace1 = [{

                x: sampleValues.slice(sampleValues.length-10, sampleValues.length),

                y: otuIDStrings.slice(otuIDStrings.length-10, otuIDStrings.length),

                text: otuLabels.slice(otuLabels.length-10, otuLabels.length),

                type: 'bar',

                orientation: 'h',

            }];

        } else {

            var trace1 = [{

                x: sampleValues,

                y: otuIDStrings,

                text: otuLabels,

                type: 'bar',

                orientation: 'h'

            }];

        };

        var layout = {

            title: ""

        };

        // Plot bar graph

        Plotly.newPlot("bar", trace1, layout);

        // Gather data for bubble chart

        var trace2 = [{

            x: otuIDs,

            y: sampleValues,

            text: otuLabels,

            marker: {

                size: sampleValues,

                color: otuIDs

            },

            mode: 'markers'
            
        }];

        // Plot bubble chart

        Plotly.newPlot('bubble', trace2, layout);

        // Gather data for guage chart
        // https://plotly.com/javascript/gauge-charts/

        var trace3 = [{

              domain: { x: [0, 1], y: [0, 1] },

              value: data['metadata'][reference]['wfreq'],

              title: { text: `Belly Button Washing Frequency` },

              type: "indicator",

              mode: "gauge+number",

              gauge: {

                axis: { range: [null, 9], tickwidth: 1, tickcolor: "black" },

                bar: { color: "black"},

                bgcolor: "white",

                borderwidth: 2,

                bordercolor: "black",

                steps: [

                  { range: [0, 1], color: "#FFDAB9" },
                  { range: [1, 2], color: "#FFDAB9" },
                  { range: [2, 3], color: "#F08080" },
                  { range: [3, 4], color: "#F08080" },
                  { range: [4, 5], color: "#CD5C5C" },
                  { range: [5, 6], color: "#A0522D" },
                  { range: [6, 7], color: "#A0522D" },
                  { range: [7, 8], color: "#8B0000" },
                  { range: [8, 9], color: "#8B0000" },
                  
                ],
              }
            }];
          
        // Plot guage chart

          Plotly.newPlot('gauge', trace3);

      });
};

d3.selectAll("#selDataset").on("change", updatePlotly);

// Write function to change dashboard plots when new ID is selected

function updatePlotly() {

    var dropdownMenu = d3.select("#selDataset");

    var idSelection = dropdownMenu.property("value");

    d3.json(samplesJsonPath).then(function(data) {

        for (var i = 0; i < data['samples'].length; i++) {

            if (data['samples'][i]['id'] == idSelection) {

                var reference = i;

                // Use .reverse() to reflect data in correct order

                var demoPanelBody = d3.select(".panel-body");

                var otuIDs = data['samples'][i]['otu_ids'].reverse();

                var otuLabels = data['samples'][i]['otu_labels'].reverse();

                var sampleValues = data['samples'][i]['sample_values'].reverse();

                demoPanelBody.html('')

                // Use Object.entries() to return an array of a given object's [key, value] pairs

                for (const [key, value] of Object.entries(data['metadata'][i])) {

                    // Append [key, value] items into the <p> section of the panel-body

                    demoPanelBody.append("p").text(`${key}: ${value}`)

                    // Check [key, value] items

                    console.log(`${key}: ${value}`);

                };
            };
        };

        // Create empty list of ID labels values to later populate 

        var otuIDStrings = [];

        for (var i =0; i < otuLabels.length; i++) {

            otuIDStrings.push(`OTU: ${otuIDs[i]}`);

        };

        // Use if statement to display now updated 10 OTUs

        if (otuIDs.length >= 10){

            var traceUpdated1 = [{

                x: sampleValues.slice(sampleValues.length-10, sampleValues.length),

                y: otuIDStrings.slice(otuIDStrings.length-10, otuIDStrings.length),

                text: otuLabels.slice(otuLabels.length-10, otuLabels.length),

                type: 'bar',

                orientation: 'h'

            }];

        } else {

            var traceUpdated1 = [{

                x: sampleValues,

                y: otuIDStrings,

                text: otuLabels,

                type: 'bar',

                orientation: 'h'
                
            }];

        };

        var layout = {

            title: ""

        };

        // Plot updated bar graph

        Plotly.newPlot("bar", traceUpdated1, layout);

        // Gather updated data for bubble chart

        var traceUpdated2 = [{

            x: otuIDs,

            y: sampleValues,

            text: otuLabels,

            marker: {

                size: sampleValues,

                color: otuIDs

            },

            mode: 'markers'

        }];

        // Plot updated bubble chart

        Plotly.newPlot('bubble', traceUpdated2, layout);

        // Gather data for guage chart (will stay the same since references metadata not samples)
        // https://plotly.com/javascript/gauge-charts/

        var trace3 = [{

            domain: { x: [0, 1], y: [0, 1] },

            value: data['metadata'][reference]['wfreq'],

            title: { text: `Belly Button Washing Frequency` },

            type: "indicator",

            mode: "gauge+number",

            gauge: {

              axis: { range: [null, 9], tickwidth: 1, tickcolor: "black" },

              bar: { color: "black"},

              bgcolor: "white",

              borderwidth: 2,

              bordercolor: "black",

              steps: [

                { range: [0, 1], color: "#FFDAB9" },
                { range: [1, 2], color: "#FFDAB9" },
                { range: [2, 3], color: "#F08080" },
                { range: [3, 4], color: "#F08080" },
                { range: [4, 5], color: "#CD5C5C" },
                { range: [5, 6], color: "#A0522D" },
                { range: [6, 7], color: "#A0522D" },
                { range: [7, 8], color: "#8B0000" },
                { range: [8, 9], color: "#8B0000" },
                
              ],
            }
          }];
        
        // Plot guage chart

        Plotly.newPlot('gauge', trace3);

    });
};

init()

// done!