'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  };
  User.init({
    pseudo: DataTypes.STRING,
    countDeath: DataTypes.INTEGER,
    maxDeath: DataTypes.INTEGER,
  }, {
    sequelize,
    //! Nom du modèle commence par une majuscule et sur la bdd il dois finir avec un s
    modelName: 'User',
  });
  return User;
};