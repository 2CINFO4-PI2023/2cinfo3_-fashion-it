const role = require("../models/role");
const user = require("../models/user")
const findAll = (req, res, next) => {
    role
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

const findRole = (req, res, next) => {
    let roleid = req.body.roleID;
    role
        .findById(roleid)
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

const addRole = (req, res, next) => {
    let newRole = new role({
        roleName: req.body.roleName,
    });
    newRole
        .save()
        .then((response) => {
            res.status(201).json({
                message: 'Role added successfully',
            });
        })
        .catch((error) => {
            res.status(409).json({
                message: `Error occurred ${error}`,
            });
        });
};

const editRole = (req, res, next) => {
    let roleId = req.body.roleID;
    let roleData = {
        roleName: req.body.roleName,
    };
    role
        .findByIdAndUpdate(roleId, { $set: roleData })
        .then((response) => {
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

// const deleteRole = (req, res, next) => {
//   let roleID = req.body.userID;
//   role
//     .findOneAndRemove(userID)
//     .then((response) => {
//       res.json({
//         message: 'Deleted successfully',
//       });
//     })
//     .catch((error) => {
//       res.json({
//         message: `An error occurred ${error}`,
//       });
//     });
// };
const findRoleID = (roleName) => {
    return role.findOne({ roleName: roleName })
      .then((foundRole) => {
        if (foundRole) {
          return foundRole._id;
        } else {
          throw new Error('Role not found');
        }
      })
      .catch((error) => {
        throw new Error(`An error occurred while finding the role: ${error}`);
      });
  };
  
  const deleteRole = (req, res, next) => {
    let roleID ;
     findRoleID(req.body.roleName).then(
  (response)=>{
   roleID = response;
   role.findById(roleID)
   .then((foundRole) => {
     if (!foundRole) {
       return res.status(404).json({
         message: 'Role not found',
       });
     }
     if (foundRole.roleName === 'autre' || foundRole.roleName === 'admin'  ) {
       return res.status(500).json({
         message: 'Cannot Delete autre or admin',
       });
     }

     findRoleID('autre')
       .then((newRoleID) => {
         user.updateMany({ role: roleID }, { role: newRoleID })
           .then(() => {
             role.findByIdAndRemove(roleID)
               .then(() => {
                 res.status(200).json({
                   message: 'Deleted successfully',
                 });
               })
               .catch((error) => {
                 res.status(500).json({
                   message: `An error occurred while deleting the role: ${error}`,
                 });
               });
           })
           .catch((error) => {
             res.status(500).json({
               message: `An error occurred while updating the users: ${error}`,
             });
           });
       })
       .catch((error) => {
         res.status(500).json({
           message: `An error occurred while finding the new role: ${error}`,
         });
       });
   })
   .catch((error) => {
     res.status(500).json({
       message: `An error occurred while finding the role: ${error}`,
     });
   });
  }).catch((error)=>{
    res.status(500).json({
      message: `Role name is incorrect or role not found: ${error}`,
    });
  })
  
    
  };
  
module.exports = {
    findAll,
    findRole,
    addRole,
    deleteRole,
    editRole,
};
