var models = require("../models/");
var sequelize = require('../models/index').sequelize;
var Sequelize = require('../models/index').Sequelize;
var Promise = require("bluebird");

module.exports = {
    registerRoutes: function (app, passportConfig) {
        app.get('/admin/dashboard', passportConfig.isAdminAuthorized, this.dashboard);
        app.get('/admin/products', passportConfig.isAdminAuthorized, this.products);
        app.get('/admin/brands', passportConfig.isAdminAuthorized, this.brands);
        app.get('/admin/ingredients', passportConfig.isAdminAuthorized, this.ingredients);
        app.get('/admin/resulttypes', passportConfig.isAdminAuthorized, this.resulttypes);
        app.get('/admin/resulttype', passportConfig.isAdminAuthorized, this.resultTypeCreate);
        app.post('/admin/resulttype', passportConfig.isAdminAuthorized, this.resultTypeCreatePost);
    },
    dashboard: function (req, res, next) {
        res.render('admin/dashboard', {
            title: 'Dashboard'
        });
    },
    products: function (req, res, next) {
        models.Product.findAll({
            include: [models.Brand],
            order: [['name', 'DESC']]
        }).then(function (products) {
            res.render('admin/products', {
                title: 'Products',
                products: products
            });
        });
    },
    brands: function (req, res, next) {
        models.Brand.findAll({
            order: [['name', 'DESC']]
        }).then(function (brands) {
            res.render('admin/brands', {
                title: 'Brands',
                brands: brands
            });
        });
    },
    ingredients: function (req, res, next) {
        models.Ingredient.findAll({
            order: [['name', 'DESC']]
        }).then(function (ingredients) {
            res.render('admin/ingredients', {
                title: 'Ingredient',
                ingredients: ingredients
            });
        });
    },
    resulttypes: function (req, res, next) {
        models.ResultType.findAll({
            order: [['description', 'DESC']]
        }).then(function (resultTypes) {
            res.render('admin/resultTypes', {
                title: 'Result Types',
                resultTypes: resultTypes
            });
        });
    },
    resultTypeCreate: function (req, res, next) {
        console.log(req.body);
        res.render('admin/resulttypecreate', {
            title: "Result Type"
        });
    },
    resultTypeCreatePost: function (req, res, next) {
        req.check('description', 'Description is required').notEmpty();
        req.sanitize('approved').toBoolean();

        var errors = req.validationErrors();

        if (errors) {
            req.flash('errors', errors);
            req.session.save(function () {
                return res.redirect('/admin/resulttype');
            });
        }
        else {
            models.ResultType.create({
                description: req.body.description,
                approved: req.body.approved
            }).then(function (resultType) {
                req.flash('success', {msg: resultType.description + ' successfully created!'});
                req.session.save(function () {
                    res.redirect('/admin/resulttypes');
                });
            }).catch(function (err) {
                req.flash('errors', {msg: 'An error occured while creating' + resultType.description});
                req.session.save(function () {
                    res.body(req.body);
                    res.redirect('/admin/resulttype');
                });
            });
        }
    }
};
