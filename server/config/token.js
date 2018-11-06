var jwt = require('jsonwebtoken');
var rndToken = require('rand-token');
var moment = require('moment');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var db = require('./db');

var User = require('../dbQuery/getUsers');

const SECRETKEY = 'TAODEP';
const AC_LIFETIME = 500;

exports.generateAccessToken = userEntity => {
    var payload = {
        user: userEntity,
        info: 'more infor'
    };

    var token = jwt.sign(payload, SECRETKEY, {
        expiresIn: AC_LIFETIME
    });
    return token;
}

exports.verifyAccessToken = (req, res, next) => {
    var token = req.headers['x-access-token'];
    console.log(token);

    if (token) {
        jwt.verify(token, SECRETKEY, (err, payload) => {
            if (err) {
                res.statusCode = 401;
                res.json({
                    msg: 'INVALID TOKEN',
                    error: err
                })
            } else {
                req.token_payload = payload;
                next;
            }
        });
    } else {
        res.statusCode = 403;
        res.json({
            msg: 'NO_TOKEN'
        })
    }
}


exports.generateRefreshToken = () => {
    const size = 80;
    return rndToken.generate(size);
}

exports.updateRefreshToken = (userId, rfToken) => {
    return new Promise((resolve, reject) => {

        var sql = `delete from userRefreshTokenExt where userId = ${userId}`;
        db.insert(sql)
            .then(value => {
                var rdt = moment().format('YYYY-MM-DD HH:mm:ss');
                sql = `insert into userRefreshTokenExt value(${userId}, '${rfToken}','${rdt}')`;
                return db.insert(sql);
            })
            .then(value => resolve(value))
            .catch(err => reject(err))
    });
}
