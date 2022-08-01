const express=require("express");
const cors=require("cors");
const connectDatabase=require("../src/Backend/Database/index");
const HotelRouter=require("../src/Backend/Routers/HotelRouter");
const UserRouter = require("../src/Backend/Routers/User");
const BookingRouter=require("../src/Backend/Routers/BookingRouter");
//const GoogleRouter = require("./Routers/GoogleAuth");
const session = require('express-session');


const CheckoutRouter = require("../src/Backend/Routers/CheckoutRouter");
const getCityRouter = require("../src/Backend/Routers/getcity");


const app=express();
const port = 3001;
app.use(cors());
app.use(express.json());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))

app.use((req,res,next) =>{
    console.log('request receive')
    console.log(req.body)
    next()
}) 

app.use(getCityRouter);
app.use(HotelRouter);
app.use(UserRouter);
app.use(BookingRouter);

// app.use(GoogleRouter);

app.use(CheckoutRouter);

connectDatabase()
.then(()=>{
    app.listen(process.env.PORT || port,()=>
    {
        console.log(`Server connected to port ${port}`);
    })
})

