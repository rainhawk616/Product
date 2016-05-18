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
            },
            userid: {
                type: Sequelize.INTEGER,
                allowNull: true
            }
        },
        {
            tableName: 'products',
            timestamps: true,
            paranoid: true,
            classMethods: {
                associate: function (models) {
                    Product.belongsTo(models.User, {
                        onDelete: "CASCADE",
                        foreignKey: {
                            name: 'userid',
                            allowNull: false
                        }
                    });
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
            },
            validate: {
                useridCheck: function() {
                    if(this.userid !== null && this.userid !== undefined && this.approved)
                        throw new Error("Userid can't be set if this is approved");
                }
            }
        }
    );

    return Product;
};
