const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const config = require('./config/config').get(process.env.NODE_ENV);
const app = express();
const { auth } = require('./middleware/auth');

const http = require("http");

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });

const { User } = require('./models/user');
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static('client/build'))


// GET //     
            
app.get('/api/auth',auth,(req,res)=>{
    res.json({
        isAuth:true,
        id: req.user.id,
        email: req.user.email,
        name: req.user.name,
        role:req.user.role
    })
})


app.get('/api/logout',auth,(req,res)=>{
    
    req.user.deleteToken(req.token,(err,user)=>{
        if(err) return res.status(400).send(err);
        res.sendStatus(200);
    });
})

app.get('/api/users',(req,res)=>{

    User.find({},(err,users)=>{
        if(err) return res.status(400).send(err);
        res.status(200).send(users);
    })
})


app.post('/api/register',(req,res)=>{

    const user = new User(req.body);
    
    user.save((err,doc)=>{
        if(err) return res.json({success:false});

        res.status(200).json({
            success:true,
            user:doc
        })

    })
})


app.post('/api/login',(req,res)=>{
    
    User.findOne({'email':req.body.email},(err,user)=>{
        if(!user) return res.json({
            isAuth:false,
            message: 'Login Failed. Email not found'
        })

        user.comparePassword(req.body.password,(err,isMatch)=>{
            if(!isMatch) return res.json({
                isAuth:false,
                message:'Password is incorrect'
            });

            user.generateToken((err,user)=>{
                if(err) return res.status(400).send(err);
                res.cookie('auth',user.token).json({
                    isAuth:true,
                    id:user._id,
                    email:user.email
                })
            })
        })
    })
})


if(process.env.NODE_ENV === 'production'){
    const path = require('path');
    app.get('/*',(req,res)=>{
        res.sendfile(path,resolve(__dirname,'../client','build','index.html'))
    })
}


const port = process.env.PORT || 3001; 
app.listen(port,()=>{
    console.log(`Server Running at port: ${port}`);
});