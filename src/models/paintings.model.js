// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const paintings = sequelizeClient.define('paintings', {
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 0
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  paintings.associate = function (models) { // eslint-disable-line no-unused-vars
    // Define associations here
    const {users, galleries} = models;
    paintings.belongsTo(galleries);
    paintings.belongsTo(users);
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return paintings;
};
