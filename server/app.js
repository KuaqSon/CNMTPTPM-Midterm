var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var demo = require('./routes/demo');


var app = express();
app.use(bodyParser.json());

app.use('/demo/all', demo);

app.get('/',(req,res)=>{
    res.json({
        msg: 'hello all'
    })
});


function normalizePort(val) {
    var port = parseInt(val, 10);
  
    if (isNaN(port)) {
      // named pipe
      return val;
    }
  
    if (port >= 0) {
      // port number
      return port;
    }
  
    return false;
  }

var port = normalizePort(process.env.PORT || '3000');
app.listen(port, function () {
    console.log('Sever started on port ' + port);
});