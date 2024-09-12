const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    firm: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'firm'
    }]
})

const vendor = mongoose.model("vendor", vendorSchema);

module.exports = vendor;