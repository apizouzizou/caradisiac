const express        = require('express');
const elasticsearch    = require('elasticsearch');
const bodyParser     = require('body-parser');
const app            = express();


var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

const port = 9292;

client.ping({
  requestTimeout: 30000,
}, function (error) {
  if (error) {
    console.error('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
});


app.use(bodyParser.urlencoded({extended: true }));

require('./app/routes')(app, {});
app.listen(port, () => {
  console.log('We are live on ' + port);
});
