var express = require('express');
var Request = require('../dbQuery/getRequest');
var auth = require('../config/token').verifyAccessToken;
var router = express.Router();


router.get('/', function (req, res) {
    // console.log(req.params.name);
    console.log('asdas');
    Request.loadAll()
        .then(rows => {
            res.json(rows);
            console.log("Get data!");
        }).catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('dkm');
        });

});

router.post('/identifier', function(req, res){
    var id = req.body.id;
    var lat = req.body.lat;
    var log = req.body.log;

    Request.identifier(id, lat, log)
    .then(row => {
        res.json({
            res: row
        });
    }).catch(err => {console.log(err);
        res.statusCode = 500;
    })
});

router.post('/add',auth , function (req, res) {
    var name = req.body.name;
    var telephone = req.body.telephone;
    var address = req.body.address;
    var infor = req.body.infor;
    var lat = req.body.lat;
    var log = req.body.log;
    var idUser = req.body.idUser;

    Request.findByName(name)
        .then(rows => {
            if (!isEmpty(rows))
                res.json({
                    msg: 'You have already booked!'
                });
            else {
                Request.addRequest(name, telephone, address, infor, lat, log, idUser)
                    .then(row => {
                        res.json({
                            msg: 'Add successful!'
                        });
                    }).catch(err => console.log(err));
            }
        }).catch(err => {
            console.log(err);
            res.statusCode = 500;
        });


});

router.post('/edit', function (req, res) {
    var id = req.body.id;
    var name = req.body.name;
    var telephone = req.body.telephone;
    var address = req.body.address;
    var infor = req.body.infor;
    console.log(id);
    Request.edit(id, telephone, name, address, infor)
        .then(res.json({
            msg: 'Edit successful!'
        }))
        .catch(err => {
            console.log(err);
            res.statusCode = 500;
        });

});

router.post('/setpoint', function(req, res){
    var id = req.body.id;
    var lat = req.body.lat;
    var log = req.body.log;
    Request.setPoint(id, lat, log)
    .then(res.json({
        msg: 'set point successful!'
    }))
    .catch(err => {
        console.log(err);
        res.statusCode = 500;
    })

})


router.post('/accept', function(req, res){
    var idRequest = req.body.idRequest;
    var idDriver = req.body.idDriver;
    Request.accept(idRequest, idDriver)
    .then(res.json({
        msg: 'accepted'
    }))
    .catch(err => {
        console.log(err);
        res.statusCode = 500;
    })

})

router.post('/test', (req, res) => {
    const {name, phone} = req.body;
	
    console.log(name + '---' +phone);
    
    // To Do: bussiness with data here

	res.json({
        msg: 'test successful!'
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