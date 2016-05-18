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
                allowNull: false,
                unique: true
            },
            brandid: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            description: {
                type: Sequelize.STRING,
                allowNull: true
            },
            approved: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                default: false
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
                    Product.belongsTo(models.Brand, {
                        onDelete: "CASCADE",
                        foreignKey: {
                            name: 'brandid',
                            allowNull: false
                        }
                    });
                }
            }
        }
    );

    return Product;
};
