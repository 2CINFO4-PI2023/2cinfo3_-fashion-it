const user = require("../models/user");
const role = require("../models/role");
const sendCreationEmail  = require('../services/mailService');

const findAll = (req, res, next) => {
    user
        .find()
        .then((response) => {
            res.status(200).json({
                response,
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: `An error has occurred ${error}`,
            });
        });
};

const findUser = (req, res, next) => {
    let userID = req.body.userID;
    user
        .findById(userID)
        .then((response) => {
            res.status(200).json({
                response,
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: `An error occurred ${error}`,
            });
        });
};
const findUserByUsername = (req, res, next) => {
  let username = req.body.username; // Assuming the username is passed in the request body
  user
    .findOne({ username: username })
    .then((response) => {
      res.status(200).json({
        response,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: `An error occurred ${error}`,
      });
    });
};


const addUser = (req, res, next) => {
    const roleName = req.body.rolename;
    role
      .findOne({ name: roleName })
      .then((foundRole) => {
        if (!foundRole) {
          return res.status(404).json({
            message: 'Role not found',
          });
        }
  
        const newUser = new user({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          adresse: req.body.adresse,
          age: req.body.age,
          genre: req.body.genre,
          role: foundRole._id,
        });
  
        newUser
          .save()
          .then(() => {
            sendCreationEmail (newUser)
            res.status(201).json({
              message: 'User added successfully',
            });
          })
          .catch((error) => {
            res.status(409).json({
              message: `Error occurred ${error}`,
            });
          });
      })
      .catch((error) => {
        res.status(500).json({
          message: `Error occurred while finding role: ${error}`,
        });
      });
  };
  
  

const editUser = (req, res, next) => {
    let userId = req.body._id;
    console.log(userId)
    let userData = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        adresse: req.body.adresse,
        age: req.body.age,
        phone: req.body.phone,
        genre: req.body.genre,
    };
    user
        .findByIdAndUpdate(userId, { $set: userData })
        .then(() => {
            res.status(200).json({
                message: 'Updated successfully',
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: `Error occurred ${error}`,
            });
        });
};

const deleteUser = (req, res, next) => {
    let userID = req.body.userID;
    user
        .findOneAndRemove(userID)
        .then((response) => {
            res.status(200).json({
                message: 'Deleted successfully',
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: `An error occurred ${error}`,
            });
        });
};



const activatePremium = (req, res) => {
  const userID = req.body._id;

  user.findById(userID)
    .populate('role')
    .exec()
    .then(user => {
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      if (user.premium === 'yes') {
        return res.status(200).json({
          success: false,
          message: 'User is already a premium user'
        });
      }

      if (user.role.name !== 'premium') {
        return res.status(409).json({
          success: false,
          message: 'User is not a premium member'
        });
      }

      user.premium = 'yes';
      user.save()
        .then(updatedUser => {
          res.status(200).json({
            success: true,
            message: 'User premium activated',
            user: updatedUser
          });
        })
        .catch(error => {
          res.status(500).json({
            success: false,
            message: 'Failed to activate user premium',
            error: error.message
          });
        });
    })
    .catch(error => {
      res.status(500).json({
        success: false,
        message: 'Failed to find user',
        error: error.message
      });
    });
};


module.exports = {
    findAll,
    findUser,
    addUser,
    deleteUser,
    editUser,
    activatePremium,
    findUserByUsername
};
