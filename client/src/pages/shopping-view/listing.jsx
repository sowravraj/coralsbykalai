import ProductFilter from '@/components/shopping-view/filter'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { sortoptions } from '@/config'
import { fetchAllFilteredProducts } from '@/store/shop/Product-slice'

import { ArrowUpDownIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ShoppingProductTile from './Product-Tile'

const ShoppingListing = () => {

  const [filters, setFilters] = useState(null)
  const [sort, setSort] = useState(null)


  const dispatch = useDispatch()
  const {productList} = useSelector((state) => state.shopProducts)
  //fetch the list of Products
  useEffect(()=>{
    dispatch(fetchAllFilteredProducts())
  },[dispatch])

  console.log(productList,"Shop Product List");
  


  return (
    <div className='grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6'>
        <ProductFilter />
        <div className='bg-white w-full rounded-lg shadow-sm'>
          <div className='p-4 border-b flex justify-between items-center gap-3'>
            <h2 className='text-lg font-extrabold '>All Products</h2>
            <div className='flex items-center gap-6'>
              <span className='text-muted-foreground'>{productList?.length} Products</span>
              <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' size='sm' className="flex items-center gap-1">
                  <ArrowUpDownIcon/>
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px] bg-white">
                <DropdownMenuRadioGroup>
                  {
                    sortoptions.map(sortItem=><DropdownMenuRadioItem key={sortItem.id}>
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                      )
                  }
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            </div>
          
          </div>

          {/* Fetching the products from the API */}
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4'> 
                  {
                   
                    (productList.map((productItem)=> <ShoppingProductTile product={productItem}/>)) 
                  }
          </div>
        </div>
    </div>
  )
}

export default ShoppingListing