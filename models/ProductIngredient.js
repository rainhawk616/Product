"use strict";

var Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    var ProductIngredient = sequelize.define("ProductIngredient", {
            productingredientid: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            productid: {
                type: Sequelize.INTEGER,
                allowNull: false,
                required: true
            },
            ingredientid: {
                type: Sequelize.INTEGER,
                allowNull: false,
                required: true
            }
        },
        {
            tableName: 'productingredients',
            timestamps: true,
            paranoid: true,
            classMethods: {
                associate: function (models) {
                    ProductIngredient.belongsTo(models.Product, {
                        onDelete: "CASCADE",
                        foreignKey: {
                            name: 'productid',
                            allowNull: false
                        }
                    });
                    ProductIngredient.belongsTo(models.Ingredient, {
                        onDelete: "CASCADE",
                        foreignKey: {
                            name: 'ingredientid',
                            allowNull: false
                        }
                    });
                }
            }
        }
    );

    return ProductIngredient;
};