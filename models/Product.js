"use strict";

var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');

module.exports = function (sequelize, DataTypes) {
    var Product = sequelize.define("Product",
        {
            productid: {
                type: Sequelize.INTEGER,
                primaryKey: true, autoIncrement: true,
                allowNull: false
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            brand: {
                type: Sequelize.STRING,
                allowNull: true
            },
            description: {
                type: Sequelize.STRING,
                allowNull: true
            }
        },
        {
            tableName: 'products',
            timestamps: true,
            paranoid: true,
            classMethods: {
                associate: function (models) {
                    Product.hasMany(models.ProductIngredient, {
                            foreignKey: {
                                name: 'productid',
                                allowNull: false
                            }
                        }
                    );
                }
            }
        }
    );

    return Product;
};
