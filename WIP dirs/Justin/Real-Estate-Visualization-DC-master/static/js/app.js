



/* data route */
function testPlotly(name) {
    //var url2 = '/metadata/' + name;
    var url3 = '/zipCode/'  + name;
    console.log(url3);


    Plotly.d3.json(url3, function (error, pieData) {

        var labels0 = pieData['Beds']

        var values0 = pieData['Number']

        var data = [{
            values: values0,
            labels: labels0,
            type: "pie"
        }];

        var layout = {
            height: 500,
            width: 700,
            title: "Bed Room Pie Chart",
        };
        Plotly.newPlot("plot1", data, layout);

    });
    // End Pie Plot



}



//part 1
var url = "/names";
function init() {
    Plotly.d3.json(url, function (error, names) {
        //console.log(names[0]);

        var select = Plotly.d3.select('#selDataset')
            .on("change", function () {
                var name = Plotly.d3.select(this).node().value;
                //console.log(name);
                testPlotly(name);
            });
        select.selectAll('option')
            .data(names)
            .enter()
            .append('option')

            .text(d => d)
            .attr("value", function (d) { return d; })
    }


    );

}

init();