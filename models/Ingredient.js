"use strict";

var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');

module.exports = function (sequelize, DataTypes) {
    var Ingredient = sequelize.define("Ingredient",
        {
            ingredientid: {
                type: Sequelize.INTEGER,
                primaryKey: true, autoIncrement: true,
                allowNull: false
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            }
        },
        {
            tableName: 'ingredients',
            timestamps: true,
            paranoid: true,
            classMethods: {
                associate: function (models) {
                    Ingredient.hasMany(models.ProductIngredient, {
                            foreignKey: {
                                name: 'ingredientid',
                                allowNull: false
                            }
                        }
                    )
                }
            }
        }
    );

    return Ingredient;
};
