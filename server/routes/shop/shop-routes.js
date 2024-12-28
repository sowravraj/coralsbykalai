const express = require('express');
const { upload } = require('../../helpers/cloudinary');
const {getFilteredProducts} = require("./../../controllers/shop/product-controllers")
const router = express.Router();



router.get("/get",getFilteredProducts)



module.exports = router;  //export the router to use in other files