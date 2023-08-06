const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config =require('../config/config')
const User = require('../models/user');

exports.signup = (req, res) => {
  const { name, email, password } = req.body;

  // Check if the user with the given email already exists
  User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(409).json({ error: 'Email already exists. Please choose a different one.' });
      }

      // Hash the password before storing it in the database
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          return res.status(500).json({ error: 'An error occurred while hashing the password.' });
        }

        // Create a new user with the hashed password and set isAdmin to true for an admin user (if needed)
        const newUser = new User({ name, email, password: hashedPassword, isAdmin: false });

        // Save the user in the database
        newUser
          .save()
          .then((user) => {
            res.status(201).json({ message: 'User registered successfully.', user });
          })
          .catch((saveErr) => {
            res.status(500).json({ error: 'An error occurred while saving the user.' });
          });
      });
    })
    .catch((findErr) => {
      res.status(500).json({ error: 'An error occurred while finding the user.' });
    });
};


//login logic 

exports.login = (req, res) => {
    const { email, password } = req.body;
  
    // Find the user with the given email
    User.findOne({ email })
      .then((user) => {
        if (!user) {
          return res.status(401).json({ error: 'Invalid credentials.' });
        }
  
        // Compare the provided password with the hashed password in the database
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            return res.status(500).json({ error: 'An error occurred while comparing passwords.' });
          }
  
          if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials.' });
          }
  
          // Passwords match, user is authenticated
          // Generate and send a JWT token in the response
          const token = jwt.sign({ id: user._id, name: user.name, email: user.email }, config.JWT_SECRET, {
            expiresIn: '1d', // Token expiration time
          });
  
          res.json({ message: 'User authenticated successfully.', user, token });
        });
      })
      .catch((findErr) => {
        res.status(500).json({ error: 'An error occurred while finding the user.' });
      });
  };