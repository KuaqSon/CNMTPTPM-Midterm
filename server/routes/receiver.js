var express = require('express');
var Receiver = require('../dbQuery/getReceiver');
var router = express.Router();


router.get('/', function (req, res) {
    // console.log(req.params.name);

    Receiver.loadAll()
        .then(rows => {
            res.json(rows);
            console.log("Get data!");
        }).catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('dkm');
        });

});

module.exports = router;