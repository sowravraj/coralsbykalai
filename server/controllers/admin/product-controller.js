const { ImageUploadUtil } = require("../../helpers/cloudinary");
const Products = require("../../models/Products");



const handleImageUpload = async (req,res) => {

    try {

        const b64 = Buffer.from(req.file.buffer).toString("base64");
        const url = "data:" + req.file.mimetype + ";base64," + b64;
        const result = await ImageUploadUtil(url)

        res.json({
            success: true,
            result
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            success:"false",
            message:"Error occured While Uploading"
        })
    }

}


//add a new product

const addProduct = async (req,res) => {
    try {

        const { image, title, description, category, brand, price, salePrice, totalStock  } = req.body;
        const newlyCreatedProduct = new Products({
            image, title, description, category, brand, price, salePrice, totalStock
        })
        await newlyCreatedProduct.save();
        res.status(201).json({
            success: true,
            data:newlyCreatedProduct,
            message: "Product Added Successfully"
            })
    } catch (error) {
        console.log(error);
        res.status(401).json({
            success:"false",
            message:"Error occured While Adding Product"
        })
    }
}



//fetch all the product

const fetchAllProduct = async (req,res) => {
    try {
        const listOfProducts = await Products.find({})
        res.status(201).json({
            success: true,
            data:listOfProducts,
            message: "Products Fetched Successfully"
            })
    } catch (error) {
        console.log(error);
        res.json({
            success:"false",
            message:"Error occured While Fetching Product"
        })
    }
}

//delete a product

const deleteProduct = async (req,res) => {
    try {
        const {id} = req.params;
        const deletedProduct = await Products.findByIdAndDelete(id)

        if(!deletedProduct){
            return res.status(401).json({
                success: false,
                message: "Product Not Found"
            })
        }
        res.status(201).json({
            success: true,
            data:deletedProduct,
            message: "Product Deleted Successfully"
            })
    } catch (error) {
        console.log(error);
        res.json({
            success:"false",
            message:"Error occured While deleting Product"
        })
    }
}

//edit a product

const editProduct = async (req,res) => {
    try {
        const {id} = req.params;
        const { image, title, description, category, brand, price, salePrice, totalStock  } = req.body;
        const findProduct = await Products.findById(id);
        if(!findProduct){
            return res.status(401).json({
                success: false,
                message: "Product Not Found"
            })
        }

        findProduct.title = title || findProduct.title;
        findProduct.description = description || findProduct.description;
        findProduct.category = category || findProduct.category;
        findProduct.brand = brand || findProduct.brand;
        findProduct.price = price || findProduct.price;
        findProduct.salePrice = salePrice || findProduct.salePrice;
        findProduct.totalStock = totalStock || findProduct.totalStock;
        findProduct.image = image || findProduct.image;
        await findProduct.save();
        res.json({
            success: true,
            message: "Product Updated Successfully"
            })
    } catch (error) {
        console.log(error);
        res.json({
            success:"false",
            message:"Error occured While editing a Product"
        })
    }
}

module.exports = { handleImageUpload,addProduct,fetchAllProduct,editProduct,deleteProduct };  // Exporting as an object  //exporting the function to be used in other files.