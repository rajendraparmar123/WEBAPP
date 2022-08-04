const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()
const port=process.env.port||3000;
const apiKey = '468fd46503ae8c49f43b98112fb49638';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, TempMin:null, Humidity:null,Pressure:null, TempMax:null, error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, TempMin:null, Humidity:null,Pressure:null, TempMax:null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', { TempMin:null,weather: null, Humidity:null,Pressure:null, TempMax:null, error: 'Error, please try again'});
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        let TempMin=`Minimum temperature of the day is ${weather.main.temp_min}!`;
        let TempMax=`Maximum temperature of the day is ${weather.main.temp_max}!`;
        let Humidity=`Humidity in the air:${weather.main.humidity}`;
        let Pressure=`Air Pressure:${weather.main.pressure}`;
                res.render('index', { TempMax:TempMax,weather: weatherText,Humidity:Humidity,Pressure:Pressure,TempMin:TempMin, error: null});
      }
    }
  });
})

app.listen(port, function () {
  console.log('Example app listening on port 3000!')
})
