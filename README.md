# GoogleSpreadSheetNodeJS
This is a simple project that makes use of google spreadsheet API to create and read stuff for the most part. I have used nodejs,expressjs for rendering requests throughout the application. You can test it live at 
https://googlespreadsheetnodejs.herokuapp.com/


#GOOGLE SHEET [TASK 1]
First, go to Google API console and there log in with your account and then click on the project name 

![1](https://user-images.githubusercontent.com/20107730/62009056-5dd5df00-b178-11e9-84df-5e69c0dc75f0.JPG)

Then click on new project > 
Give project name, select organization, click on create and then click on enable API and services 
![2](https://user-images.githubusercontent.com/20107730/62009065-7e9e3480-b178-11e9-93ba-8c448438e80a.JPG)
Then search google sheet
![3](https://user-images.githubusercontent.com/20107730/62009072-91b10480-b178-11e9-89d0-ece6fb0d7c06.JPG)
 then click on it and then click enable and then  click create credential
![4](https://user-images.githubusercontent.com/20107730/62009075-9ecdf380-b178-11e9-8d5c-4fc98927032c.JPG)
And provide values as shown in the image and then click what credential do I need?     
Then you provide values as shown in the image above
![5](https://user-images.githubusercontent.com/20107730/62009082-ae4d3c80-b178-11e9-85df-e14b35ef2ee2.JPG) 
Click continue and then you will have the JSON file, download it and save it in the root of your project and rename as client-secret.json
Goto to google sheet website and open it and then click blank, then change its name from untitled to sheet1 and then click the share button and there provide the client-email that you got in a client-secret.json file so that when you edit it will allow this client email
![6](https://user-images.githubusercontent.com/20107730/62009089-b9a06800-b178-11e9-9015-98fb289e9632.JPG)
, click send.
Now, give two columns as name and country[!7
![7](https://user-images.githubusercontent.com/20107730/62009095-c9b84780-b178-11e9-8879-34f2f5624688.JPG)
Now you work of google sheet is over.


#NODEJS TASK 2
Cd into your document root folder

```bash
	npm init
```

This command will generate the package.json for you, it will ask you for some details which you can fill as per your requirement.
Now we will install libraries
We are using express, google spreadsheet, handlebars

     ```bash
	npm install express --save
	npm install googleapis@39  --save
	npm i google-spreadsheet
	npm install hbs
	```

now we are using –save extension as it will add this dependency in package.json
now we will create two folders where the public folder will store our local javascript file that will work with DOM elements and in views, we will store our handlebar file since we are using the express framework.
Now, we will create a handlebar file named as home.hbs in public folder



```python
<!DOCTYPE html>
<html>
    <body>
    {{{pageTitle}}}
       <button id='create'>CREATE</button>
       <script>
           const TheId = document.querySelector('#create')
           TheId.addEventListener('click', (e) => {
               e.preventDefault()
                location.assign('\create')
           })

       </script>
    </body>
</html>
```











Now we will create index.html file that would deal with the creation of form as well as data






```python
<!DOCTYPE html>
<html>
    <body>
            <form id = 'inputVals'>
                Enter Name:<input type='text' name='name' placeholder='enter name' />
                Enter Country:<input type='text' name='country' placeholder='enter country' />
               <button>Submit</button>
        </form>
      <script src='client.js'></script>
    </body>
</html>
```










Now we will create JavaScript file for manipulating data from index.html named as client.js





```python
const theData = document.querySelector('#inputVals')
theData.addEventListener('submit', (e) => {
    e.preventDefault()
    const lname = e.target.elements.name.value
    const lcountry = e.target.elements.country.value
   location.assign(`\send?name=${lname}&country=${lcountry}`)
})
```







Now, we will create server.js
#[Note]
 Now you have to go to google spreadsheet and then copy the URL of the opened sheet 
https://docs.google.com/spreadsheets/d/1PeeYtVpAtieregregtrg8dFCzyOK0FBC5KOWjKZwP0/edit#gid=0
Now you have to select the id which starts at end of /d and ends before /edit which is
1PeeYtVpAtiPhKWrIprLkU8dFCzyOK0FBC5KOWjKZwP0
While creating new [google_spread_sheet] object



















```python

var GoogleSpreadsheet = require('google-spreadsheet');

var creds = require('./client-secret.json');

 

// Create a document object using the ID of the spreadsheet - obtained from its URL.

var doc = new GoogleSpreadsheet('1PeeYtVpAtiPhKWrIprLkU8dFCzyOK0FBC5KOWjKZwP0');

let ggf = ''






const express = require('express')
const hbs = require('hbs')
const port = process.env.PORT || 3000
var app = express()

app.set('view engine', 'hbs')
app.use(express.static(__dirname + '/public'))


app.get('/send', function(req, res) {

     var oname = req.query.name
     var oountry = req.query.country



     doc.useServiceAccountAuth(creds, function (err) {

 

      doc.addRow(1, { name: oname, country: oountry }, function(err) {
  
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
    

    
ggf = ''

  doc.useServiceAccountAuth(creds, function (err) {

 

    // Get all of the rows from the spreadsheet.
  
    doc.getRows(1, function (err, rows) {
  
  const info = rows.forEach((index,item) => {
      console.log(`Candidate name is ${index.name}, and belongs to ${index.country}`)

    
 ggf = ggf + `<h1>Candidate name is ${index.name}, and belongs to ${index.country}</h1>`

     

  })
  res.render('home.hbs', {
    pageTitle: ggf 
   // welcomeMessage: index.city
  
})
      //console.log(rows[0].name)
  
    });
  
    


  });







 


})


app.get('/open', (req,res) => {
    

    
 
    
ggf = ''

doc.useServiceAccountAuth(creds, function (err) {



  // Get all of the rows from the spreadsheet.

  doc.getRows(1, function (err, rows) {

const info = rows.forEach((index,item) => {
    console.log(`Candidate name is ${index.name}, and belongs to ${index.country}`)

  
ggf = ggf + `<h1>Candidate name is ${index.name}, and belongs to ${index.country}</h1>`

   

})
res.render('home.hbs', {
  pageTitle: ggf 
 // welcomeMessage: index.city

})
    //console.log(rows[0].name)

  });

  


});




})


app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
```







ONE last task which we have to do is to add script tag in our package.json file so that we Heroku can detect that we have to run server.json
[main & script tag]
![8](https://user-images.githubusercontent.com/20107730/62009096-d8066380-b178-11e9-848e-da0224e148ab.JPG)



GITHUB TASK 3
Go to Github and create a new repository
![9](https://user-images.githubusercontent.com/20107730/62009105-ee142400-b178-11e9-81f3-1fd7aa309999.JPG)
Now go to the terminal in your project root directory and add the following

```bash
git init
git add. 
git commit -m “first commit”
git remote add origin //**your GitHub repo URL
git push origin master
```


now let it write an object, wait for a bit till it finishes


HEROKU TASK 4
Go to the Heroku website and log in
1)	Click on create a new app
2)	Open Deploy Tab
3)	Use the deployment method as GitHub > give the name of the repo and search for it and then click connect
4)	Click Enable Automatic Deploys 
5)	Now go to Settings > buildpacks > choose nodejs
6)	Now go to deploy tab and click Deploy Branch








## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
