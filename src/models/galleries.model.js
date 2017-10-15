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
      allowNull: true,
      defaultValue: 'https://www.moma.org/wp/moma_learning/wp-content/uploads/2012/07/Van-Gogh.-Starry-Night-469x376.jpg'
    },
    environment: {
      type: DataTypes.STRING,
      defaultValue: 'nightscene'
    },
    environmentPic: {
      type: DataTypes.STRING,
      defaultValue: 'http://www.kansascyclist.com/img/photos/KansasCyclingPhotos_005.jpg'
    }
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
