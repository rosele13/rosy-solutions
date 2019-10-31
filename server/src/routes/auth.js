const express    = require('express');
const authRoutes = express.Router();
const session      = require('express-session');

const passport   = require('passport');
LocalStrategy = require('passport-local').Strategy
const bcrypt     = require('bcryptjs');

// require the user model !!!!
const User       = require('../models/user');
passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }

        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  ));

authRoutes.post('/signup', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (!username || !password) {
      res.status(400).json({ message: 'Provide username and password' });
      return;
    }

    if(password.length < 7){
        res.status(400).json({ message: 'Please make your password at least 8 characters long for security purposes.' });
        return;
    }
  
    User.findOne({ username }, (err, foundUser) => {
        if(err){
            res.status(500).json({message: "Username check went bad."});
            return;
        }

        if (foundUser) {
            res.status(400).json({ message: 'Username taken. Choose another one.' });
            return;
        }
  
        const salt     = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password, salt);
        
        User.create({
            username: username,
            password: hashPass,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email
        })
        .then((aNewUser)=>{

            // Automatically log in user after sign up
            // .login() here is actually predefined passport method
            req.login(aNewUser, (err) => {
                if (err) {
                    res.status(500).json({ message: 'Login after signup went bad.' });
                    return;
                }
                req.session.user = aNewUser;
                // Send the user's information to the frontend
                // We can use also: res.status(200).json(req.user);
                res.status(200).json(aNewUser);
            });
        })
        .catch(err => console.log(err))
    });
});
// POST route => to log a user in 
authRoutes.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, failureDetails) => {
        if (err) {
            res.status(500).json({ message: 'Something went wrong authenticating the user' });
            return;
        }
        if (!user) {
            res.status(401).json(failureDetails);
            return;
        }

        // save user in session
        req.login(user, (err) => {
            if (err) {
                res.status(500).json({ message: 'Something went wrong with saving the session.' });
                return;
            }

            // We are now logged in (that's why we can also send req.user)
            res.status(200).json(user);
        });
    })(req, res, next);
});
// GET route => to log a user out
authRoutes.get('/logout', (req, res, next) => {
    // req.logout() is defined by passport
    req.logout();
    res.status(200).json({ message: 'Log out success!' });
});

module.exports = authRoutes;