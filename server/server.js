const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const config = require("./config/config").get(process.env.NODE_ENV);
const app = express();
const { auth } = require("./middleware/auth");
const shortid = require('shortid');

const http = require("http");

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

app.get("/api/auth", auth, (req, res) => {
    res.json({
        isAuth: true,
        id: req.user.id,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
    });
});

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
    Supplier.find().skip(skip).sort({ _id: order }).limit(limit).exec((err, doc) => {
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
    Supplier.find({ status: "active" }).skip(skip).sort({ _id: order }).limit(limit).select('_id name brand').lean().exec((err, doc) => {
        if (err) return res.status(400).send(err);
        res.send(doc);
    })
})

app.get('/api/getCustomer', auth, (req, res) => {
    let id = req.query.id;

    Customer.findById(id, (err, doc) => {
        if (err) return res.status(400).send(err);
        res.send(doc);
    })
})


app.get('/api/getCustomersTransactions', auth, (req, res) => {
    let skip = parseInt(req.query.skip);
    let limit = parseInt(req.query.limit);
    let order = req.query.order;

    // ORDER = asc || desc
    Customer.find({ status: "active" }).skip(skip).sort({ _id: order }).limit(limit).select('_id name brand').exec((err, doc) => {
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
    User.find().skip(skip).sort({ _id: order }).limit(limit).select('_id name').exec((err, doc) => {
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
    Supplier.find({ status: 'active' }).skip(skip).sort({ _id: order }).limit(limit).exec((err, doc) => {
        if (err) return res.status(400).send(err);
        res.send(doc);
    })
})

app.get('/api/getCustomers', auth, (req, res) => {
    // locahost:3001/api/books?skip=3&limit=2&order=asc
    let skip = parseInt(req.query.skip);
    let limit = parseInt(req.query.limit);
    let order = req.query.order;

    // ORDER = asc || desc
    Customer.find().skip(skip).sort({ _id: order }).limit(limit).exec((err, doc) => {
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
    Product.find().skip(skip).sort({ _id: order }).limit(limit).exec((err, doc) => {
        if (err) return res.status(400).send(err);
        res.send(doc);
    })
})

app.get('/api/getActiveProducts', auth, (req, res) => {
    // locahost:3001/api/books?skip=3&limit=2&order=asc
    let skip = parseInt(req.query.skip);
    let limit = parseInt(req.query.limit);
    let order = req.query.order;

    // ORDER = asc || desc
    Product.find({ status: 'active' }).skip(skip).sort({ _id: order }).limit(limit).exec((err, doc) => {
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
    Purchase.find().skip(skip).sort({ _id: order }).limit(limit).exec((err, doc) => {
        if (err) return res.status(400).send(err);
        res.send(doc);
    })
})

app.get('/api/getSales', auth, (req, res) => {
    // locahost:3001/api/books?skip=3&limit=2&order=asc
    let skip = parseInt(req.query.skip);
    let limit = parseInt(req.query.limit);
    let order = req.query.order;

    // ORDER = asc || desc
    Sale.find().skip(skip).sort({ _id: order }).limit(limit).exec((err, doc) => {
        if (err) return res.status(400).send(err);
        res.send(doc);
    });
});


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
    Transaction.find().skip(skip).sort({ _id: order }).limit(limit).exec((err, docs) => {
        if (err) return res.status(400).send(err);
        res.send(docs);
    })
})

app.get("/api/profile", auth, (req, res) => {
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

app.get("/api/logout", auth, (req, res) => {
    req.user.deleteToken(req.token, (err, user) => {
        if (err) return res.status(400).send(err);
        res.sendStatus(200);
    });
});

app.get("/api/users", (req, res) => {
    User.find({}, (err, users) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(users);
    });
});

//POST

app.post("/api/register", (req, res) => {
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

app.post('/api/addSale', (req, res) => {
    const sale = new Sale(req.body);

    sale.save((error, sale) => {
        if (error) {
            return res.status(400).send(error);
        }
        return res.status(200).json({
            post: true,
            saleId: sale._id
        })
    });
})

app.post('/api/addProduct', auth, (req, res) => {

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

app.post('/api/supplier_update', (req, res) => {
    Supplier.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, doc) => {
        if (err) return res.status(400).send(err);
        res.json({
            success: true,
            doc
        })
    });
})

app.post('/api/product_update', (req, res) => {
    Product.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, doc) => {
        if (err) return res.status(400).send(err);
        res.json({
            success: true,
            doc
        })
    });
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

app.post('/api/customer_update', (req, res) => {
    Customer.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, doc) => {
        if (err) return res.status(400).send(err);
        res.json({
            success: true,
            doc
        })
    });
})

app.post("/api/user_update", (req, res) => {
    User.findByIdAndUpdate(req.body.id, req.body, { new: true }, (err, user) => {
        if (err) return res.status(400).send(err);
        res.json({
            success: true,
            user,
        });
    });
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
        res.sendfile(path, resolve(__dirname, "../client", "build", "index.html"));
    });
}

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server Running at port: ${port}`);
});
