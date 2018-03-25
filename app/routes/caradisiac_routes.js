
const {getBrands} = require('node-car-api');
const {getModels} = require('node-car-api');
var elasticsearch = require('elasticsearch');
var fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();



var Client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'

});

// Step : Retriving each models for each Brands

async function populate() {

  const brands = await getBrands(); //finding Brands

  var body = []; //List where the data will be stored
  var id = 1;    //id to index each models

  for (var i = 0; i < brands.length; i++) {  // researching for each brand

   const models = await getModels(brands[i]); // each models

   for (var j = 0; j < models.length; j++) { // and for all of the models ,in each brands (all car)

      body.push({
        index: {
          _index: 'caradisiac',
          _type: 'suv',
          _id: id
        },
      });

      body.push(models[j]); // push each model in body
      id++;
    }
  }


 // STEP 2 Send Data to elasticSearch


Client.bulk({  // send data to elasticSearch

  body: body

}, function(error, response) { // error function
  if (error) {
    console.error(error);
    return;
  }
  else {
   console.log('OK!');
 }
});
}


 // Step 3 Find the SUV of Your Dreams with elasticsearch Request

 async function suv() {

   Client.search({ // searching in Client Db with differentes characteristics

    index: 'caradisiac',
    type: 'suv',
    body:{
      "size":80,
      "sort":[
        {"volume.keyword" :{"order":"desc"}}
      ]
    }
   }, function(error, response) {
     if (error) {
       console.error(error)
       return;
     } else {
       console.log("search error: "+error)
     }
   });  // error function
 }

 // Final Step Export the fonction app.post ('/populate') & app.post ('/suv')

 module.exports = function(app, db) {


  app.post('/populate', (req, res) => {
    populate();
    res.send(' On the Way ');
  });

  app.post('/suv', (req, res) => {
    suv();
    res.send('Update Done !');
  })

};
