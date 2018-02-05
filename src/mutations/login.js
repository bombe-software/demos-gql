//Librerias y configuraciones requeridas
const passport = require('passport');

//Funcion
function login({ email, password, req }) {
  // Area de validaciones

  if (!email || !password) {
    throw new Error('Email y password son requeridos');
  }
  if (email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    throw new Error('Correo inválido');
  }

  //Area del resolver
  return new Promise((resolve, reject) => {
    passport.authenticate('local', (err, user) => {
      if (!user) { reject('Password o email incorrecto.') }

      req.login(user, () => resolve(user));
    })({ body: { email, password } });
  });
}

//Se exporta la funcion
module.exports = { login };