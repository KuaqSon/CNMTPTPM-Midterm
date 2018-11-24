var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var user = require('./routes/user');
var request = require('./routes/request');
var driver = require('./routes/driver');
var passport = require('passport');
var session = require('express-session');
var expressValidator = require('express-validator');
const socketIo = require('socket.io');
const http = require('http');
const dbUser = require('./dbQuery/getUsers');
// const server = http.Server(app);
const Requestdb = require('./dbQuery/getRequest');
const cors = require('cors');
const Cookie = require('cookies');
// const verifyAccessToken = require('./config/token').verifyAccessToken;



var whitelist = ['http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003', 'http://localhost:3004']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser.json());



app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));




// // Passport Config
// require('./config/passport')(passport);
// // Passport Middleware
// app.use(passport.initialize());
// app.use(passport.session());
// // Express session middleware

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: true }
}))



// Express Messages middleware
var flash = require('connect-flash')
app.use(flash());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

// require('./config/passport')(passport);


// app.use(passport.initialize());
// app.use(passport.session());


// function ensureAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) { return next(); }
//     // res.redirect('/login')
// }

app.use('/users', user);
app.use('/request', request);
app.use('/driver', driver);


app.get('/', (req, res) => {
    res.json({
        msg: 'hello all'
    })
});

// routes should be at the last
// app.use(app.router);



// Socket listen on port 3001 




// io.set('transports', ["websocket", "polling"]);
const port1 = 3001;
const port2 = 3002
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000/');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
};


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

var server = app.listen(port, function () {
    console.log('Sever started on port ' + port);
});

const io = socketIo.listen(server);

const getApiAndEmitForReceiver = async socket => {

    var res;
    Requestdb.loadAll()
        .then(rows => {
            res = rows;
            try {
                socket.emit("get data", res);
            } catch (error) {
                console.error(`Error: ${error.code}`);
            }
        }).catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('Erro');
        });
}



const getApiAndEmitForDriver = async socket =>{
    var res;
    var idDriver = 0;
    Requestdb.loadRequestNew()
    .then(rows => {
        if(!isEmpty(rows)){
            // console.log(size(rows));
            rows.forEach(row => {
                // console.log(row);
                const coorLocation = {
                    lat: rows.lat,
                    log: row.log
                }
                    idDriver = findingDriver(coorLocation, 0);
                    if(idDriver != 0 && idDriver != 1){
                        res = row;
                    try {
                        socket.emit("driver" + idDriver, res);
                        setTimeout(()=>{
                            if(row.state === 1)
                            return;
                        }, 10000)
                    } catch (error) {
                        console.error(`Error: ${error.code}`);
                    }
                }
            });
            // for(var i = 0; i< size(rows); i++){
            // const coorLocation = {
            //     lat: rows[i].lat,
            //     log: rows[i].log
            // }
            //     idDriver = findingDriver(coorLocation, 0);
            //     if(idDriver != 0 && idDriver != 1){
            //         res = rows[i];
            //     try {
            //         socket.emit("driver" + idDriver, res);
            //         setTimeout(()=>{
            //             if(rows[i].state === 1)
            //             return;
            //         }, 10000)
            //     } catch (error) {
            //         console.error(`Error: ${error.code}`);
            //     }
            // }
            // }
        }
    })
}

const getApiAndEmitForManager = async socket =>{
    var res;
    Requestdb.joinTable()
        .then(rows => {
            res = rows;
            try {
                // console.log(res);
                socket.emit("manager", res);
            } catch (error) {
                console.error(`Error: ${error.code}`);
            }
           
        }).catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('Erro');
        });

}



io.on('connect', socket => {
    console.log("New user connected"); 
    setInterval(
        () => {
            getApiAndEmitForReceiver(socket);
            
        }
        ,5000
    );
    setInterval(
        () => {
            getApiAndEmitForManager(socket);
        }, 5000
    );
    setInterval(
        () => {
            getApiAndEmitForDriver(socket);
        }, 10000
    );
    
    socket.on("disconnected", () => console.log("client disconnected"));

});



function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}


function findingDriver(coorLocation, idIgnor){
    dbUser.findDriver()
    .then(rows => {
        console.log(rows);
        var idDriver = 0;
        if(isEmpty(rows)){
           return 0;
        } else {
            const size = Object.size(rows);
            var coorDriver = {
                lat: rows[0].lat,
                log: rows[0].log
            }
            var minDistance = caculatorDistance(coorLocation, coorDriver);
            for (var i = 0; i < size; i++ ){
                coorDriver = {
                    lat: rows[i].lat,
                    log: rows[i].log
                }
                var distance = caculatorDistance(coorLocation, coorDriver);
                if(minDistance <= distance && rows[i].id != idIgnor){
                    idDriver = rows[i].id;
                    minDistance = distance;
                }
            }
            return idDriver;
        }
    })
}

function caculatorDistance(coor1, coor2){
    var lat1 = coor1.lat;
    var log1 = coor1.log;
    var lat2 = coor2.lat;
    var log2 = coor2.log;

    const distance = Math.sqrt((lat1 - lat2)*(lat1 - lat2) + (log1 - log2)*(log1 - log2));
    return distance;
}