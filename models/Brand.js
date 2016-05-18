"use strict";

var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');

module.exports = function (sequelize, DataTypes) {
    var Brand = sequelize.define("Brand",
        {
            brandid: {
                type: Sequelize.INTEGER,
                primaryKey: true, autoIncrement: true,
                allowNull: false
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            approved: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                default: false
            },
            userid: {
                type: Sequelize.INTEGER,
                allowNull: true,
                default: null
            }
        },
        {
            tableName: 'brands',
            timestamps: true,
            paranoid: true,
            classMethods: {
                associate: function (models) {
                    Brand.belongsTo(models.User, {
                        onDelete: "CASCADE",
                        foreignKey: {
                            name: 'userid',
                            allowNull: false
                        }
                    });
                    Brand.hasMany(models.Product, {
                            foreignKey: {
                                name: 'brandid',
                                allowNull: false
                            }
                        }
                    );
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

    return Brand;
};
