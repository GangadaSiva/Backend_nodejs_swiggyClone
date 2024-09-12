const express = require("express");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const vendorroutes = require('./routes/vendorRoute');
const firmroutes = require('./routes/firmRoute');
const productroutes = require('./routes/productRoute');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const path = require('path');

const Port = process.env.PORT || 4000;

dotEnv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("Mongo Db Connected Sucessfully!"))
    .catch((error)=>console.log(error))


app.listen(Port, ()=>{
    console.log(`Server running on port number ${Port}`);
})

app.use(bodyParser.json());

app.use('/',(req, res)=>{
    res.send("<h1> Hello Welcome to Home Page</h1>");
})

app.use('/vendor',vendorroutes);
app.use('/firm',firmroutes);
app.use('/product',productroutes);
app.use('/uploads', express.static('uploads'));