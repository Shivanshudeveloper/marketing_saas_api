const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_51IdwfeH8KzFo5uc9YHKzp2HOPkZJvH0ij0qhWeg0wQ17G73o5fVJYjMkWOfAmWUgjVZe0DesJvrQKbmAPSacXsVP00qMXnEqFr')
const { v4: uuidv4 } = require('uuid');
const emailValidator = require('deep-email-validator');

// Getting Module
const University_Model = require('../models/University');
const Products_Model = require('../models/Products');
const MainStore_Model = require('../models/MainStore');
const Cart_Model = require('../models/Cart');
const Payment_Model = require('../models/Payment');
const Status_Model = require('../models/Status');
const FeaturedProduct_Model = require('../models/FeaturedProduct');
const Products2_Model = require('../models/Products2');
const WishList_Model = require('../models/WishList');

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

async function isEmailValid(email) {
    return emailValidator.validate(email)
}

// TEST
// @GET TEST
// GET 
router.get('/test', (req, res) => {
    res.send("Working");
});


// Database CRUD Operations
// @POST Request to GET the People
// GET 
router.get('/getallproductapi', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    Products_Model.find({})
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});



// Database CRUD Operations
// @POST Request to GET the People
// GET 
router.get('/getallproductsmainstorefilters/:filter', (req, res) => {
    const { filter } = req.params;
    res.setHeader('Content-Type', 'application/json');
    MainStore_Model.find({ gender: filter })
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});


// Database CRUD Operations
// @POST Request to GET the Product Details
// GET 
router.get('/getproductitemdetails/:id', (req, res) => {
    const { id } = req.params;
    res.setHeader('Content-Type', 'application/json');
    MainStore_Model.find({ _id: id })
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});


// Database CRUD Operations
// @POST Request to GET the People
// GET 
router.get('/getallproductsapifilters/:filter', (req, res) => {
    const { filter } = req.params;
    res.setHeader('Content-Type', 'application/json');
    Products_Model.find({ Gender: filter })
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});



// Database CRUD Operations
// @POST Request to GET the People
// GET 
router.get('/getcartallitems/:userId', (req, res) => {
    const { userId } = req.params;
    res.setHeader('Content-Type', 'application/json');
    Cart_Model.find({ userId })
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});



// Database CRUD Operations
// @POST Request to GET the People
// GET 
router.get('/gettrackallitems/:userId', (req, res) => {
    const { userId } = req.params;
    res.setHeader('Content-Type', 'application/json');
    Cart_Model.find({ userId, completed: false, payment: true })
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});



// Database CRUD Operations
// @POST Request to GET the People
// GET 
router.get('/getallproductapicategory/:ParentCategory/:Category/:Brand', (req, res) => {
    const { ParentCategory, Category, Brand } = req.params;
    res.setHeader('Content-Type', 'application/json');
    Products_Model.find({ ParentCategory, Category, Brand })
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});


// Database CRUD Operations
// @POST Request to GET the People
// GET 
router.get('/findproducts/:name/:id', (req, res) => {
    const { name, id } = req.params;
    var s = '';
    if (id == "bags") {
        s = "BAGS";
    } else if (id == "accessories") {
        s = "ACCESSORIES";
    } else if (id == "clothing") {
        s = "CLOTHING";
    } else if (id == "shoes") {
        s = "SHOES";
    }
    if (isNumeric(name)) {
        var filterName = Number(name);
        Products2_Model.find({"ListPrice": filterName, "ParentCategory": s}).sort({date: -1})
            .then(data => {
                if (data.length === 0) {
                    res.status(200).json(data);
                } else {
                    res.status(200).json(data);
                }
            })
            .catch(err => res.status(200).json(data))
    } else {
        var regexName = new RegExp(name);
        res.setHeader('Content-Type', 'application/json');
        var filterName = name.toUpperCase();
        Products2_Model.find({"Title": filterName, "ParentCategory": s}).sort({date: -1})
            .then(data => {
                if (data.length === 0) {
                    Products2_Model.find({"Brand": filterName, "ParentCategory": s}).sort({date: -1})
                        .then(data => {
                            if (data.length === 0) {
                                Products2_Model.find({"Sku": filterName, "ParentCategory": s}).sort({date: -1})
                                    .then(data => {
                                        if (data.length === 0) {
                                            Products2_Model.find({"MadeIn": filterName, "ParentCategory": s}).sort({date: -1})
                                                .then(data => {
                                                    if (data.length === 0) {
                                                        Products2_Model.find({"Category": filterName, "ParentCategory": s}).sort({date: -1})
                                                            .then(data => {
                                                                if (data.length === 0) {
                                                                    Products2_Model.find({"Gender": filterName, "ParentCategory": s}).sort({date: -1})
                                                                        .then(data => {
                                                                            if (data.length === 0) {
                                                                                res.status(200).json(data);
                                                                            } else {
                                                                                res.status(200).json(data);
                                                                            }
                                                                        })
                                                                        .catch(err => res.status(200).json(data))
                                                                } else {
                                                                    res.status(200).json(data);
                                                                }
                                                            })
                                                            .catch(err => res.status(200).json(data))
                                                    } else {
                                                        res.status(200).json(data);
                                                    }
                                                })
                                                .catch(err => res.status(400).json(`Error: ${err}`))
                                        } else {
                                            res.status(200).json(data);
                                        }
                                    })
                                    .catch(err => res.status(400).json(`Error: ${err}`))
                            } else {
                                res.status(200).json(data);
                            }
                        })
                        .catch(err => res.status(400).json(`Error: ${err}`))
                } else {
                    res.status(200).json(data);
                }
            })
            .catch(err => res.status(400).json(`Error: ${err}`))
    }

    

    
});


// Database CRUD Operations
// @POST Request to GET the People
// GET 
router.get('/getorderdetails/:userId', (req, res) => {
    const { userId } = req.params;
    res.setHeader('Content-Type', 'application/json');
    Cart_Model.find({ userId, payment: true })
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});

// Database CRUD Operations
// @POST Request to GET the People
// GET 
router.get('/clearallcartitems/:userId', (req, res) => {
    const { userId } = req.params;
    res.setHeader('Content-Type', 'application/json');
    Cart_Model.deleteMany({ userId })
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});



// Database CRUD Operations
// @POST Request to GET the People
// GET 
router.get('/getcategorymainstore', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    Products_Model.find({})
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});


// Database CRUD Operations
// @POST Request to GET the People
// GET 
router.get('/getalltheordersmainstore', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    Payment_Model.find({ completed: false })
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});



// Database CRUD Operations
// @POST Request to GET the People
// POST 
router.post('/addproduct', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const { title, brandname, category, color, length, shipfrom, price, blackowned, websiteurl, downloadUrl, description } = req.body;
    MainStore_Model.countDocuments({ title })
        .then((count) => {
            if (count === 0) {
                const newProductMainStore = new MainStore_Model({
                    title,
                    brandname,
                    category,
                    color,
                    length,
                    shipfrom,
                    price,
                    blackowned,
                    websiteurl,
                    downloadUrl,
                    description
                });
                newProductMainStore.save()
                    .then((data) => {
                        res.status(200).json("Added")
                    })
                    .catch(err => console.log(err))
            }
        })
});

// Database CRUD Operations
// @POST Request to add featured product to store
// POST 
router.post('/addfeaturedproductmainstore', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const { productId, title, price, displayImage } = req.body;
    FeaturedProduct_Model.countDocuments({ title })
        .then((count) => {
            if (count === 0) {
                const newFeaturedProduct = new FeaturedProduct_Model({
                    productId,
                    title,
                    price,
                    displayImage
                });
                newFeaturedProduct.save()
                    .then((data) => {
                        res.status(200).json("Added")
                    })
                    .catch(err => console.log(err))
            }
        })
});

// Database CRUD Operations
// @POST Request to Add Product to Main Cart
// POST 
router.post('/addproducttocart', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const { userId, title, qty, image, price, product } = req.body;
    Cart_Model.countDocuments({ title, userId })
        .then((count) => {
            if (count === 0) {
                const newProductMainStoreCart = new Cart_Model({
                    userId,
                    title,
                    qty,
                    image,
                    price,
                    product,
                    completed: false,
                    payment: false
                });
                newProductMainStoreCart.save()
                    .then((data) => {
                        res.status(200).json("Added")
                    })
                    .catch(err => console.log(err))
            } else {
                res.status(201).json("Added")
            }
        })
});

// Database CRUD Operations
// @POST Request to Add Product to Main Cart
// POST 
router.post('/addproducttowish', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const { userId, product } = req.body;
    WishList_Model.countDocuments({ userId, productSku: product.product.Sku })
        .then((count) => {
            if (count === 0) {
                const newWish = new WishList_Model({
                    userId,
                    productSku: product.product.Sku,
                    product
                });
                newWish.save()
                    .then((data) => {
                        res.status(200).json("Added")
                    })
                    .catch(err => console.log(err))
            } else {
                res.status(200).json("Added")
            }
        })
});


// Database CRUD Operations
// @POST Request to GET the People
// GET 
router.get('/getallproductmainstore', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    MainStore_Model.find({}).sort({date: -1})
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});


// Database CRUD Operations
// @POST Request to GET the People
// GET 
router.get('/getproductsuserwishlist/:userId', (req, res) => {
    const { userId } = req.params;
    res.setHeader('Content-Type', 'application/json');
    WishList_Model.find({ userId }).sort({date: -1})
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});

// Database CRUD Operations
// @POST Request to GET the People
// GET 
router.get('/gethomepagefeaturedproductlist', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    FeaturedProduct_Model.find({}).limit(4).sort({date: -1})
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});


// Database CRUD Operations
// @POST Request to GET the People
// GET 
router.get('/getallfeaturedproductmainstore', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    FeaturedProduct_Model.find({}).sort({date: -1})
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});


// Database CRUD Operations
// @POST Request to GET the People
// GET 
router.get('/getallproductsmainfilter/:Color/:Category/:Size/:ParentCategory/:priceFrom/:priceTo', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const { Color, Category, Size, ParentCategory, priceFrom, priceTo } = req.params;

    if ( Color != "All Colors" && Category == "All Categories" && Size == "All Sizes") {
        MainStore_Model.find({ "product.Color": Color, "product.ParentCategory": ParentCategory, "price": { $gte:priceFrom, $lt:priceTo } }).sort({date: -1})
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => res.status(400).json(`Error: ${err}`))
    } else if (Color != "All Colors" && Category != "All Categories" && Size == "All Sizes") {
        MainStore_Model.find({ "product.Color": Color, "product.ParentCategory": ParentCategory, "product.Category": Category, "price": { $gte:priceFrom, $lt:priceTo } }).sort({date: -1})
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => res.status(400).json(`Error: ${err}`))
    } else if (Color != "All Colors" && Category != "All Categories" && Size != "All Sizes") {
        MainStore_Model.find({ "product.Color": Color, "product.ParentCategory": ParentCategory, "product.Category": Category, "product.Variants": { $elemMatch: { Size: Size } }, "price": { $gte:priceFrom, $lt:priceTo } }).sort({date: -1})
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => res.status(400).json(`Error: ${err}`))
    } else if (Color == "All Colors" && Category != "All Categories" && Size == "All Sizes") {
        MainStore_Model.find({ "product.ParentCategory": ParentCategory, "product.Category": Category, "price": { $gte:priceFrom, $lt:priceTo } }).sort({date: -1})
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => res.status(400).json(`Error: ${err}`))
    } else if (Color == "All Colors" && Category == "All Categories" && Size != "All Sizes") {
        MainStore_Model.find({ "product.ParentCategory": ParentCategory, "product.Variants": { $elemMatch: { Size: Size } }, "price": { $gte:priceFrom, $lt:priceTo } }).sort({date: -1})
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => res.status(400).json(`Error: ${err}`))
    } else if (Color == "All Colors" && Category == "All Categories" && Size == "All Sizes") {
        MainStore_Model.find({ "product.ParentCategory": ParentCategory, "price": { $gte:priceFrom, $lt:priceTo } }).sort({date: -1})
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => res.status(400).json(`Error: ${err}`))
    } 

    // MainStore_Model.find({ "product.Color": Color, "product.ParentCategory": ParentCategory, "product.Category": Category, "product.Variants": { $elemMatch: { Size: Size } }, "price": { $gte:priceFrom, $lt:priceTo } }).sort({date: -1})
    //     .then(data => {
    //         res.status(200).json(data);
    //     })
    //     .catch(err => res.status(400).json(`Error: ${err}`))
});


// Database CRUD Operations
// @POST Request to GET the People
// GET 
router.get('/getallproductsmainfilterprice/:Color/:Category/:Size/:ParentCategory/:sort', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const { Color, Category, Size, ParentCategory, sort } = req.params;
    var sortList = Number(sort);

    if ( Color != "All Colors" && Category == "All Categories" && Size == "All Sizes") {
        MainStore_Model.find({ "product.Color": Color, "product.ParentCategory": ParentCategory }).sort({price: sortList})
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => res.status(400).json(`Error: ${err}`))
    } else if (Color != "All Colors" && Category != "All Categories" && Size == "All Sizes") {
        MainStore_Model.find({ "product.Color": Color, "product.ParentCategory": ParentCategory, "product.Category": Category }).sort({price: sortList})
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => res.status(400).json(`Error: ${err}`))
    } else if (Color != "All Colors" && Category != "All Categories" && Size != "All Sizes") {
        MainStore_Model.find({ "product.Color": Color, "product.ParentCategory": ParentCategory, "product.Category": Category, "product.Variants": { $elemMatch: { Size: Size } } }).sort({price: sortList})
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => res.status(400).json(`Error: ${err}`))
    } else if (Color == "All Colors" && Category != "All Categories" && Size == "All Sizes") {
        MainStore_Model.find({ "product.ParentCategory": ParentCategory, "product.Category": Category }).sort({price: sortList})
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => res.status(400).json(`Error: ${err}`))
    } else if (Color == "All Colors" && Category == "All Categories" && Size != "All Sizes") {
        MainStore_Model.find({ "product.ParentCategory": ParentCategory, "product.Variants": { $elemMatch: { Size: Size } } }).sort({price: sortList})
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => res.status(400).json(`Error: ${err}`))
    } else if (Color == "All Colors" && Category == "All Categories" && Size == "All Sizes") {
        MainStore_Model.find({ "product.ParentCategory": ParentCategory }).sort({price: sortList})
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => res.status(400).json(`Error: ${err}`))
    } 

    // MainStore_Model.find({ "product.Color": Color, "product.ParentCategory": ParentCategory, "product.Category": Category, "product.Variants": { $elemMatch: { Size: Size } }, "price": { $gte:priceFrom, $lt:priceTo } }).sort({date: -1})
    //     .then(data => {
    //         res.status(200).json(data);
    //     })
    //     .catch(err => res.status(400).json(`Error: ${err}`))
});


// Database CRUD Operations
// @POST Request to GET the People
// GET 
router.get('/pricefilteradmindashboard/:category/:sort', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const { category, sort } = req.params;
    var sortList = Number(sort);
    Products2_Model.find({ ParentCategory: category }).sort({ListPrice: sortList})
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});

// Database CRUD Operations
// @POST Request to GET the People
// GET 
router.get('/getallproductsmain/:category', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const { category } = req.params;
    MainStore_Model.find({ category }).sort({date: -1})
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});

// Database CRUD Operations
// @POST Request to GET the People
// GET 
router.get('/getproductsmainstoreagain/:id', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const { id } = req.params;
    if (id == "bags") {
        Products2_Model.find({ 'ParentCategory': 'BAGS' }).limit(100)
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => res.status(400).json(`Error: ${err}`))
    } else if (id == "clothing") {
        Products2_Model.find({ 'ParentCategory': 'CLOTHING' }).limit(100)
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => res.status(400).json(`Error: ${err}`))
    } else if (id == "accessories") {
        Products2_Model.find({ 'ParentCategory': 'ACCESSORIES' }).limit(100)
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => res.status(400).json(`Error: ${err}`))
    } else if (id == "shoes") {
        Products2_Model.find({ 'ParentCategory': 'SHOES' }).limit(100)
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => res.status(400).json(`Error: ${err}`))
    } 
});

// Database CRUD Operations
// @POST Request to GET the People
// GET 
router.get('/getproductsmainstoreagainbrands/:id', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const { id } = req.params;
    if (id == "bags") {
        Products2_Model.find({ 'ParentCategory': 'BAGS' }, { Brand: 1 })
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => res.status(400).json(`Error: ${err}`))
    } else if (id == "clothing") {
        Products2_Model.find({ 'ParentCategory': 'CLOTHING' }, { Brand: 1 })
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => res.status(400).json(`Error: ${err}`))
    } else if (id == "accessories") {
        Products2_Model.find({ 'ParentCategory': 'ACCESSORIES' }, { Brand: 1 })
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => res.status(400).json(`Error: ${err}`))
    } else if (id == "shoes") {
        Products2_Model.find({ 'ParentCategory': 'SHOES' }, { Brand: 1 })
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => res.status(400).json(`Error: ${err}`))
    } 
});


// Database CRUD Operations
// @POST Request to GET the People
// GET 
router.get('/getproductsmainstoreagainapplyfilters/:id/:brandname/:subcategory/:gender', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const { id, brandname, subcategory, gender } = req.params;

    if ( gender == "SHOW ALL" ) {
        if ( subcategory == "SHOW ALL" ) {
            if (id == "bags") {
                Products2_Model.find({ 'ParentCategory': 'BAGS', 'Brand': brandname })
                    .then(data => {
                        res.status(200).json(data);
                    })
                    .catch(err => res.status(400).json(`Error: ${err}`))
            } else if (id == "clothing") {
                Products2_Model.find({ 'ParentCategory': 'CLOTHING', 'Brand': brandname })
                    .then(data => {
                        res.status(200).json(data);
                    })
                    .catch(err => res.status(400).json(`Error: ${err}`))
            } else if (id == "accessories") {
                Products2_Model.find({ 'ParentCategory': 'ACCESSORIES', 'Brand': brandname })
                    .then(data => {
                        res.status(200).json(data);
                    })
                    .catch(err => res.status(400).json(`Error: ${err}`))
            } else if (id == "shoes") {
                Products2_Model.find({ 'ParentCategory': 'SHOES', 'Brand': brandname })
                    .then(data => {
                        res.status(200).json(data);
                    })
                    .catch(err => res.status(400).json(`Error: ${err}`))
            } 
        } else {
            if (id == "bags") {
                Products2_Model.find({ 'ParentCategory': 'BAGS', 'Brand': brandname, 'Category': subcategory })
                    .then(data => {
                        res.status(200).json(data);
                    })
                    .catch(err => res.status(400).json(`Error: ${err}`))
            } else if (id == "clothing") {
                Products2_Model.find({ 'ParentCategory': 'CLOTHING', 'Brand': brandname, 'Category': subcategory })
                    .then(data => {
                        res.status(200).json(data);
                    })
                    .catch(err => res.status(400).json(`Error: ${err}`))
            } else if (id == "accessories") {
                Products2_Model.find({ 'ParentCategory': 'ACCESSORIES', 'Brand': brandname, 'Category': subcategory })
                    .then(data => {
                        res.status(200).json(data);
                    })
                    .catch(err => res.status(400).json(`Error: ${err}`))
            } else if (id == "shoes") {
                Products2_Model.find({ 'ParentCategory': 'SHOES', 'Brand': brandname, 'Category': subcategory })
                    .then(data => {
                        res.status(200).json(data);
                    })
                    .catch(err => res.status(400).json(`Error: ${err}`))
            } 
        }
    } else {
        if ( subcategory == "SHOW ALL" ) {
            if (id == "bags") {
                Products2_Model.find({ 'ParentCategory': 'BAGS', 'Brand': brandname, 'Gender': gender })
                    .then(data => {
                        res.status(200).json(data);
                    })
                    .catch(err => res.status(400).json(`Error: ${err}`))
            } else if (id == "clothing") {
                Products2_Model.find({ 'ParentCategory': 'CLOTHING', 'Brand': brandname, 'Gender': gender })
                    .then(data => {
                        res.status(200).json(data);
                    })
                    .catch(err => res.status(400).json(`Error: ${err}`))
            } else if (id == "accessories") {
                Products2_Model.find({ 'ParentCategory': 'ACCESSORIES', 'Brand': brandname, 'Gender': gender })
                    .then(data => {
                        res.status(200).json(data);
                    })
                    .catch(err => res.status(400).json(`Error: ${err}`))
            } else if (id == "shoes") {
                Products2_Model.find({ 'ParentCategory': 'SHOES', 'Brand': brandname, 'Gender': gender })
                    .then(data => {
                        res.status(200).json(data);
                    })
                    .catch(err => res.status(400).json(`Error: ${err}`))
            } 
        } else {
            if (id == "bags") {
                Products2_Model.find({ 'ParentCategory': 'BAGS', 'Brand': brandname, 'Category': subcategory, 'Gender': gender })
                    .then(data => {
                        res.status(200).json(data);
                    })
                    .catch(err => res.status(400).json(`Error: ${err}`))
            } else if (id == "clothing") {
                Products2_Model.find({ 'ParentCategory': 'CLOTHING', 'Brand': brandname, 'Category': subcategory, 'Gender': gender })
                    .then(data => {
                        res.status(200).json(data);
                    })
                    .catch(err => res.status(400).json(`Error: ${err}`))
            } else if (id == "accessories") {
                Products2_Model.find({ 'ParentCategory': 'ACCESSORIES', 'Brand': brandname, 'Category': subcategory, 'Gender': gender })
                    .then(data => {
                        res.status(200).json(data);
                    })
                    .catch(err => res.status(400).json(`Error: ${err}`))
            } else if (id == "shoes") {
                Products2_Model.find({ 'ParentCategory': 'SHOES', 'Brand': brandname, 'Category': subcategory, 'Gender': gender })
                    .then(data => {
                        res.status(200).json(data);
                    })
                    .catch(err => res.status(400).json(`Error: ${err}`))
            } 
        }
    }
});

// Database CRUD Operations
// @POST Request to GET the People
// GET 
router.get('/getproductsmainstoreagainskip/:id/:skip', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const { id, skip } = req.params;
    var numberSkip = Number(skip);
    if (id == "bags") {
        Products2_Model.find({ 'ParentCategory': 'BAGS' }).skip(numberSkip).limit(100)
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => res.status(400).json(`Error: ${err}`))
    } else if (id == "clothing") {
        Products2_Model.find({ 'ParentCategory': 'CLOTHING' }).skip(numberSkip).limit(100)
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => res.status(400).json(`Error: ${err}`))
    } else if (id == "accessories") {
        Products2_Model.find({ 'ParentCategory': 'ACCESSORIES' }).skip(numberSkip).limit(100)
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => res.status(400).json(`Error: ${err}`))
    } else if (id == "shoes") {
        Products2_Model.find({ 'ParentCategory': 'SHOES' }).skip(numberSkip).limit(100)
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => res.status(400).json(`Error: ${err}`))
    } 
});

// Database CRUD Operations
// @POST Request to GET the University Data
// GET 
router.get('/getitemdetailsmainstore/:id', (req, res) => {
    const { id } = req.params;
    res.setHeader('Content-Type', 'application/json');
    MainStore_Model.findOne({ '_id': id }).sort({date: -1})
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});

// Database CRUD Operations
// @POST Request to add item in cart
// POST 
router.post('/updateproductmainstore', (req, res) => {
    const { title, price, category, madein, gender, description, productId, brandname } = req.body;
    MainStore_Model.findOneAndUpdate({ '_id': productId }, { title, price, category, madein, gender, description, "product.Brand": brandname }, { useFindAndModify: false })
        .then(() => {
            res.status(200).json('Updated Product');
        })
        .catch(err => console.log(err))
});

// Database CRUD Operations
// @POST Request to GET the University Data
// GET 
router.get('/deleteproductmainstore/:id', (req, res) => {
    const { id } = req.params;
    res.setHeader('Content-Type', 'application/json');
    MainStore_Model.findOneAndDelete({ '_id': id })
        .then(data => {
            res.status(200).json('Removed')
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});

// Database CRUD Operations
// @POST Request to GET the University Data
// GET 
router.get('/deleteproductuserwish/:id', (req, res) => {
    const { id } = req.params;
    res.setHeader('Content-Type', 'application/json');
    WishList_Model.findOneAndDelete({ '_id': id })
        .then(data => {
            res.status(200).json('Removed')
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});


// Database CRUD Operations
// @POST Request to GET the University Data
// GET 
router.get('/removefeaturedproduct/:id', (req, res) => {
    const { id } = req.params;
    res.setHeader('Content-Type', 'application/json');
    FeaturedProduct_Model.findOneAndDelete({ '_id': id })
        .then(data => {
            res.status(200).json('Removed')
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});



// Database CRUD Operations
// @POST Request to GET the University Data
// GET 
router.get('/deleteitemsmaincart/:id', (req, res) => {
    const { id } = req.params;
    res.setHeader('Content-Type', 'application/json');
    Cart_Model.findOneAndDelete({ '_id': id })
        .then(data => {
            res.status(200).json('Removed')
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});


// Database CRUD Operations
// @GET Request to DELETE the Compare List Cart Item
// GET 
router.get('/cartitemchangequantitycart/:documentId/:qty', (req, res) => {
    const { documentId, qty } = req.params;
    res.setHeader('Content-Type', 'application/json');
    Cart_Model.findOneAndUpdate({'_id': documentId}, { qty }, { useFindAndModify: false })
        .then(() => {
            res.status(200).json('Users Update');
        })
        .catch(err => console.log(err))
});


// Database CRUD Operations
// @POST Request to add university
// POST 
router.post('/addnewuniversity', (req, res) => {
    var { name, address, country, city, province, type, category, visa, conditionaloffer, campusaccomodation, workwhilestudy, websiteurl, dicipline, fields, about, logo, coverphoto } = req.body;
    
    country = country.toLowerCase();
    city = city.toLowerCase();
    type = type.toLowerCase();
    category = category.toLowerCase();
    
    res.setHeader('Content-Type', 'application/json');
    University_Model.countDocuments({'name': name})
        .then((count) => {
            if (count === 0) {
                const newUniversity = new University_Model({
                    name,
                    address,
                    country,
                    city,
                    province,
                    type,
                    category,
                    visa,
                    conditionaloffer,
                    campusaccomodation,
                    workwhilestudy,
                    websiteurl,
                    dicipline,
                    logo,
                    coverphoto,
                    programs: fields,
                    about
                });
                newUniversity.save()
                    .then((data) => {
                        res.status(200)
                    })
                    .catch(err => console.log(err))
            }
        })
});


// Database CRUD Operations
// @POST Request to GET the University Data
// GET 
router.get('/getuniversitydatas/:id', (req, res) => {
    const { id } = req.params;
    res.setHeader('Content-Type', 'application/json');
    University_Model.findOne({ '_id': id }).sort({date: -1})
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});

// Database CRUD Operations
// @POST Request to GET the University Data
// GET 
router.get('/getalluniversity', (req, res) => {
    const { id } = req.params;
    res.setHeader('Content-Type', 'application/json');
    University_Model.find({}).sort({date: -1})
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});


// Database CRUD Operations
// @POST Request to add item in cart
// POST 
router.post('/updateorderstatusmainstore', (req, res) => {
    const { userId, orderstatus } = req.body;
    Status_Model.updateMany({userId}, { 'status': orderstatus }, { useFindAndModify: false })
        .then(() => {
            if (orderstatus === "Order Completed") {
                Cart_Model.updateMany({userId}, { 'completed': true }, { useFindAndModify: false })
                    .then(() => {
                        Payment_Model.updateMany({userId}, { 'completed': true }, { useFindAndModify: false })
                            .then(() => {
                                res.status(200).json('Cart Updated');
                            })
                            .catch(err => console.log(err))
                    })
                    .catch(err => console.log(err))
            } else {
                res.status(200).json('Cart Updated');
            }
        })
        .catch(err => console.log(err))
});


// Database CRUD Operations
// @POST Request to GET the University Data
// GET 
router.get('/getuniversititesfilterscountry/:country', (req, res) => {
    let { country } = req.params;
    country = country.toLowerCase();
    res.setHeader('Content-Type', 'application/json');
    University_Model.find({ 'country': country }).sort({date: -1})
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});


// Database CRUD Operations
// @POST Request to GET the University Data
// GET 
router.get('/getorderstatusmainstore/:userId', (req, res) => {
    let { userId } = req.params;
    res.setHeader('Content-Type', 'application/json');
    Status_Model.find({ userId, status: { $ne: 'Order Completed' } }).sort({date: -1})
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});



// Database CRUD Operations
// @POST Request to GET the University Data
// GET 
router.get('/getuniversititesfiltersvisa/:visa', (req, res) => {
    let { visa } = req.params;
    res.setHeader('Content-Type', 'application/json');
    University_Model.find({ visa }).sort({date: -1})
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});


// Database CRUD Operations
// @GET Request to get the orders of user
// GET 
router.post('/paymentsuccessfull', (req, res) => {
    const { transactionId, email, fullName, phoneno, address, zipcode, userId, amount, note } = req.body;
    res.setHeader('Content-Type', 'application/json');
    Payment_Model.countDocuments({ transactionId })
    .then((count) => {
        if (count === 0) {
            const newSuccessfullPayment = new Payment_Model({
                transactionId,
                email,
                fullName,
                phoneno,
                address,
                zipcode,
                amount,
                note,
                userId,
                completed: false
            });
            newSuccessfullPayment.save()
                .then(() => {
                    Cart_Model.updateMany({userId}, { 'payment': true }, { useFindAndModify: false })
                        .then(() => {
                            const newStatus = new Status_Model({
                                userId,
                                payment: 'Completed',
                                status: 'Order Received'
                            });
                            newStatus.save()
                                .then((data) => {
                                    res.status(200).json('Users Update')
                                })
                                .catch(err => console.log(err))
                        })
                        .catch(err => console.log(err))
                })
                .catch(err => res.status(500).json(`Server Error is ${err}`))
        } else {
            res.status(200).json('Added')
        }
    })
    .catch(err => res.status(500).json('Server Error'))
});




// Database CRUD Operations
// @POST Request to the Payment & Charges
// POST 
router.post('/charges', async (req, res) => {
    const {email, amount} = req.body;
    
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100,
        currency: 'eur',
        // Verify your integration in this guide by including this parameter
        metadata: {integration_check: 'accept_a_payment'},
        receipt_email: email,
    });

    res.json({'client_secret': paymentIntent['client_secret']})
});


// Database CRUD Operations
// @POST Request to the Payment & Charges
// POST 
router.post('/secret', async (req, res) => {
    // const {email, amount} = req.body;
    
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 1929,
        currency: 'eur',
        payment_method_types: ['ideal'],
    });

    res.json({'client_secret': paymentIntent.client_secret})
});


// Database CRUD Operations
// @POST Request to GET the University Data
// GET 
router.get('/getuniversititesfilterscategory/:category', (req, res) => {
    let { category } = req.params;
    category = category.toLowerCase();
    res.setHeader('Content-Type', 'application/json');
    University_Model.find({ category }).sort({date: -1})
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});




// Database CRUD Operations
// @POST Request to GET the University Data
// GET 
router.get('/getuniversititesfiltersworkwhilestudy/:workwhilestudy', (req, res) => {
    let { workwhilestudy } = req.params;
    res.setHeader('Content-Type', 'application/json');
    University_Model.find({ workwhilestudy }).sort({date: -1})
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});




// Database CRUD Operations
// @POST Request to GET the University Data
// GET 
router.get('/getuniversititesfilterscampusaccomodation/:campusaccomodation', (req, res) => {
    let { campusaccomodation } = req.params;
    res.setHeader('Content-Type', 'application/json');
    University_Model.find({ workwhilestudy }).sort({date: -1})
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});




// Database CRUD Operations
// @POST Request to GET the University Data
// GET 
router.get('/getuniversititesfiltersconditionaloffers/:conditionaloffers', (req, res) => {
    let { conditionaloffers } = req.params;
    res.setHeader('Content-Type', 'application/json');
    University_Model.find({ 'conditionaloffer': conditionaloffers }).sort({date: -1})
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});


router.get('/checkemail2/:email', async function(req, res, next) {
  let { email } = req.params;
  const result = await isEmailValid(email);
  res.status(200).json(result)
});


module.exports = router;