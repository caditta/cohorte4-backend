// routes/hotelRoutes.js
const express = require('express');
const hotelController = require('../controllers/hotelController'); // Asegúrate de tener este controlador
const router = express.Router();

// Ruta para crear un nuevo hotel
router.post('/hotels', hotelController.createHotel);
router.get('/hotels', hotelController.getAllHotels);

module.exports = router;
