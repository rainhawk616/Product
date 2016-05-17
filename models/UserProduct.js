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
                    UserProduct.hasMany(models.UserProductResultType, {
                            foreignKey: {
                                name: 'userproductresulttypeid',
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