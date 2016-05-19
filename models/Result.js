"use strict";

var Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    var Result = sequelize.define("Result", {
            resultid: {
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
            approved: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                default: false
            }
        },
        {
            tableName: 'results',
            timestamps: true,
            paranoid: true,
            classMethods: {
                associate: function (models) {
                    Result.hasMany(models.UserProductResult, {
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

    return Result;
};