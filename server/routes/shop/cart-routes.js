const express = require('express');

const {addCartItems,fetchCartItems,UpdateCartItemQuantity,deleteCartItems} = require("../../controllers/shop/cart-controllers")

const router = express.Router();

router.post("/add",addCartItems)
router.get("/get/:userId",fetchCartItems)
router.put("update-cart",UpdateCartItemQuantity)
router.delete("/delete/:cartId/:productId",deleteCartItems)

module.exports= router