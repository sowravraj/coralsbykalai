import { House, LogOut, LogOutIcon, Menu, ShoppingCart, UserCog } from 'lucide-react'
import React, { } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { shoppingViewHeaderMenuItems } from '@/config'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { logoutUser } from '@/store/auth-slice'


 const MenuItems =()=>{
  return <nav className='flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row'>
    {
      shoppingViewHeaderMenuItems.map(MenuItems=> <Link className='text-sm font-medium' key={MenuItems.id} to={MenuItems.path}>{MenuItems.label}</Link>)
    }
  </nav>
}

const HeaderRightContent =()=>{
  const {user} = useSelector(state=>state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function handleLogout(){
    dispatch(logoutUser())
  }

  return<div className='flex lg:items-center lg:flex-row flex-col gap-4'>
    <Button >
    <ShoppingCart size={46} strokeWidth={3}  />
    <span className='sr-only'>User Cart</span>
    </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black">
            <AvatarFallback className="bg-black text-white font-extrabold">
            {user?.userName.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className='w-56 bg-white mt-2'>
          <DropdownMenuLabel className=""> Logged in as {user?.userName} </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={()=>navigate("/shop/account")}>
          <UserCog size={36} strokeWidth={2.25} />
          Account
          </DropdownMenuItem>
          <DropdownMenuSeparator  className="bg-black opacity-5 cursor-not-allowed" />
          <DropdownMenuItem onClick={handleLogout}>   
            <LogOutIcon />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
  </div>
}

const ShoppingHeader = () => {
  const {isAuthenticated,} = useSelector(state=>state.auth)
  // console.log("user info",user);
  
  return (
    <header className='sticky top-0 z-40 w-full border-b bg-background'>
      <div className='flex h-16 items-center justify-between px-4 md:px-6'>
        <Link to="/shop/home" className='flex items-center gap-2'>
          <House className='h-6 w-6'/>
          <span className='font-bold'>CoralsByKalai</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outlined" size="icon" className='lg:hidden'>
            <Menu className='h-6 w-6'/>
            <span className='sr-only'>Toggle header Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="max-w-xs w-full bg-white"> 
             <MenuItems /> 
          </SheetContent>
        </Sheet>
        <div className='hidden lg:block gap-4'> <MenuItems /> </div>
        
     
          <div className='flex items-center gap-2 hidden lg:block'>
            <HeaderRightContent />
          </div> 
   
        
      </div>
    </header>
  )
}

export default ShoppingHeader