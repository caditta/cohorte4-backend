// controllers/hotelController.js
const db = require('../config/db'); // Asegúrate de que esta ruta apunta a tu archivo de conexión de base de datos

// Crear un nuevo hotel
const createHotel = async (req, res) => {
    const { nombre, direccion, telefono, email, calificacion } = req.body;

  // Validar que el email y la contraseña no estén vacíos
  if (!nombre || !direccion || !telefono || !email || !calificacion) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
  }
  // Verificar si el usuario ya existe
  db.query('SELECT * FROM hotel WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Error al verificar el hotel:', err);
      return res.status(500).json({ message: 'Error en el servidor' });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: 'El hotel ya existe' });
    }
      // Crear un nuevo usuario
      db.query(
        'INSERT INTO hotel (nombre, direccion, telefono, email, estrellas) VALUES (?, ?, ?,?,?)',[nombre, direccion, telefono, email, calificacion],(err) => {
        if (err) {
          console.error('Error al registrar el hotel:', err);
          return res.status(500).json({ message: 'Error en el servidor' });
        }
        res.status(201).json({ message: 'Hotel con éxito' });
      });
    
  });

    // if (!nombre || !direccion || !telefono || !email || !calificacion) {
    //     return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    // }
    // db.query(
    //     'INSERT INTO hotel (nombre, direccion, telefono, email, estrellas) VALUES (?, ?, ?, ?, ?)',
    //         [nombre, direccion, telefono, email, calificacion],(err) => {
    //     if (err) {
    //       console.error('Error al registrar el usuario:', err);
    //       return res.status(500).json({ message: 'Error en el servidor' });
    //     }
    //     res.status(201).json({ message: 'Usuario registrado con éxito' });
    //   });

    // try {
    //     const [result] = await db.query(
    //         'INSERT INTO hotel (nombre, direccion, telefono, email, estrellas) VALUES (?, ?, ?, ?, ?)',
    //         [nombre, direccion, telefono, email, calificacion]
    //     );
        
    //     res.status(201).json({ message: 'Hotel creado con éxito', hotelId: result.insertId });
    // } catch (error) {
    //     console.error('Error al crear el hotel:', error);
    //     res.status(500).json({ message: 'Error al crear el hotel' });
    // }
};
// Controlador para obtener todos los hoteles
const getAllHotels = async (req, res) => {
    try {
        const [hotels] = await db.promise().query('SELECT * FROM hotel'); // Asegúrate de que la consulta sea correcta
        res.status(200).json(hotels);
    } catch (error) {
        console.error('Error al obtener hoteles:', error);
        res.status(500).json({ message: 'Error al obtener hoteles' });
    }
};

module.exports = {
    createHotel,
    getAllHotels,
};
