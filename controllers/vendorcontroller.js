const vendor = require('../models/vendor');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotEnv = require('dotenv');

dotEnv.config();

const SecretKey = process.env.SECRET_KEY;

const vendorRegister = async(req,res)=>{
    const {username, password, email} = req.body;

    try{
        const vendorEmail = await vendor.findOne({email});
        if(vendorEmail){
            return res.status(400).json("Email already taken");
        }
        const hashPassword = await bcrypt.hash(password, 10);

        const newVendor = new vendor({
            username,
            email,
            password: hashPassword
        });
        await newVendor.save();
        res.status(201).json({message: "vendor registered successfully"});
        console.log("Registered");

    }catch(error){
        console.error(error);
        res.status(500).json({error: "Internal server error"});
    }
}

const vendorLogin = async(req, res)=>{
    const {email,password} = req.body;
    try{
        const Vendor = await vendor.findOne({email});
        if(!Vendor || !(await bcrypt.compare(password, Vendor.password))){
            return res.status(401).json({error: "Invalid email or Password"});
        }
        const token = jwt.sign({vendorId : Vendor._id}, SecretKey, {expiresIn : "1h"});

        res.status(200).json({success:"Login successful", token} );
        console.log(email, token);
    }catch(error){
        console.error(error);
        res.status(500).json({error: "Internal server error"});
    }
}

const getAllVendors = async(req, res)=>{
    try {
        const vendors = await vendor.find().populate('firm');
        res.json({vendors});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal server error"});
    }
}

const getVendorById = async(req,res)=>{
    const vendorId = req.params.id;
    try {
        const Vendor = await vendor.findById(vendorId).populate('firm');
        if(!Vendor){
            return res.status(404).json({error: "Vendor not found"});
        }
        res.status(200).json({Vendor});

    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal server error"});
    }
}

module.exports = {vendorRegister, vendorLogin, getAllVendors, getVendorById};