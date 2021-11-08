const express = require('express');
const bodyparser = require('body-parser');
const request = require('request');

const app = express()

const apiKey = '0526b523e212e6d1b780cb2edd273c55';

app.use(express.static('public'))

app.use(bodyparser.urlencoded({extended:true}))

app.set('view engine','ejs')

app.post('/',function (req,res){
  let city = req.body.city
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  console.log(req.body.city)
  request(url,function(err,response,body){
    if(err){
      res.render('index',{weather:null,error : 'Error please try again'})
    }
    else{
          let weather = JSON.parse(body)
          if(weather.main == undefined){
            res.render('index', {weather : null , error : 'Error please try again'})
          }
          else{
            let weatherText = `Its ${weather.main.temp} degrees Celcius with ${weather.weather[0].main} in ${weather.name}!`
            res.render('index',{weather:weatherText,error:null})
            console.log('body:',body);
          }
    }
  })
})

app.get('/',function(req,res){
  res.render('index',{weather : null, error : null})
})

app.listen(3000,function(){
  console.log("Weatherly app listening on port 3000!!");
})