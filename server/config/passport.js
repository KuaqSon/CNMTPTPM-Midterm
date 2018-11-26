var localStratery = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
var User = require('../dbQuery/getUsers');
var authRepo = require('./token');
// const verifyAccessToken = authRepo.verifyAccessToken;

module.exports = function (passport) {

    passport.use(new localStratery(function (username, password, done) {
        // console.log(usrename);
        // console.log(password);

        // if(authRepo.verifyAccessToken(res, req, next))

        User.findUser(username)
            .then(rows => {
                // console.log(rows);
                var temp = rows;
                if (isEmpty(temp)) {
                    return done(null, false, { message: 'No user found!' });
                }
                else {
                    // console.log(rows[0].password);
                    bcrypt.compare(password, rows[0].password, function (err, isMatch) {
                        if (isMatch){
                            var userEntity = rows[0];
                            console.log(userEntity);

                            var acToken = authRepo.generateAccessToken(userEntity);
                            var rfToken = authRepo.generateRefreshToken();
                            authRepo.updateRefreshToken(userEntity.id, rfToken)
                                .then(value => {

                                    // console.log(userEntity);
                                    // console.log(acToken);
                                    // console.log(rfToken);
                                    // console.log(value);
                                    res.json({
                                        auth: true,
                                        user: userEntity,
                                        access_token: acToken,
                                        refresh_token: rfToken
                                    });
                                })
                                .catch(err=>{
                                    console.log(err);
                                    res.statusCode = 500;
                                })
                            return done(null, rows[0]);
                        } 
                        else 
                            return done(null, false, { message: 'Wrong password.' });
                    });
                }
            }).catch(err => {
                console.log(err);
            });
    }));


    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findUserByID(id)
            .then(user => {
                done(null, user);
            });

    });
}


function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}