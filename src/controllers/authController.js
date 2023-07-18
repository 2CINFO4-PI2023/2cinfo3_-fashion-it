require('dotenv').config();

const passport= require('passport')
const user = require("../models/user");
const Role = require("../models/role");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendCreationEmail  = require('../services/mailService');
const secretKey = process.env.JWT_SECRET_KEY;
const register = (req, res, next) => {
  const roleName = req.body.rolename;
  Role
    .findOne({ name: roleName })
    .then((foundRole) => {
      if (!foundRole) {
        return res.status(404).json({
          message: 'Role not found',
        });
      }

      bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
        if (err) {
          return res.status(500).json({
            error: err,
          });
        }

        let newUser = new user({
          username: req.body.username,
          email: req.body.email,
          password: hashedPass,
          adresse: req.body.adresse,
          age: req.body.age,
          phone: req.body.phone,
          genre: req.body.genre,
          role: foundRole._id,
        });
        let emailDetails = {
          username: req.body.username,
          password: req.body.password,
          email: req.body.email,
        }
        newUser
          .save()
          .then((response) => {
            sendCreationEmail(emailDetails);
            res.status(201).json({
              message: 'User added successfully',
            });
          })
          .catch((error) => {
            res.status(409).json({
              message: `Error occurred ${error}`,
            });
          });
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: `Error occurred while finding role: ${error}`,
      });
    });
};

const login = (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;

  user.findOne({ $or: [{ username: username }, { email: username }] })
    .then(foundUser => {
      if (foundUser) {
        bcrypt.compare(password, foundUser.password, function (err, result) {
          if (err) {
            res.status(500).json({
              message: `${err}`,
            });
          }
          else if (result) {
            console.log(foundUser.role);
            Role.findOne( {_id:foundUser.role})
              .then(foundRole => {
                console.log(foundRole)
                let tokenPayload = {
                  username: foundUser.username,
                  email: foundUser.email,
                  role: foundRole.rolename 
                };

                let token = jwt.sign(tokenPayload, secretKey, { expiresIn: '2h' });
                res.status(200).json({
                  message: 'Logged In OK',
                  token
                });
              })
              .catch(error => {
                res.status(500).json({
                  message: `Error finding role: ${error}`,
                });
              });
          } 
          else {
            res.status(403).json({
              message: 'Password mismatch',
            });
          }
        });
      } 
      else {
        res.status(404).json({
          message: 'User not found',
        });
      }
    });
};



module.exports = {
  register,
  login,
};
