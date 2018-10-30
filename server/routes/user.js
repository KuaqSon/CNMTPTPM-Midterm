var express = require('express');
var User = require('../dbQuery/getUsers');
var router = express.Router();
// const bodyParser = require("body-parser");
// User is UserList dataType = json;

router.get('/', function (req, res) {
    // console.log(req.params.name);

    var Users = User.loadAll()
        .then(rows => {
            res.json(rows);
            console.log(rows);
        }).catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('dkm');
        });

});



router.post('/add-user', function (req, res) {


    var username = req.body.username;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname
    var password = req.body.password;
    var email = req.body.email;
    var auth = 0;



    var findUser = User.findUserByID(username)
        .then(rows => {
            res.json(rows);
            console.log(rows);
            if (isEmpty(rows)) {
                User.findUserByID(firstname, lastname, email, auth, username, password);
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
    var firstname = req.body.firstname;
    var lastname = req.body.lastname
    var password = req.body.password;
    var email = req.body.email;
    var auth = 0;


    var Users = User.loadAll()
        .then(rows => {
            res.json(rows);
            console.log(rows);
        }).catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('dkm');
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