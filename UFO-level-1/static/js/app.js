// from data.js
var tableData = data;

// Select the table body
var tbody = d3.select("tbody")

// Select the Filter Button
var filterButton = d3.select("#filter-btn")

// Select the Form
var formDate = d3.select("#form")

// Create event handlers for clicking the button or pressing the enter key
filterButton.on("click", runEnter);
formDate.on("submit",runEnter);

// Function to populate the data from data.js
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

// Create the function to run for both events
function runEnter() {

    // Prevent the page from refreshing
    d3.event.preventDefault();
  
    // Select the input element and get the raw HTML node
    var inputElement = d3.select("#datetime");
  
    // Get the value property of the input element
    var inputValue = inputElement.property("value");

    // Create a custom filtering function
    function exactDate(tableData) {
        return tableData.datetime === inputValue;
    }
    
    // filter() uses the custom function as its argument
    var exactDateData = tableData.filter(exactDate);
    

    // Re-populate the data
    if (inputValue.length > 0){
        populateTable(exactDateData)
    }
}









