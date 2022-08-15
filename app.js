const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
// start parsing through body of post request
app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html");
});

app.use(express.static("public"));

app.post("/", function(req, res){
    const query = req.body.cityName;
    const apiKey = ""; //create an account with openweawthermap.org and paste your own API key here
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query + "&APPID="+ apiKey +"&units="+units;

    // auth, paths, queries
    // parse JSON data we get back and send it to browser
    // using express and node modules

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const currentTemp = weatherData.main.feels_like;
            const tempMin = weatherData.main.temp_min;
            const tempMax = weatherData.main.temp_max;
            const pressure = weatherData.main.pressure;
            const humidity = weatherData.main.humidity;
            const windSpeed = weatherData.wind.speed;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            const sunrise = weatherData.sys.sunrise;
            const sunsest = weatherData.sys.sunset;
            const country = weatherData.sys.country;
            console.log(weatherData);
            console.log(weatherDescription);
            res.write('<head><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous"><link href="css/styles.css" rel="stylesheet"></head>');
            res.write("<h1>"+query+", "+country+"</h1>");
            res.write('<div class="row">   <div class="row col-lg-6"><h2>' + currentTemp +'&#176;C '+weatherDescription+'<img src= '+ imageURL +'></h2></div> <div class="row col-lg-6"><div class="col-lg-3"><h2>'+tempMin+ '&#176;C <h3>Low</h3></h2></div> <div class="col-lg-3"><h2>'+tempMax+ '&#176;C<h3>High</h3></h2></div> <div class="col-lg-3"><h2>'+windSpeed+ 'kph <h3>Wind</h3></h2></div> <div class="col-lg-3"><h2>'+humidity+ '%<h3>Humidity</h3></h2></div> </div></div>');
            res.send();
        });
    });
});
// app.post catches form data



app.listen(3000, function(){
    console.log("Server is running on port 3000");
});
