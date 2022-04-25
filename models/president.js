'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class PlayerPresident extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        }
    };
    PlayerPresident.init({
        idDiscord: DataTypes.STRING,
        score: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'player_president',
    });
    return PlayerPresident;
};