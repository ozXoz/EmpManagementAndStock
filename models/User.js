const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: { 
    type: String, 
    enum: ['user', 'admin'], 
    default: 'user' 
  },
  permissions: {
    addProduct: { type: Boolean, default: false },
    deleteProduct: { type: Boolean, default: false },
    updateProduct: { type: Boolean, default: false },
    viewProducts: { type: Boolean, default: true },
    // ... other permissions as needed
  },
  // ... other fields as needed
});

// Pre-save hook to hash the password
UserSchema.pre('save', async function(next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);

    // Hash the password along with our new salt
    const hash = await bcrypt.hash(user.password, salt);

    // Override the cleartext password with the hashed one
    user.password = hash;
    next();
  } catch (error) {
    next(error);
  }
});

// Add a method to compare the passwords
UserSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (error) {
    return false;
  }
};

module.exports = mongoose.model('User', UserSchema);
