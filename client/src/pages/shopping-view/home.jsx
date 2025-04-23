import { Button } from "@/components/ui/button";
import Banner1 from "../../assets/Banner1.jpg";
import Banner2 from "../../assets/Banner2.webp";
import Banner3 from "../../assets/Banner3.webp";
import Banner4 from "../../assets/Banner4.webp";
import { BabyIcon, ChevronLeftIcon, ChevronRightIcon, ShirtIcon, WatchIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

import { Dress, SneakerMove } from "@phosphor-icons/react";


const ShoppingHome = () => {
  const Slides = [Banner1, Banner2, Banner3, Banner4];

  const categoriesWithIcon =  [
    { id: "men", label: "Men", icon: ShirtIcon },
    { id: "women", label: "Women" ,icon : Dress },
    { id: "kids", label: "Kids" , icon : BabyIcon },
    { id: "accessories", label: "Accessories" , icon: WatchIcon },
    { id: "footwear", label: "Footwear" , icon : SneakerMove },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Banner Slider */}
 
      <div className="relative w-full max-h-[700px] overflow-hidden flex my-auto mx-auto">
        {Slides.map((slide, index) => (
          <img
            src={slide}
            key={index}
            className="  top-0 left-0 w-full h-full object-cover transition-opacity duration-1000"
          />
        ))}
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-4 transform -translate-y-1/2"
        >
          <ChevronLeftIcon className="w-6 h-6 text-black" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-4 transform -translate-y-1/2"
        >
          <ChevronRightIcon className="w-6 h-6 text-black" />
        </Button>
      </div>

      {/* Section: Shop by Category */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto p-4 md:p-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by Category
          </h2>
          <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-28">
         
            {
              categoriesWithIcon.map((categoryItem)=><Card className="cursor-pointer hover:shadow-lg transition-shadow bg-white">
                <CardContent className="flex flex-col items-center justify-center p-6">
                    <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                    <span>{categoryItem.label}</span>
       
                </CardContent>
              </Card>)
            }
          </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShoppingHome;
