const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    require: true
  },

  userId: {
    type: String,
    required: true
  }

  // update for notes & items
});

UserSchema.statics.upsertNewUser = function(profile, cb) {
  return this.findOne(
    {
      userId: profile.id
    },
    (err, user) => {
      // no user was found, create a new one
      if (!user) {
        const newUser = new this({
          username: profile.username,
          userId: profile.id
        });

        newUser.save((error, savedUser) => {
          if (error) {
            console.log(error);
          }
          return cb(error, savedUser);
        });
      } else {
        return cb(err, user);
      }
    }
  );
};

const User = (module.exports = mongoose.model('User', UserSchema));
