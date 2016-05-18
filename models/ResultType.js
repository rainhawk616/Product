"use strict";

var Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    var ResultType = sequelize.define("ResultType", {
            resulttypeid: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            description: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            good: {
                type: Sequelize.BOOLEAN,
                allowNull: true
            },
            approved: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                default: false
            }
        },
        {
            tableName: 'resulttypes',
            timestamps: true,
            paranoid: true,
            classMethods: {
                associate: function (models) {
                    ResultType.hasMany(models.UserProductResultType, {
                            foreignKey: {
                                name: 'userproductresulttypeid',
                                allowNull: false
                            }
                        }
                    )
                }
            }
        }
    );

    return ResultType;
};