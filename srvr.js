var GoogleSpreadsheet = require('google-spreadsheet');

var creds = require('./client_secret.json');

 

// Create a document object using the ID of the spreadsheet - obtained from its URL.

var doc = new GoogleSpreadsheet('1JIsAksQUxAFvwuUdOa_n9LDTulOgnkOQPo2_nMi85uQ');




 
 
 
 
 let ggf = ''

doc.useServiceAccountAuth(creds, function (err) {

 

    // Get all of the rows from the spreadsheet.
  
    doc.getRows(1, function (err, rows) {
  
  const info = rows.forEach((index,item) => {
    //  console.log(`Candidate name is ${index.name}, and belongs to ${index.city}`)

    
 ggf = ggf + `<h1>Candidate name is ${index.name}, and belongs to ${index.city}</h1>`

     

  })
      //console.log(rows[0].name)
  
    });
  
  });
 
 
 
 
 
 



const express = require('express')
const hbs = require('hbs')
const port = process.env.PORT || 3000
var app = express()

app.set('view engine', 'hbs')
app.use(express.static(__dirname + '/public'))


app.get('/send', function(req, res) {

     var oname = req.query.name
     var ocity = req.query.city



     doc.useServiceAccountAuth(creds, function (err) {

 

      doc.addRow(1, { name: oname, city: ocity }, function(err) {
  
          if(err) {
        
            console.log(err);
        
          }
        
        });
    
    });

  

res.redirect('\open');




})

app.get('/create', function(req, res) {
  //   var oname = req.query.name
  //   var ocity = req.query.city
  // console.log(oname+ocity)
  //res.render('inpt.hbs', {
    //pageTitle: ggf 
   // welcomeMessage: index.city

 // res.sendFile("index.html");
  res.sendFile(__dirname + '/index.html');
  
})


app.get('/', (req,res) => {
    

 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
    
  res.render('home.hbs', {
      pageTitle: ggf 
     // welcomeMessage: index.city
    
 })


})


app.get('/open', (req,res) => {
    

    
  res.render('home.hbs', {
      pageTitle: ggf 
     // welcomeMessage: index.city
    
 })


})


app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})
