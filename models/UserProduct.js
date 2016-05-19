"use strict";

var Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    var UserProduct = sequelize.define("UserProduct", {
            userproductid: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            userid: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            productid: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            used: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                default: false
            },
            good: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
                default: null
            }
        },
        {
            tableName: 'userproducts',
            timestamps: true,
            paranoid: true,
            classMethods: {
                associate: function (models) {
                    UserProduct.belongsTo(models.User, {
                        onDelete: "CASCADE",
                        foreignKey: {
                            name: 'userid',
                            allowNull: false
                        }
                    });
                    UserProduct.belongsTo(models.Product, {
                        onDelete: "CASCADE",
                        foreignKey: {
                            name: 'productid',
                            allowNull: false
                        }
                    });
                    UserProduct.hasMany(models.UserProductResult, {
                            foreignKey: {
                                name: 'userproductresultid',
                                allowNull: false
                            }
                        }
                    );
                }
            }
        }
    );

    return UserProduct;
};