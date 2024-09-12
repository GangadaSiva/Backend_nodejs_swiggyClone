const vendor = require('../models/vendor');
const jwt = require('jsonwebtoken');
const dotEnv = require('dotenv');

const secretKey = process.env.SECRET_KEY;

const verifyToken = async(req, res, next)=>{
    const token = req.headers.token;
    if(!token){
        return res.status(401).json({error: "Token is required"});
    }
    try {
        const decode = jwt.verify(token, secretKey);
        const Vendor = await vendor.findById(decode.vendorId);
        if(!Vendor){
            return res.status(404).json({error: "vendor not found"});
        }
        req.vendorId = Vendor._id
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Invalid Token"});
    }
}

module.exports = verifyToken;