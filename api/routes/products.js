const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../../api/middleware/check-auth');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpge' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage, 
    limits: {
        fileSize: 1024 * 1024 * 5
    }, 
    fileFilter: fileFilter
});

const ProductsController = require('../controllers/products');

router.get('/', ProductsController.getProductsAll);

router.post('/', checkAuth, upload.single('productImage'), ProductsController.saveProduct);

router.get('/:productId', ProductsController.getProduct);

router.patch('/:productId', checkAuth, ProductsController.changeProduct);

router.delete('/:productId', checkAuth, ProductsController.deleteProduct);

module.exports = router;