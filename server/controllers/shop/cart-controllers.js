const Cart = require("../../models/Cart")
const Product = require("../../models/Products")
const mongoose = require("mongoose");


const addCartItems = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        console.log("🔹 Received userId:", userId);
        console.log("🔹 Received productId:", productId);

        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ success: false, message: "Invalid userId or productId format" });
        }

        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            console.log("❌ Product not found in DB");
            return res.status(404).json({ success: false, message: "Product not found" });
        }


        // Validate input
        if (!userId || !productId || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields",
            });
        }

        // Check if product exists
        // const product = await Product.findById(productId);
        // if (!product) {
        //     return res.status(404).json({
        //         success: false,
        //         message: "Product not found",
        //     });
        // }

        // Find or create cart
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({
                userId,
                items: [{ productId, quantity }],
            });
        } else {
            if (!cart.items) cart.items = []; // Safety check

            // Check if product is already in cart
            const findCurrentProductIndex = cart.items.findIndex(
                (item) => item.productId.toString() === productId
            );

            if (findCurrentProductIndex === -1) {
                // Add new product
                cart.items.push({ productId, quantity });
            } else {
                // Update quantity
                cart.items[findCurrentProductIndex].quantity += quantity;
            }
        }

        // Save the cart
        await cart.save();

        res.status(200).json({
            success: true,
            data: cart,
        });

    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({
            success: false,
            message: "Error adding to cart",
        });
    }
};



const fetchCartItems = async(req,res)=>{
    try {
        const {userId,} = req.params
        if (!userId){
            res.status(400).json({
                success: true,
                message: "userId is required"
            })
        }

        const cart = await Cart.findOne({userId}).populate({
            path: 'items.productId',
            select : "image title price salePrice"
        })
        if (!cart){
            res.status(404).json({
                success: true,
                message: "cart is required"
            })
        }

       
    const validItems = cart.items.filter(
        (productItem) => productItem.productId
      );
        if (validItems.length < cart.items.length){
         cart.items = validItems
         await cart.save()
        }

        const populateCartItems = validItems.map((item) => ({
            productId: item.productId._id,
            image: item.productId.image,
            title: item.productId.title,
            price: item.productId.price,
            salePrice: item.productId.salePrice,
            quantity: item.quantity,
          }));

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

        const { userId, productId, quantity } = req.body;
        if (!userId || !productId || !quantity) {
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

        const findCurrentProductIndex = cart.items.findIndex(item=>item.productId.toString()===productId.toString())

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
            select : "image title price salePrice"
        })

        const populateCartItems = cart.items.map(item=>({
            productId : item.productId? item.productId._id : null,
            image : item.productId? item.productId.image: null,
            title : item.productId? item.productId.title: "Product not Found",
            price : item.productId? item.productId.price: null,
            salePrice : item.productId? item.productId.salePrice: null,
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

const deleteCartItems = async (req, res) => {
    try {
      const { userId, productId } = req.params;
      if (!userId || !productId) {
        return res.status(400).json({
          success: false,
          message: "Invalid request",
        });
      }
  
      const cartData = await Cart.findOne({ userId }).populate({
        path: "items.productId",
        select: "image title price salePrice",
      });
  
      if (!cartData) {
        return res.status(400).json({
          success: false,
          message: "Cart not found",
        });
      }
  
      cartData.items = cartData.items.filter(
        item => item.productId?._id.toString() !== productId
      );
  
      await cartData.save();
  
      await cartData.populate({
        path: "items.productId",
        select: "image title price salePrice",
      });
  
      const populateCartItems = cartData.items.map(item => ({
        productId: item.productId?._id || null,
        image: item.productId?.image || null,
        title: item.productId?.title || "Product not Found",
        price: item.productId?.price || null,
        salePrice: item.productId?.salePrice || null,
        quantity: item.quantity,
      }));
  
      res.status(200).json({
        success: true,
        data: {
          ...cartData._doc,
          items: populateCartItems,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error removing item from cart",
      });
    }
  };
  

module.exports = { addCartItems,fetchCartItems,UpdateCartItemQuantity,deleteCartItems}  //exporting