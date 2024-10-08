const db = require('../config/db'); // Asegúrate de que la ruta a tu archivo db.js sea correcta
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Función para registrar un nuevo usuario
const registerUser = (req, res) => {
  const { usuario,email, password } = req.body;
  // Agregar logs para depurar
  console.log("Usuario:", usuario);
  console.log("Email:", email);
  console.log("Password:", password);

  // Validar que el email y la contraseña no estén vacíos
  if (!email || !password || !usuario) {
    return res.status(400).json({ message: 'El email y la contraseña son obligatorios.' });
  }
  // Verificar si el usuario ya existe
  db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Error al verificar el usuario:', err);
      return res.status(500).json({ message: 'Error en el servidor' });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Hashear la contraseña
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error('Error al hashear la contraseña:', err);
        return res.status(500).json({ message: 'Error en el servidor' });
      }

      // Crear un nuevo usuario
      db.query(
        'INSERT INTO usuarios (nombre_usuario, email, contrasena) VALUES (?, ?, ?)',[usuario, email, hashedPassword],(err) => {
        if (err) {
          console.error('Error al registrar el usuario:', err);
          return res.status(500).json({ message: 'Error en el servidor' });
        }
        res.status(201).json({ message: 'Usuario registrado con éxito' });
      });
    });
  });
};

// Función para iniciar sesión
const loginUser = (req, res) => {
  // console.log('Iniciando sesión con:', req.body); // Agrega esta línea para depuración
  const { email, password } = req.body;
  console.log("Intentando iniciar sesión con email:", email);
  console.log("Intentando iniciar sesión con email:", email);
  db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Error al verificar el usuario:', err);
      return res.status(500).json({ message: 'Error en el servidor' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const user = results[0];

    // Comparar contraseñas
    bcrypt.compare(password, user.contrasena, (err, isMatch) => {
      if (err) {
        console.error('Error al comparar las contraseñas:', err);
        return res.status(500).json({ message: 'Error en el servidor' });
      }

      if (!isMatch) {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
      }

      const token = jwt.sign({ id: user.id_usuario, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.status(200).json({ token, id: user.id_usuario, email: user.email, message: 'Inicio de sesión exitoso' });
    });
  });
};


// Exportar funciones
module.exports = {
  registerUser,
  loginUser,
};
