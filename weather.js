require('dotenv').config()
const express=require("express");
const https=require("https");
const app=express();
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));
app.get("/",function(req,res){

  res.sendFile(__dirname +"/index.html");

});

app.post("/",function(req,res){


  const query=req.body.cityName;
  const key=process.env.apikey;
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+key+"&units=metric";

  https.get(url,function(response){
    console.log("The response status of get request "+response.statusCode);
    response.on("data",function(details){




      const weatherData=JSON.parse(details)
      const tempData=weatherData.main.temp
      const weatherDes=weatherData.weather[0].description
      const icon=weatherData.weather[0].icon
      const imageURL=" https://openweathermap.org/img/wn/"+icon+"@2x.png"

     res.render("result",{tempData:tempData,weatherDes:weatherDes,imageURL:imageURL,cityName:query})
    // res.write("<h1>The temperature status in "+query+" is "+tempData+"</h1>")
    //   res.write("<h1>The weather description status in "+query+"  is "+weatherDes+"</h1>")
    //     res.write("<img src="+imageURL+" alt='icon'>")
    //     res.send();
    });
  });





});



app.listen(process.env.PORT||3000,function(){
  console.log("server is running fine....");
});
