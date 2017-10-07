// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const galleries = sequelizeClient.define('galleries', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    thumbnailUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/The_Scream.jpg/220px-The_Scream.jpg'
    },
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  galleries.associate = function (models) { // eslint-disable-line no-unused-vars
    const {users, paintings} = models;
    galleries.belongsTo(users);
    galleries.hasMany(paintings);
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return galleries;
};
