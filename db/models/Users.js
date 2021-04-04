import mongoose from 'mongoose'
import bcrypt from 'bcrypt'



const { Schema } = mongoose;
const saltRounds = 10;

const User = new Schema({
    email: { type: String, unique: true },
    lastname: {type: String},
    firstname: {type: String},
    password: {type: String },
    token: {type: String},
})



User.pre('save', function(next){
    var user = this
    //password가 변환될 때에만
    if(user.isModified('password')){
        //비밀번호 암호화 선행
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err)
                user.password = hash
                next()
            });
        });
    } else {
        next()
    }
})

User.statics.register = function({ email, lastname, firstname, password, token }) {
    const user = new this({
        email,
        lastname,
        firstname,
        password,
        token
    });
    return user.save();
}

User.statics.findUser = function({email}){
    return this.findOne({email:email})
}

User.statics.tokenSave = function ({useremail, token}) {
    return this.findOne({ email:useremail })
        .then((user)=> {
            user.token = token;
            return user.save();
        })
        .catch((err)=> {
            return err;
        });
}

export default mongoose.model('User', User);