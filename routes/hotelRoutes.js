const express = require('express');
const router = express.Router();

// Ruta de ejemplo para hoteles
router.get('/', (req, res) => {
  res.send('Lista de hoteles');
});

module.exports = router;
