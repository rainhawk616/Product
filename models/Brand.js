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
            }
        },
        {
            tableName: 'brands',
            timestamps: true,
            paranoid: true,
            classMethods: {
                associate: function (models) {
                    Brand.hasMany(models.Product, {
                            foreignKey: {
                                name: 'brandid',
                                allowNull: false
                            }
                        }
                    );
                }
            }
        }
    );

    return Brand;
};
