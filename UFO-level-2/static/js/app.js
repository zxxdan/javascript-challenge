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
    tdata.forEach(function(ufoReport) {
        // console.log(ufoReport);
        var row = tbody.append("tr");
        Object.entries(ufoReport).forEach(function([key, value]) {
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

// Retrieve all dates from the tableData
var dates = tableData.map(function(tableDates){
    return tableDates.datetime
});

// Get a list of unique dates, and append to a seperate list
function uniqueDate(dates) {

    // An object to hold word frequency
    var dateList = {};
  
    // Iterate through the array
    for (var i = 0; i < dates.length; i++) {
      var currentDate = dates[i];
      // If the date has been seen before in the list then increase the count
      if (currentDate in dateList) {
          dateList[currentDate] += 1;
      }
      else {
        // Set the counter at 1
        dateList[currentDate] = 1;
      }
    }
    return dateList;
}
 
// Call function uniqueDate so we can get a list of objects with unique keys
var uniqueDates = [uniqueDate(dates)] // Have the [] so we can list of object, instead of just an object. Doing so will allow forEach to work below. Since forEach cannot iterate on just an object alone 
console.log(uniqueDates)

// Creating function to add an Option tag inside the Select tag
// then adding an attribute to each Option tag called "value", and giving the value of that attribute
// the key of uniqueDates above, which is the date itself
// lastly providing the text visible in the dropdown as the key (which is the date iteself)
function populateDateOption(tdates) {
    
    tdates.forEach(function(ufoDate){

        Object.entries(ufoDate).forEach(function([key]){
            dateSelect.append("option")
            .attr("value",key)
            .text(key)
        });
    });
}

populateDateOption(uniqueDates)


// CREATING FUNCTION TO POPULATE DROPDOWN SELECT LISTS FUNCTION TO POPULATE THE TABLE DATA WHEN CLICKING
//=====================================================================================

// Create the function to run for both events
function runEnter() {

    // Prevent the page from refreshing
    d3.event.preventDefault();
  
    // Select the input element and get the raw HTML node
    var inputElement = dateSelect;
  
    // Get the value property of the input element
    var inputValue = inputElement.property("value");

    // Create a custom filtering function
    function exactDate(tableData) {
        return tableData.datetime === inputValue;
    }
    
    // filter() uses the custom function as its argument
    var exactDateData = tableData.filter(exactDate);

    // Re-populate the data
    populateTable(exactDateData)
}









