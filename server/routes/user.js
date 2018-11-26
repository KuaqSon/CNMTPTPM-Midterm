var express = require('express');
var User = require('../dbQuery/getUsers');
var router = express.Router();
var bcrypt = require('bcrypt');
var passport = require('passport');
const authToken = require('../config/token');
const Cookie = require('cookies');
const userRefreshTokenExt = require('../dbQuery/getUserRefreshToken');

// var JSON
// var UserSchema = require('../models/User');
// var moment = require('moment');

// const bodyParser = require("body-parser");
// User is UserList dataType = json;

passport.serializeUser((user, done) => {
    done(null, user.ID);
})

passport.deserializeUser((id, done) => {
    User.findUserByID(id)
        .then((user) => {
            done(null, user);
        })
})


router.get('/', function (req, res) {
    // console.log(req.params.name);

    User.loadAll()
        .then(rows => {
            res.json(rows);
            console.log("Get data!");
        }).catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('dkm');
        });

});



router.post('/add-user', function (req, res) {


    var username = req.body.username;
    var name = req.body.name;
    var password = req.body.password;
    var email = req.body.email;
    var auth = 0;
    var lat = req.body.lat;
    var log = req.body.log;

    // console.log(name);
    // console.log(req.body.name);    

    // var created = '1000-01-01 00:00:00';


    var findUser = User.findUser(username)
        .then(rows => {
            // res.json(rows);
            // console.log(rows);
            if (isEmpty(rows)) {
                var userTemp = {
                    name: name,
                    email: email,
                    username: username,
                    password: password,
                    auth: auth,
                    isDelete: 0,
                    lat: lat,
                    log: log
                    // created: created
                };
                console.log(name);
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(userTemp.password, salt, function (err, hash) {
                        if (err)
                            console.log(err);
                        else {
                            userTemp.password = hash;
                            User.addUser(userTemp.name, userTemp.email, userTemp.auth, userTemp.username, userTemp.password, userTemp.lat, userTemp.log)
                                .then(user => {
                                    res.json(user);
                                    console.log('Add successfully!');
                                }).catch(err => {
                                    console.log(err);
                                    res.statusCode = 500;
                                    res.end('dkm');
                                });
                        }
                    })
                })
            }
            else
                console.log('username exit, plz choose another!');
        }).catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('dkm');
        })
});

router.post('/updateToken', function (req, res) {
    const id = req.body.id;
    const rfToken = req.body.rfToken;
    console.log(rfToken);
    userRefreshTokenExt.findUserByID(req.body.id)
        .then(row => {
            if (isEmpty(row)) {
                res.json({
                    msg: error,
                    auth: false
                });
                res.statusCode = 401;
            } else {
                if (row[0].rfToken == rfToken) {
                    User.findUserByID(id)
                        .then(rows => {
                            var acToken = authToken.generateAccessToken(rows[0]);
                            res.json({
                                auth: true,
                                user: rows[0],
                                access_token: acToken
                            })
                        })
                }
            }
        })
        .catch(err => {
            console.log(err);
        });
})


router.post('/edit-user/:id', function (req, res) {
    // console.log(req.params.name);

    var userId = req.params.id;
    var username = req.body.username;
    var name = req.body.name;
    var password = req.body.password;
    var email = req.body.email;
    var auth = 0;

    var findUser = User.findUserByID(userID)
        .then(rows => {
            // res.json(rows);
            // console.log(rows);
            if (isEmpty(rows)) {
                console.log('User not found!');
            }
            else {
                var userTemp = {
                    id: userId,
                    name: name,
                    email: email,
                    username: username,
                    password: password,
                    auth: auth
                };
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(userTemp.password, salt, function (err, hash) {
                        if (err)
                            console.log(err);
                        else {
                            userTemp.password = hash;
                            User.Update(userTemp.id, userTemp.name, userTemp.email, userTemp.auth, userTemp.username, userTemp.password);
                        }
                    })
                })
            }
        }).catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('dkm');
        })
});

router.get('/logout:id',function(req, res){
    try{
    userRefreshTokenExt.deleteUserLogin(req.params.id);
    } catch(err) {
        res.statusCode = 403;
        res.json({
            auth: false
        })
        console.log(err);
    }
})
// router.get('/login', function (req, res) {

//     if (res.locals.user) res.redirect('/');

//     // res.render('login', {
//     //     title: 'Log in'
//     // });

// });


// Post log in

router.post('/login', function (req, res) {

    User.findUser(req.body.username)
        .then(rows => {
            var temp = rows;
            if (isEmpty(temp)) {
                return res.json({
                    msg: 'No user found!'
                });
            }
            else {
                bcrypt.compare(req.body.password, rows[0].password, function (err, isMatch) {
                    if (isMatch) {
                        var userEntity = rows[0];
                        var acToken = authToken.generateAccessToken(userEntity);
                        var rfToken = authToken.generateRefreshToken();
                        authToken.updateRefreshToken(userEntity.id, rfToken)
                            .then(value => {
                                res.json({
                                    auth: true,
                                    user: userEntity,
                                    access_token: acToken,
                                    refresh_token: rfToken
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.statusCode = 500;
                            })
                    }
                    else
                        return res.json({
                            msg: 'Wrong password!'
                        });
                });
            }
        }).catch(err => {
            console.log(err);
        });
});



module.exports = router;




function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function setCookie(cname, cvalue, exdays) {
    // var d = new Date();
    // d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    // var expires = "expires="+d.toUTCString();
    // window.document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    // Cookie
}


function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(window.document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}