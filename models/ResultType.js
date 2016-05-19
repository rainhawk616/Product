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
                    ResultType.belongsTo(models.User, {
                        onDelete: "CASCADE",
                        foreignKey: {
                            name: 'userid',
                            allowNull: false
                        }
                    });
                    ResultType.hasMany(models.UserProductResultType, {
                            foreignKey: {
                                name: 'userproductresulttypeid',
                                allowNull: false
                            }
                        }
                    );
                },
                validate: {
                    useridCheck: function() {
                        if(this.userid !== null && this.userid !== undefined && this.approved)
                            throw new Error("Userid can't be set if this is approved");
                    }
                }
            }
        }
    );

    return ResultType;
};