const product = require('../models/product');
const firm = require('../models/firm');
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination : function (req, file, cb){
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb){
        cb(null, Date.now()+ path.extname(file.originalname));
    }
});
const upload = multer({storage: storage});

const addProduct = async(req, res)=>{
    try {
        const {productName, price, category, bestseller, description} = req.body;

    const image = req.file? req.file.filename: undefined;

    const firmId = req.params.firmId

    const Firm = await firm.findById(firmId);
    if(!Firm){
        return res.status(404).json({message: "Firm not found"});
    }

    const Product = new product({
        productName, price, category, bestseller, description, image, firm : Firm._id
    })

    const savedProduct = await Product.save();
    Firm.product.push(savedProduct);
    await Firm.save();

    return res.status(200).json({message: "Product added succesfully"});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal server error"});
    }
}

const getProductByFirm = async(req,res)=>{
    
    try {
        const firmId = req.params.firmId;
        const Firm = await firm.findById(firmId);
        if(!Firm){
            return res.status(404).json({error: "Firm not found"});
        }
        const restaurantName = Firm.firmName;
        const products = await product.find({firm : firmId});
        res.status(200).json({restaurantName, products});

    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal server error"});
    }
}

const deleteProductById = async(req,res)=>{
    try {
        const productId = req.params.productId;
        const deletedProduct = await product.findByIdAndDelete(productId);
        if(!deletedProduct){
            return res.status(404).json({message: "Product not found"});
        }
        res.status(200).json({ message: "Product deleted successfully", product: deletedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal server error"});
    }
}

module.exports = {addProduct: [upload.single('image'), addProduct], getProductByFirm, deleteProductById};