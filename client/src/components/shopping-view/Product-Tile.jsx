import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
// import { Card } from "../ui/card";
import { Card,CardContent, CardFooter } from "@/components/ui/card";
// import { Card, CardFooter } from "../ui/card";


const ShoppingProductTile = ({ product,handleGetProductDetails ,handleAddToCart }) => {
  return (
    <Card className="w-full max-w-sm mx-auto flex flex-col h-full">
      <div className="relative" onClick={()=>handleGetProductDetails(product?._id)}>
        <img
          src={product?.image}
          alt={product?.title}
          className="w-full h-[300px] object-cover rounded-t-lg"
        />
        {product?.salePrice > 0 && (
          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-700 text-white">Sale</Badge>
        )}
      </div>
      <CardContent className="p-4">
        <h2 className="text font-bold mb-2">{product?.title}</h2>
        <div className="flex justify-between items-center mb2">
            <span className="text-sm text-muted-foreground capitalize">{product?.category}</span>
            <span className="text-sm text-muted-foreground capitalize">{product?.brand}</span>
        </div>
        <div className="flex justify-between items-center mb2">
            <span className={`${product?.salePrice>0 ? "line-through":" "} text-md text-primary font-semibold`}>₹{product?.price}</span>
            {
               product?.salePrice>0 ? 
               <span className="text-md text-primary font-semibold">₹{product?.salePrice}</span>
               : null 
            }

            
        </div>
      </CardContent>
      <CardFooter className="left-0">
            <Button onClick={()=>handleAddToCart(product?._id)}
            className="w-full  bg-black text-gray-50 rounded hover:bg-white hover:text-black hover:border">
                Add to Cart
            </Button>
      </CardFooter>
    </Card>
  );
};

export default ShoppingProductTile;
