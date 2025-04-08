import ProductFilter from "@/components/shopping-view/filter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sortoptions } from "@/config";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/Product-slice";

import { ArrowUpDownIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShoppingProductTile from "../../components/shopping-view/Product-Tile";
import { useSearchParams } from "react-router-dom";
import ProductDetailsDialog from "../../components/shopping-view/product-details";
import { addToCart, fetchCartItems } from "@/store/shop/Cart-slice";
import { useToast } from "@/hooks/use-toast";

function createSearchParamsHelper(filterParams) {
  const queryParams = [];

  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");
      queryParams.push(`${paramValue}, ${encodeURIComponent(paramValue)}`);
      // queryParams.push(`${key}=${paramValue}`)
    }
  }

  console.log(queryParams, "queryParams");

  return queryParams.join("&");
}

const ShoppingListing = () => {
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDetailsDialog,setOpenDetailsDialog] = useState(false)
  const {toast} = useToast();

  const {user} = useSelector((state) => state.auth)


  const handleSort = (value) => {
    setSort(value);
  };

  const handleFilters = (getSectionId, getCurrentOption) => {
    let cpyFilters = { ...filters };
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);
    if (indexOfCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentSection =
        cpyFilters[getSectionId].indexOf(getCurrentOption);
      if (indexOfCurrentSection === -1)
        cpyFilters[getSectionId].push(getCurrentOption);
      else cpyFilters[getSectionId].splice(indexOfCurrentSection, 1);
    }

    // console.log(cpyFilters);
    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  };

  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  //fetch the list of Products
  useEffect(() => {
    if (filters !== null && sort !== null)
      dispatch(
        fetchAllFilteredProducts({ filterParams: filters, sortParams: sort })
      );
  }, [dispatch, filters, sort]);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters]);

  // console.log(productList,"Shop Product List");

  // console.log(filters,"filters");

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, []);

  // console.log(sort)
  console.log(searchParams);

  useEffect(() => {
    console.log("Updated ProductDetails:", productDetails);
  }, [productDetails]); // Runs when productDetails changes

  function handleGetProductDetails(getCurrentProductid) {
    console.log(getCurrentProductid);
    dispatch(fetchProductDetails(getCurrentProductid));
    console.log("ProductDetails", productDetails);
  }

  function handleAddToCart(getCurrentProductid) {
    // console.log("Adding to Cart:", {
    //     userId: user?.id,
    //     productId: getCurrentProductid,
    //     quantity: 1,
    // });

    dispatch(addToCart({ userId: user?.id, productId: getCurrentProductid, quantity: 1 }))
    .then((data) => {
        console.log("Cart API Response:", data);  // Debug API response
        if (data?.payload?.success) {
            dispatch(fetchCartItems(user?.id));
            toast({
              title: "Product Added to Cart",
              status: "success",
              duration: 1500,
              className: "bg-white text-black shadow-md border border-gray-200"
            })
        }
    })
    .catch(error => console.error("Cart API Error:", error.response?.data || error));

}


  useEffect(()=>{
    if(productDetails !== null){
      return  setOpenDetailsDialog(true)
    }
  },[productDetails])

    // console.log(cartItems, "cartItems");
    


  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
      <div className="mt-2">
        <ProductFilter filters={filters} handleFilters={handleFilters} />
      </div>

      <div className="bg-white w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex justify-between items-center gap-3">
          <h2 className="text-lg font-extrabold ">All Products</h2>
          <div className="flex items-center gap-6">
            <span className="text-muted-foreground">
              {productList?.length} Products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDownIcon />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px] bg-white">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortoptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Fetching the products from the API */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4">
          {productList.map((productItem) => (
            <ShoppingProductTile
            key={productItem._id}
              handleGetProductDetails={handleGetProductDetails}
              product={productItem}
              handleAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
      <ProductDetailsDialog open={openDetailsDialog} setOpen={setOpenDetailsDialog} productDetails={productDetails}  />
    </div>
  );
};

export default ShoppingListing;
