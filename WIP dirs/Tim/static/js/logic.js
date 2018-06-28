function createList (jsonUrl) {

  d3.json(`${jsonUrl}`, function(error, response) {

    if (error) return console.warn(error);

    console.log(response);

    d3.select(".list-group").selectAll("li").remove()

  // Creates scrolling list NOW WITH BUTTONS!
      var scrollListRow = d3.select(".list-group").selectAll("li")
                            .data(response, function(d) { return d["id"];})
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
                      .on("click", function(d) {  return console.log(d["address"]); });

      scrollListRow.append("span")
                    .html(function(d) {
                      return `
                      <a class="col-md-3 scroll-list" href="/zoom?id=${d["id"]}"> ${d["address"]} </a>
                      <a class="col-md-2 scroll-list" href="/zoom?id=${d["id"]}"> ${d["location"]} </a> 
                      <a class="col-md-2 scroll-list" href="/zoom?id=${d["id"]}"> $${d["price"]} </a>
                      <a class="col-md-1 scroll-list" href="/zoom?id=${d["id"]}"> ${d["beds"]} </a>
                      <a class="col-md-1 scroll-list" href="/zoom?id=${d["id"]}"> ${d["baths"]} </a>
                      <a class="col-md-2 scroll-list" href="/zoom?id=${d["id"]}"> ${d["sq_ft"]} Sq. Ft. </a>`
                    });

  });

};

function getData(numBeds) {
  console.log(numBeds);
  if (numBeds === "reset") {
    clearFilters();
  }
  else {createList(`/zoom?high_beds=${numBeds}&low_beds=${numBeds}`)};
  // d3.json(`/zoom?high_beds=${numBeds}&low_beds=${numBeds}`, function(error, data) {
  //     console.log("newdata", data);
  // });
};

function clearFilters() {
  createList("/resource")
}


document.body.onload = function() {
  getData("reset");
};



var slider = document.getElementById("slider");

noUiSlider.create(slider, {
	start: [20, 80],
	connect: true,
	range: {
		'min': 0,
		'max': 100
	}
});




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
  