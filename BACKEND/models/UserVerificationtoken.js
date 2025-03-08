const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define verification token schema
const UserverificationTokenSchema = new Schema({
  userid: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
   

  },

  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 43200, // Token expires in 12 hours
  },
});

// Create and export UserVerificationToken model
const UserVerificationToken = mongoose.model('UserVerificationToken', UserverificationTokenSchema);
module.exports = UserVerificationToken;