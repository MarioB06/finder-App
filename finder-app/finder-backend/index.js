const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Beispiel-Route
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// Server starten
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});

// MongoDB-Verbindung
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

