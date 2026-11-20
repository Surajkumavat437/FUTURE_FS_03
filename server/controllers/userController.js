const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Ensure this path is correct!

// @desc    Auth user & get token
// @route   POST /api/users/login
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  const admin = await User.findOne({ email });

  if (admin && (await admin.matchPassword(password))) {
    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      token: jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
      }),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

module.exports = { loginAdmin };