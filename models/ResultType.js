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
                allowNull: false
            },
            good: {
                type: Sequelize.BOOLEAN,
                allowNull: true
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