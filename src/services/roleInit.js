const Role = require('../models/role');

const roleInit = async () => {
  try {
    const roles = [
      { roleName: 'admin' },
      { roleName: 'normal' },
      { roleName: 'premium' },
      { roleName: 'autre'},
    ];

    for (let i = 0; i < roles.length; i++) {
      const existingRole = await Role.findOne({ roleName: roles[i].roleName });

      if (!existingRole) {
        const newRole = new Role(roles[i]);
        await newRole.save();
        console.log(`Role ${roles[i].roleName} created successfully`);
      } else {
        console.log(`Role ${roles[i].roleName} already exists`);
      }
    }
  } catch (error) {
    console.error('Error occurred while creating roles:', error);
  }
};

module.exports = roleInit;
