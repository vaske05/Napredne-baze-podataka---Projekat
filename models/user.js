var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

//User Schema
var userSchema = mongoose.Schema({
    fullname: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String }, //Nema require zbog facebook konekcije
    role: { type: String, default: '' },
    company: {
        name: { type: String, default: '' },
        image: { type: String, default: 'user-default.png' }
    },
    passwordResetToken: { type: String, default: '' },
    passwordResetExpires: { type: Date, default: Date.now },
    facebook: { type: String, default:'' },
    tokens: Array,
    profileImage: { type: String, default: 'user-default.png' },
    city: { type: String, default: ''},
    country: { type: String, default: ''}
});

//Encryption for password
userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password);
}

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password,this.password); //Ovde je problem ali ne znam zasto(REŠENO)
}

module.exports = mongoose.model('User', userSchema);
