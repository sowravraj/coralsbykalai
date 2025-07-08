import { Button } from "@/components/ui/button";
import Banner1 from "../../assets/banner-1.webp";
import Banner2 from "../../assets/banner-2.webp";
import Banner3 from "../../assets/banner-3.webp";
import Banner4 from "../../assets/Banner1.jpg";


import { BabyIcon, ChevronLeftIcon, ChevronRightIcon, ShirtIcon, WatchIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Dress, SneakerMove, Boot, BaseballCap, Backpack, Pants, PersonSimpleSwim ,Hoodie} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilteredProducts } from "@/store/shop/Product-slice";
import ShoppingProductTile from "@/components/shopping-view/Product-Tile";

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: Dress },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: SneakerMove },
];


const brand = [
  {id:"nike",label:"Nike", icon: Boot },
  {id:"adidas",label:"Adidas", icon: BaseballCap },
  {id:"puma",label:"Puma", icon:Backpack},
  {id:"levi",label:"Levi", icon:Pants},
  {id:"zara",label:"Zara", icon:PersonSimpleSwim},
  {id:"h&m",label:"H&M", icon:Hoodie},
]



const ShoppingHome = () => {
  const Slides = [Banner1, Banner2, Banner3, Banner4];
  const [currentSlide, setCurrentSlide] = useState(0);
  // const productList = useSelector(state => state.shopProducts.productList);
  // const productDetails = useSelector(state => state.shopProducts.productDetails);
  const { productList, productDetails } = useSelector((state) => state.shopProducts);


  const dispatch = useDispatch()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % Slides.length);
    }, 5400);
    return () => clearInterval(timer); // Always clear interval on unmount
  }, [])



  useEffect(()=>{
    dispatch(fetchAllFilteredProducts({filterParams : {} , sortParams : "Price-lowtohigh"}))
  },[dispatch])

  console.log("product details", productDetails,productList);
  

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Banner Slider */}
      <div className="relative w-full h-[700px] overflow-hidden"> {/* Set a fixed height */}
        {Slides.map((slide, index) => (
          <img
            src={slide}
            key={index}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide - 1 + Slides.length) % Slides.length)
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2"
        >
          <ChevronLeftIcon className="w-6 h-6 text-black" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide + 1) % Slides.length)
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2"
        >
          <ChevronRightIcon className="w-6 h-6 text-black" />
        </Button>
      </div>

      {/* Section: Shop by Category */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto p-4 md:p-12">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
              {categoriesWithIcon.map((categoryItem) => (
                <Card key={categoryItem.id} className="cursor-pointer hover:shadow-lg transition-shadow bg-white">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                    <span>{categoryItem.label}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section>
      <div className="container mx-auto p-4 md:p-12">
          <h2 className="text-3xl font-bold text-center mb-8"> Feature Product</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {
                  productList && productList.length>0 ? 
                  productList.map((ProductItem)=><ShoppingProductTile
                  product={ProductItem}

                  />)
                   : null
              }
          </div>
          </div>
      </section>
    </div>
  );
};

export default ShoppingHome;
