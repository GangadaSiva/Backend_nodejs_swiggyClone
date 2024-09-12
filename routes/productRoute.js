const express = require('express');
const productcontroller = require('../controllers/productcontroller');

const router = express.Router();

router.post('/add-product/:firmId', productcontroller.addProduct);
router.get('/get-product/:firmId', productcontroller.getProductByFirm);

router.get('/uploads/:imageName',(req, res)=>{
    const imageName = req.params.imageName;
    res.headersSent('Content-Type', image/jpeg);
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName));
})

router.delete('/delete/:productId', productcontroller.deleteProductById);

module.exports = router;