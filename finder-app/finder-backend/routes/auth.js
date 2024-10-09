const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Registrierungsroute
router.post('/register', async (req, res) => {
    const { email, password, passwordConfirm } = req.body;
  
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
        return res.status(400).send('E-Mail bereits registriert.');
    }

    if (password === passwordConfirm) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ email, password: hashedPassword });
      await newUser.save();
      res.status(201).send('Registriert');
    } else {
      res.status(400).send('Passwort richtig bestätigen');
    }
  });

// Login-Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
  
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send('Falsche Anmelde Daten');
    }
  
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const timestamp = new Date();
  
    res.json({ token, timestamp });
  });
  

module.exports = router;

