const Cart = require("../../models/Cart")
const Product = require("../../models/Products")


const addToCart = async(req,res)=>{
    try {
        const {userId, productId, quantity} = req.body
        if ( !userId || !productId || quantity<=0 ) {
            return res.status(400).json({
                success : false,
                message: "Please fill all fields"
            })
            }

        const product = await Product.findById(productId)
        if (!product) {
            return res.status(404).json({
                success : false,
                message: "Product not found"
                })
                }
        
        const cart = await Cart.findOne({userId})  //to find whether already added or not
                if (!cart){
                     cart = new Cart({userId,items})
                }
        const findCurrentProductIndex = cart.items.findIndex(item => item.productId.toString() === productId)

        if (findCurrentProductIndex === -1){
            cart.items.push({quantity,prodcutId})
        }else {
            cart.items[findCurrentProductIndex].quantity += quantity
        }

        await cart.save()
        res.status(200).json({
            success : true,
            data : cart
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : "Error adding to cart"
        })
        
    }
}

const fetchCartItems = async(req,res)=>{
    try {
        const {userId} = req.params
        if (!userId){
            res.status(400).json({
                success: true,
                message: "userId is required"
            })
        }

        const cart = await Cart.findOne({userId}).populate({
            path : 'item.prodcutId',
            select : "image title price salePrice"
        })
        if (!cart){
            res.status(404).json({
                success: true,
                message: "cart is required"
            })
        }

        const validItem = cart.items.filter(productItem => productItem.prodcutId)
        if (validItem.length < cart.items.length){
         cart.items = validItem
         await cart.save()
        }

        const populateCartItems = validItem.map(item=>({
            productId : item.productId._id,
            image : item.productId.image,
            title : item.productId.title,
            price : item.productId.price,
            salePrice : item.productId.salePrice,
            quantity : item.quantity
        }))

        res.status(200).json({
            success : true,
            data : {
                ...cart._doc,
                items : populateCartItems
        }})
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : "Error adding to cart"
        })
        
    }
}

const UpdateCartItemQuantity = async(req,res)=>{
    try {

        const { userId, prodcutId, quantity } = req.body;
        if (!user || !prodcutId || !quantity) {
            res.status(400).json({
                success: false,
                message: "Invalid request"
                })
                } 

        const cart = await Cart.findOne({ userId});
        if (!cart) {
            res.status(400).json({
                success: false,
                message: "Cart not found"
                })
                }

        const findCurrentProductIndex = cart.items.findIndex(item=>item.prodcutId.toString()===prodcutId)

        if (findCurrentProductIndex === -1) {
            res.status(404).json({
                success: false,
                message: "Product not found in cart"
                })
                }
        cart.items[findCurrentProductIndex].quantity = quantity
        await cart.save()

        await cart.populate({
            path : "items.productId",
            select : "image title proce salePrice"
        })

        const populateCartItems = cart.items.map(item=>({
            productId : item.prodcutId? item.productId._id : null,
            image : item.image? item.productId.image: null,
            title : item.title? item.productId.title: "Product not Found",
            price : item.price? item.productId.price: null,
            salePrice : item.salePrice? item.productId.salePrice: null,
            quantity : item.quantity
        }))

        res.status(200).json({
            success : true,
            data : {
                ...cart._doc,
                items : populateCartItems
        }})


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : "Error adding to cart"
        })
        
    }
}

const deleteCartItems = async(req,res)=>{
    try {
        const {userId , productId} = req.params
        if(!userId || !productId){
            return res.status(400).json({
                success : false,
                message : "Invalid request"
            })
        }

        const cart = await cart.findIndex({userId}).populate({
             path : "items.productId",
            select : "image title proce salePrice"
        })

        if (!cart) {
            res.status(400).json({
                success: false,
                message: "Cart not found"
                })
                }

        cart.items = cart.items.filter(item => item.prodcutId._id.toString() !== productId)

        await cart.save()
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : "Error adding to cart"
        })
        
    }
}

module.exports = { addCartItems,fetchCartItems,UpdateCartItemQuantity,deleteCartItems}  //exporting