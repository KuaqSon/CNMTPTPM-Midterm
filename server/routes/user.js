var express = require('express');
var User = require('../dbQuery/getUsers');
var router = express.Router();
var bcrypt = require('bcrypt');
var passport = require('passport');
var JSON
// var UserSchema = require('../models/User');
// var moment = require('moment');

// const bodyParser = require("body-parser");
// User is UserList dataType = json;

passport.serializeUser((user,done)=>{
    done(null,user.ID);
})

passport.deserializeUser((id,done)=>{
    User.findUserByID(id)
        .then((user)=>{
        done(null,user);
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
                    isDelete: 0
                    // created: created
                };
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(userTemp.password, salt, function (err, hash) {
                        if (err)
                            console.log(err);
                        else {
                            userTemp.password = hash;
                            User.addUser(userTemp.name, userTemp.email, userTemp.auth, userTemp.username, userTemp.password, userTemp.isDelete)
                            .then(user => {
                                res.json(rows);
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




router.post('/edit-user/:id', function (req, res) {
    // console.log(req.params.name);

    var userID = req.params.id;
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
        else{
            var userTemp = {
                id: userID,
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


router.get('/login', function (req, res) {

    if (res.locals.user) res.redirect('/');
    
    // res.render('login', {
    //     title: 'Log in'
    // });

});


// Post log in

router.post('/login', function (req, res, next) {

    passport.authenticate('local', {
        successRedirect: '/',
        // failureRedirect: '/users/login',
        // failureFlash: true
    })(req, res, next);

    
});



module.exports = router;




function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}