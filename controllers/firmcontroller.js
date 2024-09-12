const vendor = require('../models/vendor');
const multer = require('multer');
const firm = require('../models/firm');

const storage = multer.diskStorage({
    destination : function (req, file, cb){
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb){
        cb(null, Date.now()+ path.extname(file.originalname));
    }
});
const upload = multer({storage: storage});

const addFirm = async(req, res)=>{
    try {
        const {firmName, area, category, region, offer} = req.body;

    const image = req.file? req.file.filename: undefined;

    const Vendor = await vendor.findById(req.vendorId);
    if(!Vendor){
        res.status(404).json({message: "Vendor not found"});
    }

    const Firm = new firm({
        firmName, area, category, region, offer, image, vendor : Vendor._id
    })

    const savedFirm = await Firm.save();
    Vendor.firm.push(savedFirm);
    await Vendor.save();

    return res.status(200).json({message: "Firm added succesfully"});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal server error"});
    }
}

const deleteFirmById = async(req,res)=>{
    try {
        const firmId = req.params.firmId;
        const deletedFirm = await product.findByIdAndDelete(firmId);
        if(!deletedFirm){
            return res.status(404).json({message: "Firm not found"});
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal server error"});
    }
}

module.exports = {addFirm: [upload.single('image'), addFirm], deleteFirmById};