

// Create a map object
var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
  });
  
  // Add a tile layer
  L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1Ijoia2pnMzEwIiwiYSI6ImNpdGRjbWhxdjAwNG0yb3A5b21jOXluZTUifQ." +
    "T6YbdDixkOBWH_k9GbS8JQ"
  ).addTo(myMap);

  for (var i = 0; i < cities.length; i++) {
    var city = cities[i];
    L.marker(city.location)
      .bindPopup("<h1>" + city.name + "</h1> <hr> <h3>Population " + city.population + "</h3>")
      .addTo(myMap);
  }
  