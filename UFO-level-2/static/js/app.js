// from data.js
var tableData = data;

// Select the table body
var tbody = d3.select("tbody")

// Select filter variables
var dateSelect = d3.select("#datetime")
var citySelect = d3.select("#cityname") 
var stateSelect = d3.select("#statecode") 
var countrySelect = d3.select("#countrycode") 
var shapeSelect = d3.select("#ufoshape")

// Select the Filter Button
var filterButton = d3.select("#filter-btn")

// Select the Form
var formDate = d3.select("#form")

// Create event handlers for clicking the button or pressing the enter key
filterButton.on("click", runEnter);
formDate.on("submit",runEnter);


// CREATING FUNCTION TO POPULATE TABLE DATA
//=====================================================================================
// Function to populate the table with data from data.js
function populateTable(tdata) {
    
    // Clear any table data if it exists
    tbody.html("")

    // Append each piece of data to it's own row and then cell
    tdata.forEach(function(tableRow) {
        // console.log(ufoReport);
        var row = tbody.append("tr");
        Object.entries(tableRow).forEach(function([key, value]) {
        //   console.log(key, value);
          var cell = row.append("td");
          cell.text(value);
        });
    });
}

// Calling the function above to populate the data the first time (all data points)
populateTable(tableData)


//=====================================================================================
// CREATING FUNCTIONS TO POPULATE DROPDOWN SELECT LISTS
//=====================================================================================


// CREATING FUNCTIONs TO POPULATE DROP DOWN ===============================================================================================================================

// Retrieve all keys for each filter from the tableData
var dates = tableData.map(function(tableDates){
    return tableDates.datetime
});

var cities = tableData.map(function(tableCities){
    return tableCities.city
});

var states = tableData.map(function(tableStates){
    return tableStates.state
});

var countries = tableData.map(function(tableCountries){
    return tableCountries.country
});

var shapes = tableData.map(function(tableShapes){
    return tableShapes.shape
});


// Get the unique keys, and append to a seperate object to call upon later
function uniqueData(dataList) {

    // An object to hold word frequency
    var dataObject = {};
  
    // Iterate through the array
    for (var i = 0; i < dataList.length; i++) {
      var currentElement = dataList[i];
      // If the date has been seen before in the list then increase the count
      if (currentElement in dataList) {
        dataObject[currentElement] += 1;
      }
      else {
        // Set the counter at 1
        dataObject[currentElement] = 1;
      }
    }
    return dataObject;
}
 
// Call functions for each unique dataset which are objects with unique keys and values
var uniqueDates = uniqueData(dates) 
var uniqueCities = uniqueData(cities) 
var uniqueStates = uniqueData(states)
var uniqueCountries = uniqueData(countries)
var uniqueShapes = uniqueData(shapes)

// Creating function to add an Option tag inside the Select tag
// then adding an attribute to each Option tag called "value", and giving the value of that attribute
// the key of uniqueDates above, which is the date itself
// lastly providing the text visible in the dropdown as the key (which is the date iteself)
function populateDateOption(objectData,selectLocation) {
    
    Object.entries(objectData).forEach(function([key,value]){
        selectLocation.append("option")
        .attr("value",key)
        .text(key)
    });
}

// Calling the function to append option tag, value attribute, value of attribute, and value of text in the HTML
populateDateOption(uniqueDates,dateSelect)
populateDateOption(uniqueCities,citySelect)
populateDateOption(uniqueStates,stateSelect)
populateDateOption(uniqueCountries,countrySelect)
populateDateOption(uniqueShapes,shapeSelect)



// CREATING FUNCTION TO POPULATE DROPDOWN SELECT LISTS FUNCTION TO POPULATE THE TABLE DATA WHEN CLICKING
//=====================================================================================

// Create the function to run for all filters
function runEnter() {

    // Create a universal table in the function, allow it to house all the data first
    var filteredTable = tableData

    // Prevent the page from refreshing
    d3.event.preventDefault();
  
    // Get the value property of the input element
    var inputDateValue = dateSelect.property("value");
    var inputCityValue = citySelect.property("value");
    var inputStateValue = stateSelect.property("value");
    var inputCountryValue = countrySelect.property("value");
    var inputShapeValue = shapeSelect.property("value");

    
    // Create functions which output "True" or "False" based on the inputValue above
    function exactDate(tableData) {
        return tableData.datetime == inputDateValue;
    }
    function exactCity(tableData) {
        return tableData.city == inputCityValue;
    }
    function exactState(tableData) {
        return tableData.state == inputStateValue;
    }
    function exactCountry(tableData) {
        return tableData.country == inputCountryValue;
    }
    function exactShape(tableData) {
        return tableData.shape == inputShapeValue;
    }
    

    // If the data above has a value, the length of it will be >0, otherwise it will be 0.
    // If 0, don't filter the universal table, if >0, then apply filter to the universal table
    // Apply the filter on the last filtered table
    if (inputDateValue.length > 0){
        filteredTable = filteredTable.filter(exactDate)
    }
    if (inputCityValue.length > 0){
        filteredTable = filteredTable.filter(exactCity)
    }
    if (inputStateValue.length > 0){
        filteredTable = filteredTable.filter(exactState)
    }
    if (inputCountryValue.length > 0){
        filteredTable = filteredTable.filter(exactCountry)
    }
    if (inputShapeValue.length > 0){
        filteredTable = filteredTable.filter(exactShape)
    }

    // Get the finalized filteredTable data, and run it through the populateTable function at the beginning
    populateTable(filteredTable)
    
}









