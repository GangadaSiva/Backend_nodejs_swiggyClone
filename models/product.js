const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName:{
        type: String,
        required: true,
    },
    price:{
        type: String,
        required: true
    },
    category:{
        type: [{
            type: String,
            enum : ['veg', 'non-veg']
        }]
    },
    bestSeller:{
        type: String
    },
    image:{
        type: String
    },
    description:{
        type: String
    },
    firm:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'firm'
    }]

})

const product = mongoose.model('product', productSchema);

module.exports = product;