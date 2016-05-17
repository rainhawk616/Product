"use strict";

var Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    var UserProductResultType = sequelize.define("UserProductResultType", {
            userproductresulttypeid: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            userproductid: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            resulttypeid: {
                type: Sequelize.INTEGER,
                allowNull: false
            }
        },
        {
            tableName: 'userproductresulttypes',
            timestamps: true,
            paranoid: true,
            classMethods: {
                associate: function (models) {
                    UserProductResultType.belongsTo(models.UserProduct, {
                        onDelete: "CASCADE",
                        foreignKey: {
                            name: 'userproductid',
                            allowNull: false
                        }
                    });
                    UserProductResultType.belongsTo(models.ResultType, {
                        onDelete: "CASCADE",
                        foreignKey: {
                            name: 'resulttypeid',
                            allowNull: false
                        }
                    });
                }
            }
        }
    );

    return UserProductResultType;
};