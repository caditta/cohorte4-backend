const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const hotelRoutes = require('./routes/hotelRoutes'); // Ruta a tus rutas de autenticación

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Usar las rutas de autenticación
app.use('/api/auth', authRoutes);
app.use('/api', hotelRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
