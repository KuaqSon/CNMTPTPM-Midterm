var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var user = require('./routes/user');
var receivers = require('./routes/receiver');
var passport = require('passport');
var session = require('express-session');
var expressValidator = require('express-validator');
const io = require('socket.io')();


io.on('connection', (client) => {
    client.on('subscribeToTimer', (interval) => {
        console.log('client is subscribing to timer with interval ', interval);
        setInterval(() => {
            client.emit('timer', new Date());
        }, interval);
    });
});


var app = express();

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
    saveUninitialized: true
    //cookie: { secure: true }
}))



// Express-validator







// Express Messages middleware
var flash = require('connect-flash')
app.use(flash());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

require('./config/passport')(passport);


app.use(passport.initialize());
app.use(passport.session());

// function ensureAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) { return next(); }
//     // res.redirect('/login')
// }

app.use('/users', user);
app.use('/receivers', receivers);


app.get('/', (req, res) => {
    res.json({
        msg: 'hello all'
    })
});

// routes should be at the last
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
// io.listen(port, function(){
//     console.log('Socket listening on port' + port);
// });
app.listen(port, function () {
    console.log('Sever started on port ' + port);
});