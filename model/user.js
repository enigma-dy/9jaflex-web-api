const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

// Define the user schema
const userSchema = new Schema({
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  Email: { type: String, required: true },
  Birthday: Date,
  Favorites: [{ type: Schema.Types.ObjectId, ref: 'Movie' }]
});

// Static method to hash the password
userSchema.statics.hashPassword = function(password) {
  return bcrypt.hashSync(password, 10);
};

// Model creation - check if it's already created to avoid OverwriteModelError
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
