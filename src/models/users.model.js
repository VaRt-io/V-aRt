// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const users = sequelizeClient.define('users', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profileImageUrl: {
      type: DataTypes.STRING,
      defaultValue: 'https://uploads5.wikiart.org/images/salvador-dali.jpg!Portrait.jpg'
    },
    bio: {
      type: DataTypes.TEXT
    },
    googleId: { type: Sequelize.STRING },
    facebookId: { type: Sequelize.STRING },

  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  users.associate = function (models) { // eslint-disable-line no-unused-vars
    const galleries = models.galleries;
    users.hasMany(galleries);
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return users;
};
