var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var user = require('./routes/user');
var request = require('./routes/request');
var passport = require('passport');
var session = require('express-session');
var expressValidator = require('express-validator');
const socketIo = require('socket.io');
const http = require('http');
const server = http.Server(app);
const Requestdb = require('./dbQuery/getRequest');
const cors = require('cors');
const Cookie = require('cookies');
// const verifyAccessToken = require('./config/token').verifyAccessToken;



// var whitelist = ['http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003', 'http://localhost:3004']
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }

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


app.get('/', (req, res) => {
    res.json({
        msg: 'hello all'
    })
});

// routes should be at the last
// app.use(app.router);



// Socket listen on port 3001 


const io = socketIo(server, {
    path: '/',
    serveClient: false,
    pingInterval: 5000,
    pingTimeout: 2000,
    cookie: false,
    transports: [
        'websocket', 
        'flashsocket', 
        'htmlfile', 
        'xhr-polling', 
        'jsonp-polling', 
        'polling'
      ]
});

// io.set('transports', ["websocket", "polling"]);
const port1 = 3001;
const port2 = 3002

io.on('connect', socket => {
    console.log("New user connected"), setInterval(
        () => getApiAndEmit(socket),
        5000
    );
    socket.on("disconnected", () => console.log("client disconnected"));

});

const getApiAndEmit = async socket => {

    var res;
    Requestdb.loadAll()
        .then(rows => {
            var data = JSON.stringify(rows);
            res = data;
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


// listen 
// let http2 = require('http').Server(app);
// let io2 = require('socket.io')(http2);

// http2.listen(port1, '::1', function () {
//     console.log('Socket2 listen on port ' + port1);
// });

// io2.on('connect', function (socket) {

// });
// app.use(app.router);
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