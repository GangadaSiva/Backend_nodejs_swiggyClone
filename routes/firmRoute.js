const express = require('express');
const verifyToken = require('../middlewear/verifyToken');
const firmcontroller = require('../controllers/firmcontroller');

const router = express.Router();

router.post('/add-firm', verifyToken, firmcontroller.addFirm);

router.get('/uploads/:imageName',(req, res)=>{
    const imageName = req.params.imageName;
    res.headersSent('Content-Type', image/jpeg);
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName));
})

router.delete('/delete/:firmId', firmcontroller.deleteFirmById);

module.exports = router;