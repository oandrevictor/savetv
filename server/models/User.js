var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

var UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: validateEmail,
      message: 'Invalid email'
    }
  },
  password: {
    type: String,
    required: true
  },
  birthday: {
    type: Date,
    required: true
  },
  gender : {
    type: String,
    required: true,
    enum: ['male', 'female', 'other']
  },
  histoy: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'History'
      }],
      default: [],
      required: true
  },
  following: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Follows'
      }
    ],
    default: []
  },
  following_pages: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FollowsPage'
      }
    ],
    default: []
  },
  followers: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Follows'
      }
    ],
    default: []
  },
  vip: {
    type: Boolean,
    default: false
  },
  watchlist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserList'
  },
  lists: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserList'
      }
    ],
    default: []
  },
  ratings: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rating'
      }
    ],
    default: []
  }
});


var User = mongoose.model('User', UserSchema);

module.exports = User;