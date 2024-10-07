const express = require('express');
const app = express();

// Beispiel-Route
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// Server starten
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
