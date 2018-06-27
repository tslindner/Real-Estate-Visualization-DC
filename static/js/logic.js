
// MAC USERS, USE THIS API CALL:
// d3.json('http://127.0.0.1:5000/resource', function(error, response) {

// PC USERS, USE THIS API CALL:
d3.json('http://localhost:5000/resource', function(error, response) {

  if (error) return console.warn(error);

  console.log(response);


// Creates scrolling list NOW WITH BUTTONS!
    var scrollListRow = d3.select(".list-group").selectAll("li")
                            .data(response)
                            .enter()
                            .append("li")
                            .classed("list-group-item row", true);

    scrollListRow.append("label")
                    .classed("col-md-1 scroll-list scroll-list-left", true)
                    .attr('for',function(d){ return "a"; })
                    .append("input")
                    .attr("unchecked", true)
                    .attr("type", "checkbox")
                    .attr("id", "c")
                    .on("click", function(d) {  return console.log(d["ADDRESS"]); });

    scrollListRow.append("span")
                  .html(function(d) {
                    return `
                    <a class="col-md-3 scroll-list" href=${d["URL"]}> ${d["ADDRESS"]} </a>
                    <a class="col-md-2 scroll-list" href=${d["URL"]}> ${d["LOCATION"]} </a> 
                    <a class="col-md-2 scroll-list" href=${d["URL"]}> $${d["PRICE"]} </a>
                    <a class="col-md-1 scroll-list" href=${d["URL"]}> ${d["BEDS"]} </a>
                    <a class="col-md-1 scroll-list" href=${d["URL"]}> ${d["BATHS"]} </a>
                    <a class="col-md-2 scroll-list" href=${d["URL"]}> ${d["SQUARE FEET"]} Sq. Ft. </a>`
                  });


});

  // .classed("col-md-4", true)




// // Create a map object
// var myMap = L.map("map", {
//     center: [37.09, -95.71],
//     zoom: 5
//   });
  
//   // Add a tile layer
//   L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
//     "access_token=pk.eyJ1Ijoia2pnMzEwIiwiYSI6ImNpdGRjbWhxdjAwNG0yb3A5b21jOXluZTUifQ." +
//     "T6YbdDixkOBWH_k9GbS8JQ"
//   ).addTo(myMap);

//   for (var i = 0; i < cities.length; i++) {
//     var city = cities[i];
//     L.marker(city.location)
//       .bindPopup("<h1>" + city.name + "</h1> <hr> <h3>Population " + city.population + "</h3>")
//       .addTo(myMap);
//   }
  