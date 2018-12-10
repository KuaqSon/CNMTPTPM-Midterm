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


app.use('/users', user);
app.use('/request', request);
app.use('/driver', driver);


app.get('/', (req, res) => {
    res.json({
        msg: 'hello all'
    })
});

// io.set('transports', ["websocket", "polling"]);
const port1 = 3001;
const port2 = 3002
var allowCrossDomain = function (req, res, next) {
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

// const getApiAndEmitForReceiver = async socket => {

//     var res;
//     Requestdb.loadAll()
//         .then(rows => {
//             res = rows;
//             try {
//                 socket.emit("get data", res);
//             } catch (error) {
//                 console.error(`Error: ${error.code}`);
//             }
//         }).catch(err => {
//             console.log(err);
//             res.statusCode = 500;
//             res.end('Erro');
//         });
// }


const getApiAndEmitForManager = async socket => {
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

const getApiAndEmitForIdentifier = async socket => {

    var res;
    Requestdb.loadRequestForIdentifier()
        .then(rows => {
            res = rows;
            try {
                socket.emit("get data", res);
            } catch (erro) {
                console.error(`Error: ${error.code}`);
            }
        }).catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('Erro');
        })
}


io.on('connect', socket => {
    console.log("New user connected");
    setInterval(
        () => {
            getApiAndEmitForDriver(socket);
        }
        , 11000
    );

    setInterval(
        () => {
            getApiAndEmitForManager(socket);
        }, 4000
    );
    setInterval(
        () => {
            getApiAndEmitForIdentifier(socket);
        }, 4000
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



const getApiAndEmitForDriver = async socket => {
    var res;
    var idDriver = 0;
    var status = 0;
    Requestdb.loadRequestNew()
        .then(rows => {
            if (!isEmpty(rows)) {
                // rows.forEach(row => {
                rowReq = rows[0];

                const coorLocation = {
                    lat: rowReq.lat,
                    log: rowReq.log
                }
                dbUser.findDriver()
                    .then(rows => {
                        if (isEmpty(rows)) {
                            idDriver = 0;
                            status = 0;
                        } else {
                            var coorDriver = {
                                lat: rows[0].lat,
                                log: rows[0].log
                            }
                            var minDistance = caculatorDistance(coorLocation, coorDriver);
                            rows.forEach(row => {
                                coorDriver = {
                                    lat: row.lat,
                                    log: row.log
                                }
                                var distance = caculatorDistance(coorLocation, coorDriver);
                                if (minDistance <= distance && row.id != 0 && row.state === 1) {
                                    idDriver = row.id;
                                    status = row.state;
                                    minDistance = distance;
                                }
                                
                                console.log(row.id +' - '+ idDriver);
                            });


                            if (idDriver != 0 && idDriver != 1 && status === 1) {
                                res = rowReq;
                                try {
                                    socket.emit("driver" + idDriver, res);
                                    console.log("driver" + idDriver);
                                } catch (error) {
                                    console.error(`Error: ${error.code}`);
                                }
                            }

                        }
                    });
                // console.log("test2 "+idDriver);

                // -------------------

            }
        })
}


function findingDriver(coorLocation, idIgnor) {
    var idDriver = 0;
    dbUser.findDriver()
        .then(rows => {
            if (isEmpty(rows)) {
                return 0;
            } else {
                var coorDriver = {
                    lat: rows[0].lat,
                    log: rows[0].log
                }
                var minDistance = caculatorDistance(coorLocation, coorDriver);
                rows.forEach(row => {
                    coorDriver = {
                        lat: row.lat,
                        log: row.log
                    }
                    var distance = caculatorDistance(coorLocation, coorDriver);
                    if (minDistance <= distance && row.id != idIgnor) {
                        idDriver = row.id;
                        minDistance = distance;
                    }
                });

                return idDriver;
            }
            // return idDriver;
        });
    // return idDriver;
}

function caculatorDistance(coor1, coor2) {
    // console.log(lat1);
    // console.log(lat2);
    // const distance = Math.sqrt((lat1 - lat2) * (lat1 - lat2) + (log1 - log2) * (log1 - log2));
    // console.log(distance);

    function toRad(x) {
        return x * Math.PI / 180;
    }

    var lon1 = coor1.log;
    var lat1 = coor1.lat;

    var lon2 = coor2.log;
    var lat2 = coor2.lat;

    var R = 6378137; // m

    var x1 = lat2 - lat1;
    var dLat = toRad(x1);
    var x2 = lon2 - lon1;
    var dLon = toRad(x2)
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;

    return d;
}