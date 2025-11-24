const express = require('express');
const router = express.Router();
const { User } = require('../../models/index.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Secret key for JWT
const JWT_SECRET = 'erewrewrwr4445';

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Log the incoming request for debugging
    console.log('Login request:', { email, password });

    // Find user by email
console.log("Attempting to find user with email:", email);
const user = await User.findOne({ where: { email } });
console.log("User found:", user);



    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        role:user.role
      },
      expiresIn: '1h'
    });
  } catch (error) {
    console.error('Login error:', error); // Log error details
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Middleware to authenticate the JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Logout route (blacklists the token)
router.post('/logout', authenticateToken, (req, res) => {
  res.json({ message: 'Logout successful' });
});

// Read all users (protected route)
router.get('/users', async (req, res) => {
  try {
    console.log('111');
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




// Fetch a single user by ID (protected route)
router.get('/users/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        // Fetch the user with the given ID from the database
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Transform the user data into the desired structure
        const transformedUser = {
            id: user.id,
            name: user.name, // Add fields as needed
            email: user.email,
            role: user.role,
            // Add more fields as required
        };

        // Return the transformed data
        res.json({ user: transformedUser });
    } catch (error) {
        console.error('Error fetching user:', error); // Log error details
        res.status(500).json({ message: 'Internal server error', error });
    }
});



// Update user (protected route)
router.put('/users/:id', async (req, res) => {
 
  const { id } = req.params;
  const { name, email, password, role } = req.body;
//console.log(req.body);
  try {
    // Find the user by ID
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;
    
    // Hash the new password if provided
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    // Save the updated user
    await user.save();

    // Send response with the updated user details
    res.status(200).json({
      message: 'User updated successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Error updating user:', error); // Log error details
    res.status(500).json({ message: 'Internal server error', error });
  }
});

// Delete a user by ID (protected route)
router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error); // Log error details
    res.status(500).json({ message: 'Internal server error', error });
  }
});

// Add a new user (protected route)
router.post('/users', async (req, res) => {
  //const { name, email, password, roll } = req.body;
  const { name, email, password, role, phone, city, state, zip, status } = req.body;
console.log(req.body);
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      phone,
      city,
      state,
      zip,
      status
    });

    // Send response with the created user details
    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    console.error('Error creating user:', error); // Log error details
    res.status(500).json({ message: 'Internal server error', error });
  }
});

// Read all users (protected route)
router.get('/splashScreenInfo', async (req, res) => {
  try {
      // Fetch all users from the database
      const users = await User.findAll();

      // Transform the data into the desired structure
      const transformedUsers = users.map(user => ({
          id: user.id,
          email: user.email,
          token: ''
          // Add more fields as required
      }));

      // Return the transformed data
      res.json({ users: transformedUsers });
  } catch (error) {
      console.error('Error fetching users:', error); // Log error details
      res.status(500).json({ message: 'Internal server error', error });
  }
});

module.exports = router;
