
// User Schema

var UserSchema = ({
   
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    auth: {
        type: Number
    },
    id:{
        type:String,
        require:true
    },
    created:{
        type: Date,
        default: Date.now
    },
    isDelete:{
        type: Boolean,
        default: false
    }
});

var User = module.exports;

