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
                allowNull: false,
                unique: true
            },
            approved: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                default: false
            },
            userid: {
                type: Sequelize.INTEGER,
                allowNull: true
            }
        },
        {
            tableName: 'ingredients',
            timestamps: true,
            paranoid: true,
            classMethods: {
                associate: function (models) {
                    Ingredient.belongsTo(models.User, {
                        onDelete: "CASCADE",
                        foreignKey: {
                            name: 'userid',
                            allowNull: false
                        }
                    });
                    Ingredient.hasMany(models.ProductIngredient, {
                            foreignKey: {
                                name: 'ingredientid',
                                allowNull: false
                            }
                        }
                    )
                }
            },
            validate: {
                useridCheck: function() {
                    if(this.userid !== null && this.userid !== undefined && this.approved)
                        throw new Error("Userid can't be set if this is approved");
                }
            }
        }
    );

    return Ingredient;
};
