import { Button } from "../ui/button"
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet"
import UserCartItemsContent from "./cart-items-content"


const UserCartWrapper = ({cartItems}) => {

  const totalCartAmount = cartItems && cartItems.length > 0
  ? cartItems.reduce((sum, currentItem) => {
      return sum + ((currentItem?.salePrice > 0 ? currentItem?.salePrice : currentItem?.price) * currentItem?.quantity)
    }, 0)
  : 0

  return (
    <SheetContent className="bg-white sm:max-w-md">
           
                <SheetHeader>
                    <SheetTitle>
                        Your Cart
                    </SheetTitle>
                </SheetHeader>
                <div className="mt-8 space-y-6">
                  {
                    cartItems && cartItems.length>0 ? 
                    cartItems.map((items)=>
                    <UserCartItemsContent cartItems={items} />) 
                    :
                     <p className="text-gray-400 text-center">Your cart is empty</p>
                  }
                </div>
                <div className="mt-8 space-y-6">
                    <div className="flex justify-between">
                        <span  className="font-bold">Total</span>
                        <span  className="font-bold">₹{totalCartAmount}</span>
                    </div>
                </div>
                <Button className="mt-6 w-full transition duration-300 ease-in-out bg-black rounded text-white hover:text-white hover:bg-black border hover:border-slate-950">Checkout</Button>
    </SheetContent>
  )
}

export default UserCartWrapper