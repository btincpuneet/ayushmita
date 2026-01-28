// const express = require('express');
// const router = express.Router();
// const { User } = require('../../models/index.js');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// const JWT_SECRET = 'erewrewrwr4445';

// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     console.log('Login request:', { email, password });

//     console.log("Attempting to find user with email:", email);
//     const user = await User.findOne({ where: { email } });
//     console.log("User found:", user);



//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

//     res.json({
//       success: true,
//       message: 'Login successful',
//       token,
//       user: {
//         id: user.id,
//         email: user.email,
//         role: user.role
//       },
//       expiresIn: '1h'
//     });
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) return res.sendStatus(401);

//   jwt.verify(token, JWT_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// };

// router.post('/logout', authenticateToken, (req, res) => {
//   res.json({ message: 'Logout successful' });
// });

// router.get('/users', async (req, res) => {
//   try {
//     console.log('111');
//     const users = await User.findAll();
//     res.status(200).json(users);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// router.get('/users/:id', async (req, res) => {
//   const userId = req.params.id;

//   try {
//     const user = await User.findByPk(userId);

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const transformedUser = {
//       id: user.id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//     };
//     res.json({ user: transformedUser });
//   } catch (error) {
//     console.error('Error fetching user:', error);
//     res.status(500).json({ message: 'Internal server error', error });
//   }
// });



// router.put('/users/:id', async (req, res) => {

//   const { id } = req.params;
//   const { name, email, password, role } = req.body;
//   try {
//     const user = await User.findByPk(id);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     if (name) user.name = name;
//     if (email) user.email = email;
//     if (role) user.role = role;

//     if (password) {
//       user.password = await bcrypt.hash(password, 10);
//     }

//     await user.save();

//     res.status(200).json({
//       message: 'User updated successfully',
//       user: {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         role: user.role
//       }
//     });
//   } catch (error) {
//     console.error('Error updating user:', error); // Log error details
//     res.status(500).json({ message: 'Internal server error', error });
//   }
// });

// router.delete('/:id', authenticateToken, async (req, res) => {
//   const { id } = req.params;

//   try {
//     const user = await User.findByPk(id);
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     await user.destroy();
//     res.json({ message: 'User deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting user:', error);
//     res.status(500).json({ message: 'Internal server error', error });
//   }
// });

// router.post('/users', async (req, res) => {
//   const { name, email, password, role, phone, city, state, zip, status } = req.body;
//   console.log(req.body);
//   try {
//     const existingUser = await User.findOne({ where: { email } });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       role,
//       phone,
//       city,
//       state,
//       zip,
//       status
//     });

//     res.status(201).json({
//       message: 'User created successfully',
//       user: {
//         id: newUser.id,
//         name: newUser.name,
//         email: newUser.email,
//         role: newUser.role
//       }
//     });
//   } catch (error) {
//     console.error('Error creating user:', error);
//     res.status(500).json({ message: 'Internal server error', error });
//   }
// });

// router.get('/splashScreenInfo', async (req, res) => {
//   try {
//     const users = await User.findAll();

//     const transformedUsers = users.map(user => ({
//       id: user.id,
//       email: user.email,
//       token: ''
//     }));

//     res.json({ users: transformedUsers });
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     res.status(500).json({ message: 'Internal server error', error });
//   }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../../models');
const { authenticateToken } = require('../../middleware/authMiddleware');

const JWT_SECRET = process.env.JWT_SECRET || 'erewrewrwr4445';


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.post('/logout', authenticateToken, (req, res) => {
  console.log('authenticateToken type:', typeof authenticateToken);

  res.json({ message: 'Logout successful' });
});


router.get('/users', authenticateToken, async (req, res) => {
  const users = await User.findAll({
    attributes: ['id', 'name', 'email']
  });
  res.json(users);
});


router.get('/users/:id', authenticateToken, async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    attributes: ['id', 'name', 'email']
  });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(user);
});


router.post('/users', authenticateToken, async (req, res) => {
  const { name, email, password, phone, city, state, zip, status } = req.body;

  const exists = await User.findOne({ where: { email } });
  if (exists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    phone,
    city,
    state,
    zip,
    status
  });

  res.status(201).json({
    message: 'User created',
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  });
});


router.put('/users/:id', authenticateToken, async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const { name, email, password } = req.body;

  if (name) user.name = name;
  if (email) user.email = email;
  if (password) user.password = await bcrypt.hash(password, 10);

  await user.save();

  res.json({ message: 'User updated successfully' });
});


router.delete('/users/:id', authenticateToken, async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  await user.destroy();
  res.json({ message: 'User deleted successfully' });
});

module.exports = router;
