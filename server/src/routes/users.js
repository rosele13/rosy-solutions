const express = require('express');
const mongoose = require('mongoose');
const router  = express.Router();

const User = require('../models/user');


// GET route => to get session user and populate
router.get('/:id', (req, res, next) => {
  User.findById(req.params.id)
        .then(user => {
          res.json(user);
          
        })
        .catch(err => {
          res.json(err.message);
        })
});

// POST route => edit user info
router.post('/:id/edit', (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, {
        cocktails: req.body.cocktails
      })
      .then(user => {
        res.json(user);
      })
      .catch(err => {
        res.json(err.message);
      })
});

  module.exports = router;