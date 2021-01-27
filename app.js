const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req, res) {
  var cityName = req.body.city;

  const query=cityName;
  const unit="metric";
  const id="ac11d3e27e046ddcfe64997369d3e535";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units="+unit+"&appid="+id;

  https.get(url, function(response) {
    console.log(response.statusCode);
    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const imgurl = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png"
      res.write("<h1>The temp in "+query+" is: " + temp + " degrees Celsius.</h1><h3>The weather is currently " + weatherDescription + "</h3>");
      res.write("<img src=" + imgurl + ">");
      res.send();
    });
  });
});

app.listen(3000, function() {
  console.log("Server running");
});
