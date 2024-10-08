const bcrypt = require('bcryptjs');

const password = '123456789010'; // Cambia esto por la contraseña que quieras
bcrypt.hash(password, 10, (err, hash) => {
    if (err) throw err;
    console.log(hash); // Este es el hash que puedes usar al insertar en la base de datos
});
