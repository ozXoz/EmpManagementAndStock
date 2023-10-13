const User = require('../models/User');
const jwt = require('jsonwebtoken'); // Ensure you have jwt

// Handle user registration
exports.register = async (req, res) => {
  try {
    // Create a new user instance
    const user = new User(req.body);

    // Save the user in the database
    await user.save();

    // Respond with the created user
    res.status(201).send({ user });
  } catch (error) {
    res.status(400).send(error);
  }
};

// ... other imports and code

exports.login = async (req, res) => {
  try {
    // Validate user credentials
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).send({ message: 'Login failed! Check authentication credentials' });
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(400).send({ message: 'Invalid username/password' });
    }

    // Create a token
    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d', // token will expire in 1 day
    });

    // Respond with token and role
    res.send({
      user,
      token,
      message: user.role === 'admin' ? 'Logged in as admin' : 'Logged in as user',
    }); 
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

// ... other exports
