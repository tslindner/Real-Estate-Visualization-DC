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

function getData(filterURLData) {
  console.log(filterURLData);
  if (filterURLData === "reset") {
    clearFilters();
  }
  else {createList(`/zoom?\
high_beds=${filterURLData.bed[1]}\
&low_beds=${filterURLData.bed[0]}\
&high_price=${filterURLData.price[1]}\
&low_price=${filterURLData.price[0]}\
&high_baths=${filterURLData.bath[1]}\
&low_baths=${filterURLData.bath[0]}\
&high_sqft=${filterURLData.sqft[1]}\
&low_sqft=${filterURLData.sqft[0]}\
&high_year=${filterURLData.year[1]}\
&low_year=${filterURLData.year[0]}\
&high_moneySqft=${filterURLData.moneySqft[1]}\
&low_moneySqft=${filterURLData.moneySqft[0]}\
&high_hoa=${filterURLData.hoa[1]}\
&low_hoa=${filterURLData.hoa[0]}\
`)};
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




/* Set the width of the side navigation to 250px */
function openNav() {
  document.getElementById("mySidenav").style.width = "500px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}








var bedSlider = document.getElementById("bedSlider");
var bathSlider = document.getElementById("bathSlider");
var priceSlider = document.getElementById("priceSlider");
var sqftSlider = document.getElementById("sqftSlider");
var yearSlider = document.getElementById("yearSlider");
var moneySqftSlider = document.getElementById("moneySqftSlider");
var hoaSlider = document.getElementById("hoaSlider");


createDoubleFilter(bedSlider,0, 10, 0, 10)
createDoubleFilter(bathSlider, 0, 10, 0, 10)
createDoubleFilter(priceSlider, 0, 10000000, 0, 10000000)
createDoubleFilter(sqftSlider, 0, 3000, 0, 3000)
createDoubleFilter(yearSlider, 1900, 2018, 1900, 2018)
createDoubleFilter(moneySqftSlider, 0, 1000, 0, 1000)
createDoubleFilter(hoaSlider, 0, 1000, 0, 1000)


function createDoubleFilter(fieldSlider, low, high, min, max) {
  noUiSlider.create(fieldSlider, {
    animate: true,
    animationDuration: 300,
    start: [low, high],
    step: 1,
    connect: true,
    tooltips: [ wNumb({ decimals: 0 }), wNumb({ decimals: 0 }) ],
    range: {
      'min': min,
      'max': max
    }
  });
};

function createSingleFilter(fieldSlider, start, min, max) {
noUiSlider.create(fieldSlider, {
  animate: true,
  animationDuration: 300,
  start: [ start ],
  step: 1,
  connect: [ true, false],
  tooltips: [ wNumb({ decimals: 0 }) ],
  range: {
    'min': min,
    'max': max
  }
});
};

document.getElementById("resetButton").addEventListener('click', function(){
  bedSlider.noUiSlider.set([0, 10]);
  bathSlider.noUiSlider.set([0, 10]);
	priceSlider.noUiSlider.set([0, 10000000]);
	sqftSlider.noUiSlider.set([0, 3000]);
	yearSlider.noUiSlider.set([1900, 2018]);
	moneySqftSlider.noUiSlider.set([0, 1000]);
	hoaSlider.noUiSlider.set([0, 1000]);
  
});

function fillLists(maybeList) {
  if (maybeList.constructor === Array) {
    return maybeList
  } else {
    var a = [maybeList, maybeList];
    return a;
  };
};

document.getElementById("filterButton").addEventListener('click', function(){
  var bedFilterList = bedSlider.noUiSlider.get();
  var bathFilterList = bathSlider.noUiSlider.get();
  var priceFilterList = priceSlider.noUiSlider.get();
  var sqftFilterList = sqftSlider.noUiSlider.get();
  var yearFilterList = yearSlider.noUiSlider.get();
  var moneySqftFilterList = moneySqftSlider.noUiSlider.get();
  var hoaFilterList = hoaSlider.noUiSlider.get();

  var bedFilterList2 = fillLists(bedFilterList)
  var bathFilterList2 = fillLists(bathFilterList)
  var priceFilterList2 = fillLists(priceFilterList)
  var sqftFilterList2 = fillLists(sqftFilterList)
  var yearFilterList2 = fillLists(yearFilterList)
  var moneySqftFilterList2 = fillLists(moneySqftFilterList)
  var hoaFilterList2 = fillLists(hoaFilterList)

  var filterList = {
    bed: bedFilterList2,
    bath: bathFilterList2,
    price: priceFilterList2,
    sqft: sqftFilterList2,
    year: yearFilterList2,
    moneySqft: moneySqftFilterList2,
    hoa: hoaFilterList2

  };

  getData(filterList)
});






document.getElementById("bedToSingle").addEventListener("click", function(){
  bedSlider.noUiSlider.destroy();
  createSingleFilter(bedSlider, 0, 0, 10);
});

document.getElementById("bedToDouble").addEventListener("click", function(){
  bedSlider.noUiSlider.destroy();
  createDoubleFilter(bedSlider, 0, 10, 0, 10);
});


document.getElementById("bathToSingle").addEventListener("click", function(){
  bathSlider.noUiSlider.destroy();
  createSingleFilter(bathSlider, 0, 0, 10);
});

document.getElementById("bathToDouble").addEventListener("click", function(){
  bathSlider.noUiSlider.destroy();
  createDoubleFilter(bathSlider, 0, 10, 0, 10);
});


document.getElementById("priceToSingle").addEventListener("click", function(){
  priceSlider.noUiSlider.destroy();
  createSingleFilter(priceSlider, 0, 0, 10000000);
});

document.getElementById("priceToDouble").addEventListener("click", function(){
  priceSlider.noUiSlider.destroy();
  createDoubleFilter(priceSlider, 0, 10000000, 0, 10000000);
});


document.getElementById("sqftToSingle").addEventListener("click", function(){
  sqftSlider.noUiSlider.destroy();
  createSingleFilter(sqftSlider, 0, 0, 3000);
});

document.getElementById("sqftToDouble").addEventListener("click", function(){
  sqftSlider.noUiSlider.destroy();
  createDoubleFilter(sqftSlider, 0, 3000, 0, 3000);
});


document.getElementById("yearToSingle").addEventListener("click", function(){
  yearSlider.noUiSlider.destroy();
  createSingleFilter(yearSlider, 0, 1900, 2018);
});

document.getElementById("yearToDouble").addEventListener("click", function(){
  yearSlider.noUiSlider.destroy();
  createDoubleFilter(yearSlider, 1900, 2018, 1900, 2018);
});


document.getElementById("moneySqftToSingle").addEventListener("click", function(){
  moneySqftSlider.noUiSlider.destroy();
  createSingleFilter(moneySqftSlider, 0, 0, 1000);
});

document.getElementById("moneySqftToDouble").addEventListener("click", function(){
  moneySqftSlider.noUiSlider.destroy();
  createDoubleFilter(moneySqftSlider, 0, 1000, 0, 1000);
});


document.getElementById("hoaToSingle").addEventListener("click", function(){
  hoaSlider.noUiSlider.destroy();
  createSingleFilter(hoaSlider, 0, 0, 1000);
});

document.getElementById("hoaToDouble").addEventListener("click", function(){
  hoaSlider.noUiSlider.destroy();
  createDoubleFilter(hoaSlider, 0, 1000, 0, 1000);
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
  