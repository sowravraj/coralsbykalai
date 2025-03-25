import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { StarIcon } from "lucide-react";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw] bg-white rounded-lg">
        <div className="relative overflow-hidden rounded-lg">
            <img
                src={productDetails?.image}
                alt={productDetails?.title}
                className="aspect-square w-full object-cover"
                width={600}
                height={600}
            /> 
        </div>
        <div className="flex flex-col justify-center gap-6">
            <div>
                <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
                <p className="text-muted-foreground mt-2">{productDetails?.description}</p>
            </div>
            <div className="flex items-center gap-3">
                <p className={`font-bold text-primary ${productDetails?.salePrice>0 ? "line-through text-1xl bg-opacity-85" : "text-2xl"}`}>₹{productDetails?.price}</p>
                {
                  productDetails?.salePrice > 0 && (<p className={`text-2xl font-bold text-muted-foreground`}>₹{productDetails?.salePrice}</p>)
                }

            </div>
            <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
                      <StarIcon  className="w-5 h-5 fill-primary"/>
                      <StarIcon  className="w-5 h-5 fill-primary"/>
                      <StarIcon  className="w-5 h-5 fill-primary"/>
                      <StarIcon  className="w-5 h-5 fill-primary"/>
                      <StarIcon  className="w-5 h-5 fill-primary"/>
                    </div>
                    <span className="text-muted-foreground">(4.5)</span>
            </div>
            <div className="mt-4 mb-5">
              <Button className="w-full bg-black text-white rounded hover:bg-white hover:text-black hover:border">Add to Cart</Button>
              
            </div>
            <Separator className="w-full border-t border-gray-200"/>
            <div className="max-h-[300px] overflow-auto">
              <h2 className="text-xl font-bold mb-4">Reviews</h2>
              <div className="grid gap-6">
                <div className="flex gap-4">
                  <Avatar className="w-10 h-10 border">
                    <AvatarFallback>
                      SM
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <div className="flex items-center  gap-2">
                      <h3 className="font-bold">Sowrav Raj Sree Avanthiga</h3>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <StarIcon  className="w-5 h-5 fill-primary"/>
                      <StarIcon  className="w-5 h-5 fill-primary"/>
                      <StarIcon  className="w-5 h-5 fill-primary"/>
                      <StarIcon  className="w-5 h-5 fill-primary"/>
                      <StarIcon  className="w-5 h-5 fill-primary"/>
                    </div>
                    <p className="text-muted">
                      This is a great product. I am very happy with the purchase.
                    </p>
                  </div>

                </div>



                {/* <div className="flex gap-4">
                  <Avatar className="w-10 h-10 border">
                    <AvatarFallback>
                      SM
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <div className="flex items-center  gap-2">
                      <h3 className="font-bold">Sowrav Raj Sree Avanthiga</h3>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <StarIcon  className="w-5 h-5 fill-primary"/>
                      <StarIcon  className="w-5 h-5 fill-primary"/>
                      <StarIcon  className="w-5 h-5 fill-primary"/>
                      <StarIcon  className="w-5 h-5 fill-primary"/>
                      <StarIcon  className="w-5 h-5 fill-primary"/>
                    </div>
                    <p className="text-muted">
                      This is a great product. I am very happy with the purchase.
                    </p>
                  </div>

                </div>                <div className="flex gap-4">
                  <Avatar className="w-10 h-10 border">
                    <AvatarFallback>
                      SM
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <div className="flex items-center  gap-2">
                      <h3 className="font-bold">Sowrav Raj Sree Avanthiga</h3>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <StarIcon  className="w-5 h-5 fill-primary"/>
                      <StarIcon  className="w-5 h-5 fill-primary"/>
                      <StarIcon  className="w-5 h-5 fill-primary"/>
                      <StarIcon  className="w-5 h-5 fill-primary"/>
                      <StarIcon  className="w-5 h-5 fill-primary"/>
                    </div>
                    <p className="text-muted">
                      This is a great product. I am very happy with the purchase.
                    </p>
                  </div>

                </div>                <div className="flex gap-4">
                  <Avatar className="w-10 h-10 border">
                    <AvatarFallback>
                      SM
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <div className="flex items-center  gap-2">
                      <h3 className="font-bold">Sowrav Raj Sree Avanthiga</h3>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <StarIcon  className="w-5 h-5 fill-primary"/>
                      <StarIcon  className="w-5 h-5 fill-primary"/>
                      <StarIcon  className="w-5 h-5 fill-primary"/>
                      <StarIcon  className="w-5 h-5 fill-primary"/>
                      <StarIcon  className="w-5 h-5 fill-primary"/>
                    </div>
                    <p className="text-muted">
                      This is a great product. I am very happy with the purchase.
                    </p>
                  </div>

                </div>                <div className="flex gap-4">
                  <Avatar className="w-10 h-10 border">
                    <AvatarFallback>
                      SM
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <div className="flex items-center  gap-2">
                      <h3 className="font-bold">Sowrav Raj Sree Avanthiga</h3>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <StarIcon  className="w-5 h-5 fill-primary"/>
                      <StarIcon  className="w-5 h-5 fill-primary"/>
                      <StarIcon  className="w-5 h-5 fill-primary"/>
                      <StarIcon  className="w-5 h-5 fill-primary"/>
                      <StarIcon  className="w-5 h-5 fill-primary"/>
                    </div>
                    <p className="text-muted">
                      This is a great product. I am very happy with the purchase.
                    </p>
                  </div>

                </div>                <div className="flex gap-4">
                  <Avatar className="w-10 h-10 border">
                    <AvatarFallback>
                      SM
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <div className="flex items-center  gap-2">
                      <h3 className="font-bold">Sowrav Raj Sree Avanthiga</h3>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <StarIcon  className="w-5 h-5 fill-primary"/>
                      <StarIcon  className="w-5 h-5 fill-primary"/>
                      <StarIcon  className="w-5 h-5 fill-primary"/>
                      <StarIcon  className="w-5 h-5 fill-primary"/>
                      <StarIcon  className="w-5 h-5 fill-primary"/>
                    </div>
                    <p className="text-muted">
                      This is a great product. I am very happy with the purchase.
                    </p>
                  </div>

                </div> */}



              </div>
              <div className="mt-6 flex gap-2">
                <Input placeHolder="write a review.." className="rounded" />
                <Button className=" bg-black text-white rounded hover:bg-white hover:text-black hover:border">Submit</Button>
              </div>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
