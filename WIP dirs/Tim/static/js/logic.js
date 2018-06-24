

// // Create a map object
// var myMap = L.map("map", {
//     center: [37.09, -95.71],
//     zoom: 5
//   });
  
//   // Add a tile layer
//   L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
//     "access_token=pk.eyJ1IjoidHNsaW5kbmVyIiwiYSI6ImNqaWNhdTFzdzFuam4za21sc3ZiMmN5bDEifQ.5Il8Y1QtwyMFWCa1JkDY_Q"
//   ).addTo(myMap);

//   for (var i = 0; i < cities.length; i++) {
//     var city = cities[i];
//     L.marker(city.location)
//       .bindPopup("<h1>" + city.name + "</h1> <hr> <h3>Population " + city.population + "</h3>")
//       .addTo(myMap);
//   }



d3.json('http://localhost:5000/resource', function(error, response) {
  if (error) return console.warn(error);

  var jsonResponse = (response)

  console.log(jsonResponse);

  var address = jsonResponse[0]["ADDRESS"]

    
// This lists each letter down the side of the page, vertically.
  d3.select("#test").selectAll("div")
    .data(jsonResponse)
    .enter()
    .append("div")
    .html(function(d) {
      return `<p> ${d["ADDRESS"]} </p>`;
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
  