/**
 * Mongoose
 */
const mongoose = require('mongoose');
const User = mongoose.model('usuario');
const CryptoJS = require('crypto-js');
/**
 * passport
 */
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  User.findOne({ email: email.toLowerCase() }, (err, user) => {
    if (err) { return done(err); }
    if (!user) { return done(null, false, 'Password o email incorrecto'); }
    let bytes = CryptoJS.AES.decrypt(password, 'jaiba');
    let ticketDecript = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    if(ticketDecript.date.toString()  != (new Date().getMonth() + "/" + new Date().getFullYear())){
      return done(null, false, 'Password o email incorrecto'); 
    }
    return done(null, user);
  });
}));