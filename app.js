const express = require("express");
const cluster = require("cluster");
const os = require("os");


const https = require("https");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const mailchimp = require("@mailchimp/mailchimp_marketing");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));






mailchimp.setConfig({
  apiKey: "2b7e6b463e3e4862f415ca9cfe7abc26-us12",
  server: "us12",
});



app.get('/', function(req, res){
  res.sendFile(__dirname + "/signup.html")
});



app.post('/', function(req, res){
  const firstName = req.body.first;
  const lastName = req.body.last;
  const email = req.body.email;

  const listId = "27cd737e83";

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);

  const url = "https://us12.api.mailchimp.com/3.0/lists/" + listId;

  const options = {
    method: "POST",
    auth: "vijithan:2b7e6b463e3e4862f415ca9cfe7abc26-us12"
  }

  const request = https.request(url, options, function(response) {

    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");

    } else {
      res.sendFile(__dirname + "/failure.html");
    }



  });

  request.write(jsonData);
  request.end();


});





app.listen(process.env.PORT || 3000, function(){
  console.log(`server 3000 ${process.pid}`);
});


// api key = 2b7e6b463e3e4862f415ca9cfe7abc26-us12
// list id
// 27cd737e83
