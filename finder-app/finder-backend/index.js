const express = require('express');
const app = express();
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
app.use(express.json());
app.use('/api/auth', authRoutes);

// Beispiel-Route
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// Server starten
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
console.log('Mongo URI:', process.env.MONGO_URI);

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

