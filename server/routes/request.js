var express = require('express');
var Request = require('../dbQuery/getRequest');
var router = express.Router();


router.get('/', function (req, res) {
    // console.log(req.params.name);

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


router.post('/add', function (req, res) {
    var name = req.body.name;
    var telephone = req.body.telephone;
    var address = req.body.address;
    var infor = req.body.infor;

    Request.findByTelephone(telephone)
        .then(rows => {
            if (!isEmpty(rows))
                res.json({
                    msg: 'You have already booked!'
                });
            else {
                Request.addRequest(name, telephone, address, infor)
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




module.exports = router;


function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}