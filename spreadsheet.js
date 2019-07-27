var GoogleSpreadsheet = require('google-spreadsheet');

var creds = require('./client_secret.json');

 

// Create a document object using the ID of the spreadsheet - obtained from its URL.

var doc = new GoogleSpreadsheet('1JIsAksQUxAFvwuUdOa_n9LDTulOgnkOQPo2_nMi85uQ');



 

// Authenticate with the Google Spreadsheets API.

doc.useServiceAccountAuth(creds, function (err) {

 

  // Get all of the rows from the spreadsheet.

  doc.getRows(1, function (err, rows) {

const info = rows.forEach((index,item) => {
    console.log(`Candidate name is ${index.name}, and belongs to ${index.city}`)
})
    //console.log(rows[0].name)

  });

});