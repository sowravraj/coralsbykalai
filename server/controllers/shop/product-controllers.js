const Products = require("../../models/Products");

const getFilteredProducts = async (req, res) => {
  try {
    const { category = [], brand = [], sortby = "price-lowtohigh" } = req.query;

    let filters = {};

    if (category.length) {
      filters.category = { $in: category.split(",") };
    }

    if (brand.length) {
      filters.brand = { $in: brand.split(",") };
    }

    let sort = {};

    switch (sortby) {
      case "price-lowtohigh":
        sort.price = 1;
        break;
      case "price-hightolow":
        sort.price = -1;
        break;
      case "title-atoz":
        sort.title = 1;
        break;
      case "title-ztoa":
        sort.title = -1;
        break;

      default:
        sort.price = 1;
        break;
    }

    const products = await Products.find(filters).sort(sort);
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error fetching products",
    });
  }
};

const getProductDetails = async (req, res) => {

  try {

    const {} = req.params;
    const product = await Products.findById(req.params.id);

    if(!product) return res.status(404).json({
      success: false,
      message: "Product not found"
    })

    res.status(200).json({
      success: true,
      data: product
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error fetching products",
    });
  }
}

module.exports = { getFilteredProducts , getProductDetails };
