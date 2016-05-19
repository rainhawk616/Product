var models = require("../models/");
var sequelize = require('../models/index').sequelize;
var Sequelize = require('../models/index').Sequelize;
var Promise = require("bluebird");

module.exports = {
    registerRoutes: function (app, passportConfig) {
        app.get('/user/dashboard', passportConfig.isUserAuthorized, this.dashboard);
        app.get('/user/products', passportConfig.isUserAuthorized, this.products);
        app.get('/user/product', passportConfig.isUserAuthorized, this.productcreate);
        app.post('/user/product', passportConfig.isUserAuthorized, this.productcreatepost);
        app.get('/user/product/:productid', passportConfig.isUserAuthorized, this.product);
    },
    dashboard: function (req, res, next) {
        res.render('user/dashboard', {
            title: 'Dashboard'
        });
    },
    products: function (req, res, next) {
        models.UserProduct.findAll({
            include: [
                {
                    model: models.UserProductResult,
                    include: [models.Result]
                },
                models.Product
            ],
            where: {
                'userid': req.user.userid
            },
            order: [
                [models.Product, 'name', 'DESC']
            ]
        }).then(function (userProducts) {
            res.render('user/products', {
                title: 'Products',
                userProducts: userProducts
            });
        });
    },
    product: function (req, res, next) {
        var productid = req.params.productid;
        res.render('user/product', {
            title: "Product"
        });
    },
    productcreate: function (req, res, next) {
        sequelize.Promise.all([
            models.Result.findAll(),
            models.Brand.findAll()
        ]).spread(function (results, brands) {
            res.render('user/productcreate', {
                title: "Product",
                results: results,
                brands: brands
            });
        });
    },
    productcreatepost: function (req, res, next) {

        console.log("productcreatepost:", req.body);

        req.check('name', 'Name is required').notEmpty();
        req.check('result', 'Results of using this product are required').isInt();

        var errors = req.validationErrors();

        if (errors) {
            req.flash('errors', errors);
            req.session.save(function () {
                return res.redirect('/user/product');
            });
        }
        else {

            var ingredients = [];
            for (var index in req.body.ingredients) {
                if (req.body.ingredients.hasOwnProperty(index)) {
                    ingredients.push(models.Ingredient.build({name: req.body.ingredients[index]}));
                }
            }

            sequelize.transaction(function (transaction) {
                return Promise.map(ingredients, function (item, index, length) {
                    //console.log("item[" + index + "}:", item.name);

                    return item.save({transaction: transaction, logging: true});
                    //return models.Ingredient.create(item, {transaction: transaction});
                }, {
                    concurrency: 1
                });
            }).then(function (result) {
                //console.log("result",result);
                console.log("models.Product.findAll().length:", models.Product.findAll().length);
                req.flash('success', {msg: 'Success!.'});
                req.session.save(function () {
                    res.redirect('/user/products');
                });
            }).catch(function (err) {
                // Transaction has been rolled back
                // err is whatever rejected the promise chain returned to the transaction callback
                //console.log("err:", err);
                models.Product.findAll().success(function (all) {
                    console.log("models.Product.findAll().length:", all.length);
                });

                models.User.findAll().success(function (all) {
                    console.log("models.User.findAll().length:", all.length);
                });

                req.flash('errors', {msg: "An error occured while adding your product."});
                req.session.save(function () {
                    res.redirect('/user/product');
                });
            });


            // var ingredients = [];
            // for (var index in req.body.ingredients) {
            //     if (req.body.ingredients.hasOwnProperty(index)) {
            //         ingredients.push(models.Ingredient.build(
            //             {
            //                 name: req.body.ingredients[index]
            //             }
            //         ));
            //     }
            // }
            //
            // var productIngredients = [];
            // for (var index in ingredients) {
            //     if (ingredients.hasOwnProperty(index)) {
            //         var productIngredient = models.ProductIngredient.build();
            //         productIngredient.setIngredient(ingredients[index]);
            //         productIngredients.push(productIngredient);
            //     }
            // }
            //
            // var product = models.Product.build({
            //     name: req.body.name,
            //     brand: req.body.brand,
            //     description: req.body.description
            // });
            // product.setProductIngredients(productIngredients);
            //
            // var userProductResultTypes = [models.UserProductResultType.build({resulttypeid: 1})];
            //
            // var userProduct = models.UserProduct.build();
            // userProduct.setUser(req.user);
            // userProduct.setProduct(product);
            //
            // for( var memeber in userProduct ) {
            //     console.log("userProduct.",memeber);
            // }
            //
            // userProduct.setUserProductResultTypes(userProductResultTypes);
            //
            //
            // userProduct.save().then(function (userProduct) {
            //     req.flash('success', {msg: 'Success!.'});
            //     req.session.save(function () {
            //         res.redirect('/user/products');
            //     });
            // }).catch(function (error) {
            //     req.flash('errors', {msg: 'An error occured while adding your product.'});
            //     req.session.save(function () {
            //         res.redirect('/user/product');
            //     });
            // })

//             return sequelize.transaction(function (transaction) {
//                 // chain all your queries here. make sure you return them.
//
//                 var _product;
//                 var _ingredients = [];
//                 var _userProduct;
//                 var _userProductResultType;
//
//                 var product = {
//
//                 };
//
//
//                 var userProduct = {};
//
//                 var userProductResultType = {
//                     resulttypeid: req.body.resultType
//                 };
//
//
//                 return models.Product.create(product, {transaction: transaction})
//                     .then(function (product) {
//                         _product = product;
//
//                         var ingredients = [];
//
//                         for (var index in req.body.ingredients) {
//                             if( req.body.ingredients.hasOwnProperty(index) )
//                                 ingredients.add(
//                                     {
//                                         name: req.body.ingredients[index]
//                                     }
//                                 );
//                         }
//
//                         return Promise.map(ingredients, function(item, index, length) {
//                             return models.Ingredient.create(item);
//                         }, {
//                             concurrency: 1
//                         });
//                     }).then(function (ingredients) {
//                         _ingredients = ingredients;
//
//                         var productIngredient = models.ProductIngredient.build();
//                         productIngredient.setIngredients(_ingredients);
//                         productIngredient.setProduct(_product);
//
//                         return productIngredient.save();
//                     })
//
//                 return Promise.all([group, users]);
//
//
//                 User
//                     .sync({force: true})
//                     .then(function () {
//
//                     })
//                     .spread(function (group, users) {
//                         return group.setUsers(users)
//                     })
//                     .then(function (result) {
//                         console.log(result)
//                     })
//             })
//
//             return;
//
//             return models.Product.create(
//                 {
//                     name: req.body.name,
//                     brand: req.body.brand,
//                     description: req.body.description,
//                 },
//                 {transaction: transaction}
//             ).then(function (product) {
//                 _product = product;
//
//                 return models.Ingredient.create({
//                         name: req.body.name,
//                         brand: req.body.brand,
//                         description: req.body.description,
//                     },
//                     {transaction: transaction}
//                 );
//             }).then(function (ingredients) {
//                 _ingredients = ingredients;
//             })
//
//
//             var chainer = new Sequelize.Utils.QueryChainer();
//
//             chainer.add(;
//
//             for (var index in req.body.ingredients) {
//                 chainer.add(models.Ingredient.create(
//                     {name: req.body.ingredients[index]},
//                     {transaction: transaction}
//                 ));
//             }
//
//             chainer.runSerially()
//                 .success(function (results) {
//                     var product = results[0];
//                     var ingredients = results.subarray(1);
//
//                     var chainer2 = new Sequelize.Utils.QueryChainer();
//
//                     chainer2.add(models.UserProduct.create(
//                         {
//                             userid: req.user.userid,
//                             productid: product.productid,
//                             resulttypeid: req.body.resulttypeid
//                         },
//                         {transaction: transaction}
//                     ));
//
//                     for (var index in ingredients) {
//                         chainer2.add(models.ProductIngredient.create(
//                             {
//                                 productid: product.productid,
//                                 ingredientid: ingredients[index].ingredientid
//                             },
//                             {transaction: transaction}
//                         ));
//                     }
//
//                     chainer.runSerially()
//                         .success(function () {
//                             console.log("success1");
//                             //TODO hmmm?
//                         })
//                         .error(function (err) {
//                             console.log("error1");
//                             //TODO uh... error?
//                         });
//                 })
//                 .error(function (err) {
//                     console.log("error2");
//                     //TODO uh... error?
//                 });
//         }
//         ).then(function (result) {
//         console.log("success2");
//         // Transaction has been committed
//         // result is whatever the result of the promise chain returned to the transaction callback
//         req.flash('success', {msg: 'Success!.'});
//         req.session.save(function () {
//             res.redirect('/user/products');
//         });
//     }).catch(function (err) {
//         console.log("error3", err);
//         // Transaction has been rolled back
//         // err is whatever rejected the promise chain returned to the transaction callback
//         req.flash('errors', {msg: 'An error occured while adding your product.'});
//         req.session.save(function () {
//             res.redirect('/user/product');
//         });
//     });
// }
// }
        }
    }
}