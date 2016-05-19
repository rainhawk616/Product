"use strict";

var Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    var UserProductResult = sequelize.define("UserProductResult", {
            userproductresultid: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            userproductid: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            resultid: {
                type: Sequelize.INTEGER,
                allowNull: false
            }
        },
        {
            tableName: 'userproductresults',
            timestamps: true,
            paranoid: true,
            classMethods: {
                associate: function (models) {
                    UserProductResult.belongsTo(models.UserProduct, {
                        onDelete: "CASCADE",
                        foreignKey: {
                            name: 'userproductid',
                            allowNull: false
                        }
                    });
                    UserProductResult.belongsTo(models.Result, {
                        onDelete: "CASCADE",
                        foreignKey: {
                            name: 'resultid',
                            allowNull: false
                        }
                    });
                }
            }
        }
    );

    return UserProductResult;
};