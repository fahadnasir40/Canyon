const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const moment = require("moment")

const config = require("./config/config").get(process.env.NODE_ENV);
const app = express();
const { auth } = require("./middleware/auth");
const { auth2 } = require("./middleware/auth2");
const shortid = require('shortid');

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

const { User } = require("./models/user");
const { Supplier } = require("./models/supplier");
const { Customer } = require("./models/customer");
const { Product } = require("./models/product");
const { Transaction } = require("./models/transaction");
const { Purchase } = require("./models/purchase");
const { Sale } = require("./models/sale");


app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static("client/build"));


// GET //

app.get("/api/auth", auth2, (req, res) => {
    res.json({
        isAuth: true,
        id: req.user.id,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
    });
});


app.get('/api/getDashboard', auth, (req, res) => {

    getData();
    async function getData() {

        let data = '';
        const recentOrders = '';
        Sale.find().skip().sort({ createdAt: -1 }).limit(5).select('_id customerName createdAt saleDate status totalAmount').exec((err, doc) => {
            if (err) return res.status(400).send(err);
            data = { recentOrders: [...doc] };

            Transaction.find({ transaction_action: { $in: ['Sale Added', 'Sale Returned'] }, status: 'active' }).select('rate createdAt transaction_action').exec((err, trans) => {
                if (err) return res.status(400).send(err);

                var totalSales = 0;
                var lastMonthSale = 0;
                var lastWeekSale = 0;
                var prevLastWeekSale = 0;
                trans.forEach(element => {
                    if (element.transaction_action === 'Sale Returned')
                        totalSales = totalSales - element.rate;
                    else
                        totalSales = totalSales + element.rate;
                })

                const currentDate = new Date();
                const currentDateTime = currentDate.getTime();
                const last30DaysDate = new Date(currentDate.setDate(currentDate.getDate() - 30));
                const last30DaysDateTime = last30DaysDate.getTime();

                const last30DaysList = trans.filter(x => {
                    const elementDateTime = new Date(x.createdAt).getTime();
                    if (x.transaction_action == 'Sale Added')
                        if (elementDateTime <= currentDateTime && elementDateTime > last30DaysDateTime) {
                            return true;
                        }
                        else
                            return false
                }).sort((a, b) => {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                });

                var prevMonthFirstDay = new moment().subtract(1, 'months').date(1).toDate();
                var prevMonthLastDay = new moment().subtract(1, 'months').endOf('month').toDate();

                const prevMonthFirstDateTime = prevMonthFirstDay.getTime();
                const prev30DaysDate = prevMonthLastDay;
                const prev30DaysDateTime = prev30DaysDate.getTime();

                const prevMonthList = trans.filter(x => {
                    const elementDateTime = new Date(x.createdAt).getTime();
                    if (x.transaction_action == 'Sale Added')
                        if (elementDateTime <= prev30DaysDateTime && elementDateTime > prevMonthFirstDateTime) {
                            return true;
                        }
                    return false
                }).sort((a, b) => {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                });

                prevMonthList.forEach(element => {
                    if (element.transaction_action === 'Sale Returned')
                        lastMonthSale -= element.rate;
                    else
                        lastMonthSale -= element.rate;
                })

                const lastWeekList = trans.filter(x => {
                    const elementDateTime = new Date(x.createdAt).getTime();
                    if (elementDateTime <= new Date() && elementDateTime >= new moment().subtract(7, 'days').toDate()) {
                        return true;
                    }
                    return false
                }).sort((a, b) => {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                });

                const prevLastWeekList = trans.filter(x => {
                    const elementDateTime = new Date(x.createdAt).getTime();
                    if (elementDateTime <= new moment().subtract(7, 'days').toDate() && elementDateTime >= new moment().subtract(14, 'days').toDate()) {
                        return true;
                    }
                    return false
                }).sort((a, b) => {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                });

                lastWeekList.forEach(element => {
                    if (element.transaction_action === 'Sale Returned')
                        lastWeekSale -= element.rate;
                    else
                        lastWeekSale += element.rate;
                })

                prevLastWeekList.forEach(element => {
                    if (element.transaction_action === 'Sale Returned')
                        prevLastWeekSale += element.rate;
                    else
                        lastWeekSale += element.rate;
                })

                Customer.find({ status: 'active' }).countDocuments((err, count) => {
                    if (err) return res.status(400).send(err);
                    const customerCount = count;
                    Supplier.find({ status: 'active' }).countDocuments((err, count) => {
                        if (err) return res.status(400).send(err);

                        const supplierCount = count;
                        Product.find({ status: 'active' }).countDocuments((err, count) => {
                            if (err) return res.status(400).send(err);

                            const productCount = count;
                            Sale.find().skip().sort({ createdAt: 'desc' }).limit().lean().exec((err, doc) => {
                                if (err) return res.status(400).send(err);
                                let productsList = [];


                                const functionWithPromise = item => { //a function that returns a promise
                                    return Promise.resolve()
                                }

                                const anAsyncFunction = async item => {
                                    if (item.status !== 'Returned') {
                                        item.productDetails.forEach((element, key) => {
                                            if (!productsList.find(x => x._id === element._id)) {
                                                productsList.push({ _id: element._id, totalAmount: element.ptotal, count: (element.dqty - element.rqty) })

                                            }
                                            else {
                                                const index = productsList.indexOf(productsList.find(x => x._id === element._id));
                                                productsList[index].totalAmount += element.ptotal;
                                                productsList[index].count += (element.dqty - element.rqty);

                                            }
                                        })
                                    }
                                    return functionWithPromise(item)
                                }

                                const getData = async () => {
                                    return Promise.all(doc.map(item => anAsyncFunction(item)))
                                }

                                getData().then(newData => {
                                    let t = productsList;
                                    for (var i = 0; i < t.length; i++) {
                                        if (productsList[i].count < 0)
                                            productsList.splice(i, 1);
                                    }

                                    data = {
                                        ...data,
                                        totalSales: totalSales,
                                        lastMonthSale: lastMonthSale,
                                        lastWeekSale: lastWeekSale,
                                        prevWeekSale: prevLastWeekSale,
                                        totalSalesAmount: trans.length,
                                        lastMonthSaleList: last30DaysList,
                                        productCount: productCount,
                                        supplierCount: supplierCount,
                                        customerCount: customerCount,
                                        topProducts: productsList
                                    }
                                    res.status(200).send(data);
                                })
                            })
                        })
                    })
                })
            })
        })
    }
})

app.get('/api/getSupplier', auth, (req, res) => {
    let id = req.query.id;

    Supplier.findById(id, (err, doc) => {
        if (err) return res.status(400).send(err);
        res.send(doc);
    })
})


app.get('/api/getSupplierDetails', auth, (req, res) => {
    const id = req.query.id;

    Purchase.find({ supplierId: id }).select('_id totalAmount status').exec((err, purchase) => {
        if (err) return res.status(400).send(err);

        const totalOrders = purchase.length;
        var completedOrders = 0;
        var returnedOrders = 0;
        var pendingOrders = 0;
        var totalOrdersAmount = 0;

        purchase.forEach(element => {
            if (element.status === 'Complete')
                completedOrders++;
            else if (element.status === 'Returned' || element.status === 'Returned Items')
                returnedOrders++;
            else if (element.status === 'Pending' || element.status === 'Returned Items Pending')
                pendingOrders++;

            totalOrdersAmount += element.totalAmount;
        })
        const ordersDetails = {
            completedOrders, returnedOrders, pendingOrders, totalOrdersAmount, totalOrders
        }
        res.status(200).send(ordersDetails);
    })
})


app.get('/api/getSuppliers', auth, (req, res) => {
    // locahost:3001/api/books?skip=3&limit=2&order=asc
    let skip = parseInt(req.query.skip);
    let limit = parseInt(req.query.limit);
    let order = req.query.order;

    // ORDER = asc || desc
    Supplier.find().skip(skip).sort({ createdAt: order }).limit(limit).exec((err, doc) => {
        if (err) return res.status(400).send(err);
        res.send(doc);
    })
})

app.get('/api/getSuppliersTransactions', auth, (req, res) => {
    // locahost:3001/api/books?skip=3&limit=2&order=asc
    let skip = parseInt(req.query.skip);
    let limit = parseInt(req.query.limit);
    let order = req.query.order;

    // ORDER = asc || desc
    Supplier.find({ status: "active" }).skip(skip).sort({ createdAt: order }).limit(limit).select('_id name brand').lean().exec((err, doc) => {
        if (err) return res.status(400).send(err);
        res.send(doc);
    })
})

app.get('/api/getCustomer', auth2, (req, res) => {
    let id = req.query.id;

    Customer.findById(id, (err, doc) => {
        if (err) return res.status(400).send(err);
        res.send(doc);
    })
})

app.get('/api/getCustomerDetails', auth2, (req, res) => {
    const id = req.query.id;

    Sale.find({ customerId: id }).select('_id totalAmount status').exec((err, sale) => {
        if (err) return res.status(400).send(err);

        const totalOrders = sale.length;
        var completedOrders = 0;
        // var returnedOrders = 0;
        var pendingOrders = 0;
        var totalOrdersAmount = 0;

        sale.forEach(element => {
            if (element.status === 'Complete')
                completedOrders++;
            // else if (element.status === 'Returned' || element.status === 'Returned Items')
            //     returnedOrders++;
            else if (element.status === 'Pending' || element.status === 'Returned Items Pending')
                pendingOrders++;

            totalOrdersAmount += element.totalAmount;
        })
        const ordersDetails = {
            completedOrders, pendingOrders, totalOrdersAmount, totalOrders
        }
        res.status(200).send(ordersDetails);
    })
})

app.get('/api/getCustomersTransactions', auth2, (req, res) => {
    let skip = parseInt(req.query.skip);
    let limit = parseInt(req.query.limit);
    let order = req.query.order;

    // ORDER = asc || desc
    Customer.find({ status: "active" }).skip(skip).sort({ createdAt: order }).limit(limit).select('_id name brand').exec((err, doc) => {
        if (err) return res.status(400).send(err);
        res.send(doc);
    })
})

app.get('/api/getEmployeesTransactions', auth, (req, res) => {
    // locahost:3001/api/books?skip=3&limit=2&order=asc
    let skip = parseInt(req.query.skip);
    let limit = parseInt(req.query.limit);
    let order = req.query.order;

    // ORDER = asc || desc
    User.find().skip(skip).sort({ createdAt: order }).limit(limit).select('_id name').exec((err, doc) => {
        if (err) return res.status(400).send(err);
        res.send(doc);
    })
})


app.get('/api/getActiveSuppliers', auth, (req, res) => {
    // locahost:3001/api/books?skip=3&limit=2&order=asc
    let skip = parseInt(req.query.skip);
    let limit = parseInt(req.query.limit);
    let order = req.query.order;

    // ORDER = asc || desc
    Supplier.find({ status: 'active' }).skip(skip).sort({ createdAt: order }).limit(limit).exec((err, doc) => {
        if (err) return res.status(400).send(err);
        res.send(doc);
    })
})

app.get('/api/getCustomers', auth2, (req, res) => {
    // locahost:3001/api/books?skip=3&limit=2&order=asc
    let skip = parseInt(req.query.skip);
    let limit = parseInt(req.query.limit);
    let order = req.query.order;

    // ORDER = asc || desc
    Customer.find().skip(skip).sort({ createdAt: order }).limit(limit).exec((err, doc) => {
        if (err) return res.status(400).send(err);
        res.send(doc);
    })
})

app.get('/api/getProducts', auth, (req, res) => {
    // locahost:3001/api/books?skip=3&limit=2&order=asc
    let skip = parseInt(req.query.skip);
    let limit = parseInt(req.query.limit);
    let order = req.query.order;

    // ORDER = asc || desc
    Product.find().skip(skip).sort({ createdAt: order }).limit(limit).exec((err, doc) => {
        if (err) return res.status(400).send(err);
        res.send(doc);
    })
})

app.get('/api/getActiveProducts', auth2, (req, res) => {
    // locahost:3001/api/books?skip=3&limit=2&order=asc
    let skip = parseInt(req.query.skip);
    let limit = parseInt(req.query.limit);
    let order = req.query.order;

    // ORDER = asc || desc
    Product.find({ status: 'active' }).skip(skip).sort({ createdAt: order }).limit(limit).exec((err, doc) => {
        if (err) return res.status(400).send(err);
        res.send(doc);
    })
})

app.get('/api/getStockProducts', auth2, (req, res) => {
    // locahost:3001/api/books?skip=3&limit=2&order=asc
    let skip = parseInt(req.query.skip);
    let limit = parseInt(req.query.limit);
    let order = req.query.order;

    // ORDER = asc || desc
    Product.find({ stock: { $gte: 1 } }).skip(skip).sort({ createdAt: order }).limit(limit).exec((err, doc) => {
        if (err) return res.status(400).send(err);
        res.send(doc);
    })
})


app.get('/api/getPurchases', auth, (req, res) => {
    // locahost:3001/api/books?skip=3&limit=2&order=asc
    let skip = parseInt(req.query.skip);
    let limit = parseInt(req.query.limit);
    let order = req.query.order;

    // ORDER = asc || desc
    Purchase.find().skip(skip).sort({ createdAt: order }).limit(limit).exec((err, doc) => {
        if (err) return res.status(400).send(err);
        res.send(doc);
    })
})

app.get('/api/getSales', auth2, (req, res) => {
    // locahost:3001/api/books?skip=3&limit=2&order=asc
    let skip = parseInt(req.query.skip);
    let limit = parseInt(req.query.limit);
    let order = req.query.order;

    if (req.user.role === 'worker') {
        // ORDER = asc || desc
        Sale.find({ addedBy: req.user.role }).skip(skip).sort({ createdAt: order }).limit(limit).exec((err, doc) => {
            if (err) return res.status(400).send(err);
            res.send(doc);
        });
    }
    else {
        Sale.find().skip(skip).sort({ createdAt: order }).limit(limit).exec((err, doc) => {
            if (err) return res.status(400).send(err);
            res.send(doc);
        });
    }

});

app.get('/api/getSaleProduct', auth, (req, res) => {

    let id = req.query.id.toString();

    Sale.findById(id, (err, doc) => {
        if (err) {
            return res.status(400).send(err);
        }
        if (!doc) {
            return res.status(400).send({ message: 'Not found' });
        }

        if (doc.productDetails.length > 0)
            Product.find({ _id: { $in: doc.productDetails } }).select('_id name sku stock brand uom').exec((err, products) => {
                if (err) return res.status(400).send(err);
                res.status(200).send({ doc, products });
            });
    })
});

app.post('/api/getDashboardProducts', auth, async function (req, res) {

    let data = req.body;
    data.splice(5, data.length);

    //Getting only top 5 products data
    Product.find({ _id: { $in: data } }).limit(5).select('name sku price.total').exec((err, products) => {
        if (err) return res.status(400).send(err);
        return res.status(200).send({ data, products });
    });
})

app.get('/api/getPurchaseProduct', auth, (req, res) => {

    let id = req.query.id.toString();

    Purchase.findById(id, (err, doc) => {
        if (err) {
            return res.status(400).send(err);
        }
        if (!doc) {
            return res.status(400).send({ message: 'Not found' });
        }

        if (doc.productDetails.length > 0)
            Product.find({ _id: { $in: doc.productDetails } }).select('_id name sku stock brand uom').exec((err, products) => {
                if (err) return res.status(400).send(err);
                res.status(200).send({ doc, products });
            });
    })
})



app.get('/api/getTransactions', auth, (req, res) => {
    // locahost:3001/api/books?skip=3&limit=2&order=asc
    let skip = parseInt(req.query.skip);
    let limit = parseInt(req.query.limit);
    let order = req.query.order;

    // ORDER = asc || desc
    Transaction.find().skip(skip).sort({ createdAt: order }).limit(limit).exec((err, docs) => {
        if (err) return res.status(400).send(err);
        res.send(docs);
    })
})

app.get("/api/profile", auth2, (req, res) => {
    res.json({
        id: req.user.id,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
        phone: req.user.phone,
        address: req.user.address,
        city: req.user.city,
        dob: req.user.dob,
    });
});

app.get("/api/logout", auth2, (req, res) => {
    req.user.deleteToken(req.token, (err, user) => {
        if (err) return res.status(400).send(err);
        res.sendStatus(200);
    });
});



app.get('/api/users', auth, (req, res) => {
    // locahost:3001/api/books?skip=3&limit=2&order=asc
    let skip = parseInt(req.query.skip);
    let limit = parseInt(req.query.limit);
    let order = req.query.order;

    // ORDER = asc || desc
    User.find().skip(skip).sort({ createdAt: 'desc' }).limit(limit).select('_id phone address city dob email name role status').exec((err, doc) => {
        if (err) return res.status(400).send(err);
        res.send(doc);
    })
})

//POST

app.post("/api/register", auth, (req, res) => {
    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) {
            return res.json({ success: false, error: err });
        }
        res.status(200).json({
            success: true,
            user: doc,
        });
    });
});

app.post("/api/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                isAuth: false,
                message: "Login Failed. Email not found",
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({
                    isAuth: false,
                    message: "Password is incorrect",
                });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("auth", user.token).json({
                    isAuth: true,
                    id: user._id,
                    email: user.email,
                    role: user.role
                });
            });
        });
    });
});

app.post("/api/change_password", auth, (req, res) => {
    req.user.comparePassword(req.body.oldPassword, (err, isMatch) => {
        if (!isMatch) {
            return res.json({
                success: false,
                message: "Password is incorrect",
            });
        } else {
            req.user.password = req.body.newPassword;
            req.user.save((err, doc) => {
                if (err) {
                    return res.json({ success: false, error: err });
                }
                res.status(200).json({
                    success: true,
                    message:
                        "Password changed successfully. Please sign in with your new password.",
                });
            });
        }
    });
});


//add Supplier
app.post('/api/addSupplier', auth, (req, res) => {
    const supplier = new Supplier(req.body);

    supplier.save((error, supplier) => {
        if (error) {
            return res.status(400).send(error);
        }
        return res.status(200).json({
            post: true,
            supplierId: supplier._id
        })
    });
})

//add Customer
app.post('/api/addCustomer', auth, (req, res) => {
    const customer = new Customer(req.body);

    customer.save((error, customer) => {
        if (error) {
            return res.status(400).send(error);
        }
        return res.status(200).json({
            post: true,
            customerId: customer._id
        })
    });
})

app.post('/api/addPurchase', auth, (req, res) => {


    const id = shortid.generate();
    if (shortid.isValid(id)) {
        shortid.worker(1);
        req.body._id = id;
    }

    const purchase = new Purchase(req.body);

    let products = req.body.productDetails;
    let productTotalQty = 0;

    products.forEach(element => {
        if (element.returnQty)
            productTotalQty += (Number(element.pqty) - Number(element.returnQty));
        else
            productTotalQty += Number(element.pqty);
    })

    const trans = {
        transaction_date: new Date(),
        primary_quantity: 0,
        rate: purchase.totalAmount,
        transaction_source: 'Supplier',
        transaction_type: 'Purchase',
        transaction_action: 'Purchase Added',
        primary_quantity: productTotalQty,
        transaction_value: purchase.supplierName,
        transaction_value_id: purchase._id,
        comments: purchase.description,
        addedBy: req.user._id
    };


    const transaction = new Transaction(trans);

    return updateWallet(purchase, transaction, products);
    async function updateWallet(purchase) {
        const session = await Purchase.startSession();
        session.startTransaction();
        try {
            await purchase.save((error, doc) => { if (error) console.log("Error Add Purchase", error) });
            await transaction.save();
            await products.forEach(item => {

                Product.findByIdAndUpdate(item._id, {
                    $inc: { stock: item.pqty }
                }, (error) => {
                    if (error) {
                        console.log("Error update stock", error);
                    }
                })
            });

            await session.commitTransaction();
            session.endSession();
            return res.status(200).json({
                post: true,
                purchaseId: purchase._id
            });

        } catch (error) {
            // If an error occurred, abort the whole transaction and
            // undo any changes that might have happened
            await session.abortTransaction();
            session.endSession();
            return res.status(400).send(error);
        }
    }
})

app.post('/api/addSale', auth2, (req, res) => {

    const id = shortid.generate();
    if (shortid.isValid(id)) {
        shortid.worker(1);
        req.body._id = id;
    }

    let products = req.body.productDetails;
    let productTotalQty = 0;
    let linesQuantity = 0;

    products.forEach(element => {
        if (element.secpaid)
            productTotalQty += Number(element.secpaid);
        linesQuantity += Number(element.dqty);
    })

    const sale = new Sale(req.body);
    sale.save((error, sale) => {
        if (error) {
            console.log("Error in saving sale", error);
            return res.status(400).send(error);
        }

        updateWallet(sale);
        async function updateWallet(sale) {
            const session = await Sale.startSession();
            session.startTransaction();
            try {
                Customer.findByIdAndUpdate(sale.customerId, {
                    $inc: { customerLimit: productTotalQty, customerBottles: req.body.bottlesWithCustomer }
                }, (error) => {
                    if (error) {
                        console.log("Error update customer", error);
                    }
                });

                await products.forEach(item => {
                    Product.findByIdAndUpdate(item._id, {
                        $inc: { stock: (item.rqty - item.dqty) }

                    }, (error) => {
                        if (error) {
                            console.log("Error update stock", error);
                        }
                    })
                });

                const trans = {
                    transaction_date: new Date(),
                    primary_quantity: 0,
                    rate: req.body.totalAmount,
                    transaction_source: 'Customer',
                    transaction_type: 'Sale',
                    transaction_action: 'Sale Added',
                    primary_quantity: linesQuantity,
                    transaction_value: req.body.customerName,
                    transaction_value_id: sale._id,
                    comments: req.body.description,
                    addedBy: req.user._id
                };

                const transaction = new Transaction(trans);
                await transaction.save();

                await session.commitTransaction();
                session.endSession();
                return res.status(200).json({
                    post: true,
                    saleId: sale._id
                })

            } catch (error) {
                // If an error occurred, abort the whole transaction and
                // undo any changes that might have happened
                await session.abortTransaction();
                session.endSession();
                return res.status(400).send(error);
            }
        }
    });
})

app.post('/api/addProduct', auth2, (req, res) => {

    const product = new Product(req.body);
    const total = Number(product.price.cost_seal) + Number(product.price.cost_wrapper) +
        Number(product.price.cost_others);
    product.price.total = total;
    product.save((error, product) => {
        if (error) {
            return res.status(400).send(error);
        }
        return res.status(200).json({
            post: true,
            productId: product._id
        })
    });
})

//add Transaction

app.post('/api/addTransaction', auth, (req, res) => {

    const transaction = new Transaction(req.body);

    if (transaction.transaction_action === "Inventory Transfer") {
        if (transaction.from_item && transaction.to_item && transaction.primary_quantity > 0) {
            Product.findByIdAndUpdate(Transaction.to_item, {
                $inc: { stock: transaction.primary_quantity }
            }, (error) => {
                if (error) {
                    console.log("Error Adding Stock Transaction", error);
                }
            });

            Product.findByIdAndUpdate(Transaction.from_item, {
                $inc: { stock: -transaction.primary_quantity }
            }, (error) => {
                if (error) {
                    console.log("Error transferring Stock", error);
                }
            });
        }
    }

    transaction.save((error, transaction) => {
        if (error) {

            return res.status(400).send(error);
        }
        return res.status(200).json({
            post: true,
            transactionId: transaction._id
        })
    });
})


// UPDATE //

app.post('/api/supplier_update', auth, (req, res) => {
    Supplier.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, doc) => {
        if (err) return res.status(400).send(err);
        res.json({
            success: true,
            doc
        })
    });
})

app.post('/api/product_update', auth, (req, res) => {
    Product.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, doc) => {
        if (err) return res.status(400).send(err);
        res.json({
            success: true,
            doc
        })
    });
})

app.post('/api/purchase_paid_update', auth, (req, res) => {
    let purchase = req.body;

    if (purchase.paidAmount < purchase.totalAmount && purchase.totalAmount > 0) {
        if (purchase.status === 'Complete')
            purchase.status = 'Pending'
        else if (purchase.status === 'Returned Items') {
            purchase.status = 'Returned Items Pending'
        }
    }
    else if (purchase.paidAmount >= purchase.totalAmount) {
        if (purchase.status === 'Pending')
            purchase.status = 'Complete'
        else if (purchase.status === 'Returned Items Pending') {
            purchase.status = 'Returned Items'
        }
    }
    Purchase.findByIdAndUpdate(req.body._id, purchase, { new: true }, (err, doc) => {
        if (err) return res.status(400).send(err);
        return res.status(200).json({
            success: true
        });
    });
})

app.post('/api/sale_paid_update', auth, async function (req, res) {
    let sale = req.body;


    let rate = 0;
    let excessBottles = 0;
    let secBottles = 0;

    try {
        if (sale.type === 'security_update') {
            await sale.productDetails.forEach(element => {
                Product.findById(element._id, (err, prod) => {
                    if (prod) {
                        if (prod.sku == "CN19LL") {
                            if (Number(sale.secAmount) >= 0) {
                                rate += Number(element.secRate);
                            }

                            if (Number(sale.custExBottles) > 0) {
                                if (Number(sale.secAmount) > 0) {
                                    excessBottles = Number(sale.custExBottles) * Number(rate);
                                }
                            }

                            let totalSecruityAmount = Number(sale.custExBottles) * Number(rate);
                            let paidSecurity = totalSecruityAmount - sale.secAmount;
                            let currentBottles = Math.floor(Number(paidSecurity) / rate);
                            paidSecurity += sale.payment_amount;

                            const paidBottles = Math.floor(Number(paidSecurity) / rate);

                            sale.secAmount -= sale.payment_amount
                            element.secpaid = paidBottles;

                            Customer.findByIdAndUpdate(sale.customerId, {
                                $inc: { customerLimit: paidBottles - currentBottles }
                            }, (error) => {
                                if (error) {
                                    console.log("Error update customer", error);
                                }
                            });

                            if (sale.paidAmount < sale.totalAmount && sale.totalAmount > 0) {
                                if (sale.status === 'Complete')
                                    sale.status = 'Pending'
                            }
                            else if (sale.paidAmount >= sale.totalAmount) {
                                if (sale.status === 'Pending')
                                    sale.status = 'Complete'
                            }
                            Sale.findByIdAndUpdate(req.body._id, sale, { new: true }, (err, doc) => {
                                if (err) return res.status(400).send(err);
                                return res.status(200).json({
                                    success: true
                                });
                            });
                        }
                    }
                })

            })
        }
        else if (sale.type === 'due_update') {

            if (sale.paidAmount < sale.totalAmount && sale.totalAmount > 0) {
                if (sale.status === 'Complete')
                    sale.status = 'Pending'
            }
            else if (sale.paidAmount >= sale.totalAmount) {
                if (sale.status === 'Pending')
                    sale.status = 'Complete'
            }
            Sale.findByIdAndUpdate(req.body._id, sale, { new: true }, (err, doc) => {
                if (err) return res.status(400).send(err);
                return res.status(200).json({
                    success: true
                });
            });
        }
        else if (sale.type === 'paid_amount_update') {
            if (sale.paidAmount < sale.totalAmount && sale.totalAmount > 0) {
                if (sale.status === 'Complete')
                    sale.status = 'Pending'
            }
            else if (sale.paidAmount >= sale.totalAmount) {
                if (sale.status === 'Pending')
                    sale.status = 'Complete'
            }
            Sale.findByIdAndUpdate(req.body._id, sale, { new: true }, (err, doc) => {
                if (err) return res.status(400).send(err);
                return res.status(200).json({
                    success: true
                });
            });

        }
    } catch (error) {
        return res.status(200).json({
            success: false
        })
    }

})

app.post('/api/sale_refund', auth, (req, res) => {

    let sale = req.body;
    let products = sale.productDetails;
    let productTotalQty = 0;
    let linesQuantity = 0;
    let bottlesWithCustomer = 0;

    products.forEach(element => {
        if (element.secpaid)
            productTotalQty += Number(element.secpaid);
        linesQuantity += Number(element.dqty);
    })

    if (sale.status !== 'Returned') {
        update(sale, products)

        async function update(sale, products) {

            await products.forEach(item => {
                const totalItems = item.dqty - item.rqty;

                Product.findById(item._id, (err, prod) => {

                    if (prod) {
                        if (prod.sku == "CN19LL") {
                            bottlesWithCustomer = (Number(item.dqty) - (Number(item.rqty)))

                            Customer.findByIdAndUpdate(sale.customerId, {
                                $inc: { customerLimit: -productTotalQty, customerBottles: -bottlesWithCustomer }
                            }, (error) => {
                                if (error) {
                                    console.log("Error update customer", error);
                                }
                            });
                        }
                    }
                })

                Product.findByIdAndUpdate(item._id, {
                    $inc: { stock: totalItems }
                }, (error) => {
                    if (error) {
                        console.log("Error update stock", error);
                    }
                })
            })

            const trans = {
                transaction_date: new Date(),
                primary_quantity: linesQuantity,
                rate: sale.totalAmount,
                transaction_source: 'Customer',
                transaction_type: 'Sale',
                transaction_action: 'Sale Returned',
                transaction_value: sale.customerName,
                transaction_value_id: sale._id,
                comments: sale.description,
                addedBy: req.user._id
            };

            const transaction = new Transaction(trans);
            await transaction.save();

            sale.status = 'Returned';
            await Sale.findByIdAndUpdate(sale._id, sale, { new: true });

            return res.status(200).json({
                success: true
            });
        }
    }
    else {
        return res.status(400).send("Error returning sale");
    }
})


app.post('/api/purchase_update', auth, async function (req, res) {

    let purchase = req.body;
    let products = purchase.productDetails;

    try {
        let action = '';

        if (req.body.status === 'Returned')
            action = 'Purchase Returned'
        else
            action = 'Purchase Items Returned'

        let productTotalQty = 0;

        products.forEach(element => {
            if (element.returnQty)
                productTotalQty += (Number(element.pqty) - Number(element.returnQty));
            else
                productTotalQty += Number(element.pqty);
        })


        const trans = {
            transaction_date: new Date(),
            primary_quantity: 0,
            rate: req.body.totalAmount,
            transaction_source: 'Supplier',
            transaction_type: 'Purchase',
            transaction_action: action,
            primary_quantity: productTotalQty,
            transaction_value: req.body.supplierName,
            transaction_value_id: req.body._id,
            comments: req.body.description,
            addedBy: req.user._id
        };

        const transaction = new Transaction(trans);
        await transaction.save();
        await products.forEach(item => {
            Product.findByIdAndUpdate(item._id, {
                $inc: { stock: -item.returnSelected }
            }, (error) => {
                if (error) {
                    console.log("Error update stock", error);
                }
            })
        })
        for (var index = 0; index < purchase.productDetails.length; index++) {
            delete purchase.productDetails[index].returnSelected;
        }

        await Purchase.findByIdAndUpdate(req.body._id, req.body, { new: true });
        return res.status(200).json({
            success: true
        });
    }
    catch (error) {
        return res.status(400).send(error);
    }
});

app.post('/api/customer_update', auth, (req, res) => {
    Customer.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, doc) => {
        if (err) return res.status(400).send(err);
        res.json({
            success: true,
            doc
        })
    });
})

app.post('/api/transaction_update', auth, (req, res) => {
    const transaction = new Transaction(req.body);

    if (transaction.transaction_action === "Inventory Transfer") {
        if (transaction.from_item && transaction.to_item && transaction.primary_quantity > 0) {
            Product.findByIdAndUpdate(Transaction.to_item, {
                $inc: { stock: transaction.primary_quantity }
            }, (error) => {
                if (error) {
                    console.log("Error Adding Stock Transaction", error);
                }
            });

            Product.findByIdAndUpdate(Transaction.from_item, {
                $inc: { stock: -transaction.primary_quantity }
            }, (error) => {
                if (error) {
                    console.log("Error transferring Stock", error);
                }
            });
        }
    }

    Transaction.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, doc) => {
        if (err) return res.status(400).send(err);
        res.json({
            success: true,
            doc
        })
    });
})


app.post("/api/user_profile_update", auth, (req, res) => {
    User.findByIdAndUpdate(req.user._id, req.body, { new: true, select: "name role address dob city _id email phone" }, (err, user) => {
        if (err) return res.status(400).send(err);
        res.json({
            success: true,
            user,
        });
    });
});

app.post("/api/userchange", auth, (req, res) => {

    User.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err) => {
        if (err) return res.status(400).send(err);
        return res.status(200).send({ success: true })
    });
});

app.post("/api/userchangepwd", auth, (req, res) => {

    User.findById(req.body._id, (err, user) => {
        if (err) return res.status(400).send(err);
        if (user) {
            user.password = req.body.password;

            user.save((error, user) => {
                if (error) {
                    return res.status(400).send({ success: false });
                }
                if (user) {
                    return res.status(200).send({ success: true });
                }
            })
        }
    })
});


// DELETE //

app.delete('/api/delete_supplier', auth, (req, res) => {
    let id = req.query.id;

    Supplier.findByIdAndRemove(id, (err, doc) => {
        if (err) return res.status(400).send(err);
        res.json(true)
    })
})

app.delete('/api/delete_customer', auth, (req, res) => {
    let id = req.query.id;

    Customer.findByIdAndRemove(id, (err, doc) => {
        if (err) return res.status(400).send(err);
        res.json(true)
    })
})

app.delete('/api/delete_transaction', auth, (req, res) => {
    let id = req.query.id;

    Transaction.findByIdAndRemove(id, (err, doc) => {
        if (err) return res.status(400).send(err);
        res.json(true)
    })
})

if (process.env.NODE_ENV === "production") {
    const path = require("path");
    app.get("/*", (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'), function (err) {
            if (err) {
                res.status(500).send(err)
            }
        })
    });
}

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server Running at port: ${port}`);
});
