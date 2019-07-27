// const name = 'd'
// const city = 'd'

// const theData = document.querySelector('#infor')
// theData.addEventListener('submit',(e) => {
// e.preventDefault()
// //console.log(e.target.elements.name.value)
// name = e.target.elements.name.value
// city = e.target.elements.city.value
// })


var GoogleSpreadsheet = require('google-spreadsheet');

var creds = require('./client_secret.json');

 



var doc = new GoogleSpreadsheet('1JIsAksQUxAFvwuUdOa_n9LDTulOgnkOQPo2_nMi85uQ');





 

  doc.useServiceAccountAuth(creds, function (err) {

 

    doc.addRow(1, { name: name, city: city }, function(err) {

        if(err) {
      
          console.log(err);
      
        }
      
      });
  
  });


