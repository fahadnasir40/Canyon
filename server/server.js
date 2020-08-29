const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const config = require("./config/config").get(process.env.NODE_ENV);
const app = express();
const { auth } = require("./middleware/auth");

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
        console.log("Error Compare", err);
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

app.post('/api/addSupplier', (req, res) => {
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

app.post('/api/addCustomer', (req, res) => {
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

app.post('/api/addProduct',auth,(req, res) => {

    const product = new Product(req.body);
    const total = Number(product.price.cost_seal) + Number(product.price.cost_wrapper) + 
    Number(product.price.cost_others);
    
    product.price.total = total;
    console.log("Product",product)

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
