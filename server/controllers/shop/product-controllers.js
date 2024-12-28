
const Products =  require ("../../models/Products")

const getFilteredProducts = async (req,res) => {
    try {
        
        const products = await Products.find({})
        res.status(200).json({
            success:true,
            data:products
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success : false,
            message: "Error fetching products"
        })
    }
}


module.exports = {getFilteredProducts}