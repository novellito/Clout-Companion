const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');
const config   = require('../config/database');

const UserSchema = mongoose.Schema({
    local: {
        username: {
            type:     String,
            required: true
        },
        email: {
            type:     String,
            required: true
        },
        password: {
            type:     String,
            required: true
        }
    },
    facebook: {
        id:    String,
        token: String,
        email: String,
        name:  String
    }

});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function (id, cb) {
    User.findById(id, cb);
}

module.exports.getUserByUsername = function (username, cb) {
    const query = {
        'local.username': username
    };
    User.findOne(query, cb);
}

//add new user locally
module.exports.addUser = function (newUser, cb) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) 
                throw err;
            newUser.password = hash;
            newUser.save(cb);
        });
    });
}

module.exports.comparePassword = function (candidatePassword, hash, cb) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) 
            throw err;
        cb(null, isMatch);
    });
}

