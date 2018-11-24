var express = require('express');
var Request = require('../dbQuery/getRequest');
var User = require('../dbQuery/getUsers');
var auth = require('../config/token').verifyAccessToken;
var router = express.Router();

router.post('/caculator', function(req, res){
   
    var coorLocation = {
        lat: req.body.lat,
        log: req.body.log
    }
    // var lat = req.body.lat;
    // var log = req.body.log;
})

router.post('/accept', function(req, res){
    var idRequest = req.body.idRequest;
    var idDriver = req.body.idDriver;
    Request.accept(idRequest, idDriver)
    then(load => {
        res.json({
            msg: 'success'
        })
    }).catch(err => {
        console.log(err);
        res.statusCode = 500;
        res.end('Erro');
    })
})

router.post('/state', function(req, res){
    var id = req.body.id;
    var state = req.body.state;
    User.changeStateDriver(id, state)
    .then(load=> {
        // console.log(state);
        res.json({
            msg: load
        })
    }).catch(err => {
        console.log(err);
        res.statusCode = 500;
        res.end('Erro');
    });
})

function caculatorDistance(coor1, coor2){
    var lat1 = coor1.lat;
    var log1 = coor1.log;
    var lat2 = coor2.lat;
    var log2 = coor2.log;

    const distance = Math.sqrt((lat1 - lat2)*(lat1 - lat2) + (log1 - log2)*(log1 - log2));
    return distance;
}


module.exports = router;

function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function findingDriver(coorLocation, idIgnor){
    User.findDriver()
    .then(rows => {
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