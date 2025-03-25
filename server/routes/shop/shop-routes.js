const express = require('express');
const { upload } = require('../../helpers/cloudinary');
const {getFilteredProducts,getProductDetails} = require("./../../controllers/shop/product-controllers")
const router = express.Router();



router.get("/get",getFilteredProducts)
router.get("/get/:id",getProductDetails)



module.exports = router;  //export the router to use in other files