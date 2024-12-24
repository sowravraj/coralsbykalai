import ProductImageUpload from "@/components/admin-view/imgae-upload";
import Commonform from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { addProductFormElements } from "@/config";
import { addNewProduct, deleteProduct, editProduct, fetchAllProducts } from "@/store/admin/Product-slice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminProductTile from "@/components/admin-view/Product-Tile";


const initialFormData = {
  image: null,
  title: "",
  description: "",
  price: "",
  salePrice: "",
  category: "",
  totalStock: "",
};

const AdminProducts = () => {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageURL, setUploadedImageURL] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const { ProductList } = useSelector((state) => state.adminProducts); // Ensure this matches your store setup

  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    currentEditedId !== null ?
    dispatch(editProduct({
      id: currentEditedId,
      formData
    })).then((data)=>{
      console.log(data,"edited product")
      if (data?.payload?.success) {
        dispatch(fetchAllProducts()).then((response) => {
          console.log(response, "Fetch Products Response");
        });

        setOpenCreateProductsDialog(false);
        setCurrentEditedId(null)
        setFormData(initialFormData);
        toast({
          title: "Product Edited successfully",
          style: {
            backgroundColor: "white",
            color: "black", // Ensure the text color is visible
            border: "1px solid #e2e8f0", // Optional: Add a subtle border
          },
        });
      }
    }
  ):
    dispatch(
      addNewProduct({
        ...formData,
        image: uploadedImageURL,
      })
    ).then((data) => {
      console.log(data);

      if (data?.payload?.success) {
        dispatch(fetchAllProducts()).then((response) => {
          console.log(response, "Fetch Products Response");
        });

        setOpenCreateProductsDialog(false);
        setImageFile(null);
        setFormData(initialFormData);
        toast({
          title: "Product add successfully",
          style: {
            backgroundColor: "white",
            color: "black", // Ensure the text color is visible
            border: "1px solid #e2e8f0", // Optional: Add a subtle border
          },
        });
      }
    });
  }
  function handleDelete(getCurrentProductId) {
    console.log("Product ID passed to handleDelete:", getCurrentProductId);

    dispatch(deleteProduct(getCurrentProductId)).then(data=>
    {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts())
    }
  }
)

   
}







function isFormValid() {
  return Object.entries(formData) // Get key-value pairs from formData
    .every(([key, value]) => {
      // Special case for "image"
      if (key === "image") {
        return uploadedImageURL && uploadedImageURL.trim() !== "";
      }
      // For other fields
      return value !== null && value !== ""; // Allow numeric values like 0
    });
}

  


  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  // console.log(ProductList, "ProductList");

  useEffect(() => {
    console.log("FormData Updated: ", formData);
  }, [formData]);
  

  return (
    <div className="bg-white">
      <div className="mb-5 flex justify-end w-full">
        <Button
          onClick={() => {
            setOpenCreateProductsDialog(true);
          }}
          className="bg-black text-white hover:bg-white hover:text-black border border-black rounded"
        >
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {ProductList && ProductList.length > 0 ? (
          ProductList.map((productItem) => (
            <AdminProductTile
            // key={productItem?._id} // Always add a unique key
              product={productItem}
              setCurrentEditedId={setCurrentEditedId}
              setOpenCreateProductsDialog={setOpenCreateProductsDialog}
              setFormData={setFormData}
              handleDelete={() => handleDelete(productItem?._id)} // Safely access _id
            />
          ))
        ) : (
          <p className="text-center">No products available</p>
        )}
      </div>

      <div>
        <Sheet
          open={openCreateProductsDialog}
          onOpenChange={() => {
            setOpenCreateProductsDialog(false);
            setCurrentEditedId(null)
            setFormData(initialFormData)
          }}
        >
          <SheetContent side="right" className="overflow-auto bg-white">
            <SheetHeader>
              <SheetTitle>
                {
                 currentEditedId !== null ? "Edit Product" : "Add New Product"
                }
               </SheetTitle>
            </SheetHeader>
            <div className="py-6 bg-white">
            <ProductImageUpload
              imageFile={imageFile}
              setImageFile={setImageFile}
              uploadedImageURL={uploadedImageURL}
              setUploadedImageURL={setUploadedImageURL}
              imageLoadingState={imageLoadingState}
              setImageLoadingState={setImageLoadingState}
              isEditMode={currentEditedId !== null} // Determine if it's edit mode
            />
            <Commonform
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null  ? "Update Product" : "Add Product"} // Button text based on mode
              onSubmit={onSubmit}
              formControls={addProductFormElements}
              isBtnDisabled={!isFormValid()} // Pass the button disabled state

            />

            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default AdminProducts;
