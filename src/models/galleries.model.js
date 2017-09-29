// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const galleries = sequelizeClient.define('galleries', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  galleries.associate = function (models) { // eslint-disable-line no-unused-vars
    const users = models.users;
    const images = models.images;
    galleries.belongsTo(users);
    galleries.hasMany(images);
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return galleries;
};
