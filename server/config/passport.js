var localStratery = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
var User = require('../dbQuery/getUsers');

module.exports = function(passport){

    passport.use(new localStratery(function(usrename, password, done){

        User.findUser(usrename)
            .then(rows => {
                if(isEmpty(rows)){
                    return done(null, false,  {message: 'No user found!'});
                }
                else{
                    bcrypt.compare(password, rows.password, function(err, isMatch){
                        if(err)
                            console.log(err);
                        if(isMatch){
                            return done(null, rows);
                        } else{
                            return done(null, false,  {message: 'Wrong password.'});
                        }
                    });
                }
            });
    }));


    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findUserByID(id)
            .then(user =>{
                done(null, user);
            })
        
    });
}


function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}