// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const images = sequelizeClient.define('images', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    jpeg: {
      type: DataTypes.BLOB,
      allowNull: false
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  images.associate = function (models) { // eslint-disable-line no-unused-vars
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    const users = models.users;
    const galleries = models.galleries;
    // Does image need to belong to user if it belongs to a gallery?
    images.belongsTo(users);
    images.belongsTo(galleries);
  };

  return images;
};
