import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItems, fetchCartItems, UpdateCartQuantity,  } from "@/store/shop/Cart-slice";
import { useToast } from "@/hooks/use-toast";

const UserCartItemsContent = ({ cartItems }) => {
  const {user} = useSelector(state=>state.auth)
  const dispatch = useDispatch();
  const {toast} = useToast()

  function handleUpdateQuantity (getCartItem,typeOfAction){
    dispatch(UpdateCartQuantity({
      userId: user?.id, productId : getCartItem?.productId ,
      quantity : typeOfAction === "plus" ? getCartItem?.quantity + 1 : getCartItem?.quantity - 1
    })).then(data=>{
      if(data?.payload?.success){
        toast({
          title: "Quantity updated successfully",
          className: "bg-white text-black shadow-md border border-gray-200",
          duration: 1000,
        })
      }
  })
  }

  function handleCartItemDelete (getCartItem){
    dispatch(deleteCartItems({userId : user?.id,productId : getCartItem?.productId}))
    .then(() => {
      dispatch(fetchCartItems(user?.id));
      toast({ title: "Item removed from cart",
        className: "bg-white text-black shadow-md border border-gray-200",
        duration: 1500,
       });
    });
  }
  return (
    <div className="flex items-center space-x-4">
      <img src={cartItems?.image} alt={cartItems?.title} className="w-20 h-20 rounded object-cover"></img>
      <div className="flex-1">
        <h3 className="font-extrabold">{cartItems?.title}</h3>
        <div className="flex items-center mt-1 gap-3">
          <Button variant="outline" className="w-5 h-5 rounded-full" size="icon" strokeWidth={1.3}
          disabled ={cartItems?.quantity === 1}
          onClick={() => handleUpdateQuantity(cartItems,"minus")}>
            <Minus className="w-1 h-1"/>
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="text-base font-semibold">{cartItems?.quantity}</span>
          <Button variant="outline" className="w-5 h-5 rounded-full" size="icon" strokeWidth={1.3}
          onClick={() => handleUpdateQuantity(cartItems,"plus")}>
            <Plus className="w-1 h-1"/>
            <span className="sr-only">Decrease</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold ">
        ₹{((cartItems?.salePrice>0 ? cartItems?.salePrice : cartItems?.price) * cartItems?.quantity).toFixed(2)}
        </p>
        <Trash onClick={()=>handleCartItemDelete(cartItems)} className="cursor-pointer mt-1 font-extralight" size="20" strokeWidth={1.3}></Trash>
      </div>
    </div>
    // <div className="border p-4 rounded-md flex justify-between">
    //   <div>
    //     <p className="font-bold">{cartItems.name}</p>
    //     <p className="text-sm text-gray-600">Qty: {cartItems.quantity}</p>
    //   </div>
    //   <div className="text-right">
    //     <p className="font-semibold">₹ {cartItems.price}</p>
    //   </div>
    // </div>
  );
};

export default UserCartItemsContent;
