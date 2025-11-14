// --- server/controllers/authController.js ---

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// --- 1. REGISTER (SIGN UP) LOGIC ---
exports.register = async (req, res) => {
  try {
    // Check if user already exists
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      communityCode: req.body.communityCode,
    });

    // Save user to the database
    const savedUser = await newUser.save();

    // Send back a success response (don't send the password!)
    res.status(201).json({ message: 'User registered successfully!' });

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

// --- 2. LOGIN LOGIC ---
exports.login = async (req, res) => {
  try {
    // Find the user by their email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create a JSON Web Token (JWT)
    // This token is a "ticket" the user can use to prove they are logged in
    const token = jwt.sign(
      { id: user._id, community: user.communityCode },
      process.env.JWT_SECRET, // We need to add this to our .env file!
      { expiresIn: '1d' } // Token is good for 1 day
    );

    // Send back the token
    res.status(200).json({
      message: 'Login successful!',
      token: token,
      user: {
        id: user._id,
        username: user.username,
      }
    });

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};