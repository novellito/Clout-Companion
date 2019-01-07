const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: {
    type: String,
    require: true
  },

  userId: {
    type: String,
    required: true
  },

  items: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Item'
    }
  ]

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
          console.log(`New user - ${savedUser.username} was saved!`);
          return cb(error, savedUser);
        });
      } else {
        return cb(err, user);
      }
    }
  );
};

module.exports = mongoose.model('User', UserSchema);
