import ProductImageUpload from '@/components/admin-view/imgae-upload'
import Commonform from '@/components/common/form'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { useToast } from '@/hooks/use-toast'
import { addProductFormElements } from '@/config'
import { addNewProduct, fetchAllProducts } from '@/store/admin/Product-slice'
import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AdminProductTile from '@/components/admin-view/Product-Tile'

const initialFormData = {
  image: null,
  title:"",
  description:"",
  price:"",
  salePrice:"",
  category:"",
  totalStock:"",

}


const AdminProducts = () => {
  const[openCreateProductsDialog,setOpenCreateProductsDialog] = useState(false)
  const [formData,setFormData]= useState(initialFormData)
  const[imageFile,setImageFile]=useState(null)
  const[uploadedImageURL,setUploadedImageURL]=useState("")
  const[imageLoadingState, setImageLoadingState]=useState(false)
  const { ProductList } = useSelector((state) => state.adminProducts); // Ensure this matches your store setup

  const dispatch = useDispatch()
  const { toast } = useToast();


  function onSubmit(event){

    event.preventDefault()
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
        });
      }
    });
  }

  useEffect(()=>{
    dispatch(fetchAllProducts())
},[dispatch])


  console.log(ProductList,"ProductList");

  return (
    <div className='bg-white'>
      <div className='mb-5 flex justify-end w-full'>
        <Button onClick={()=>{setOpenCreateProductsDialog(true)}} className="bg-black text-white hover:bg-white hover:text-black border border-black rounded">Add New Product</Button>
      </div>
      <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
        {ProductList && ProductList.length > 0
          ? ProductList.map((productItem) => (
              <AdminProductTile product={productItem} />
            ))
          : <p className="text-center">No products available</p>}
      </div>

      <div>
      <Sheet open={openCreateProductsDialog} onOpenChange={()=>{setOpenCreateProductsDialog(false)}}>
        <SheetContent side="right" className="overflow-auto bg-white">
          <SheetHeader>
            <SheetTitle>
            Add New Product
            </SheetTitle>
          </SheetHeader>
          <div className='py-6 bg-white'>
            <ProductImageUpload imageFile={imageFile} setImageFile={setImageFile} uploadedImageURL={uploadedImageURL} setUploadedImageURL={setUploadedImageURL} imageLoadingState={imageLoadingState} setImageLoadingState={setImageLoadingState} />
            <Commonform formData={formData} setFormData={setFormData}
              buttonText="Add"
              onSubmit={onSubmit}
              formControls={addProductFormElements}
            />
          </div>
        </SheetContent>
      </Sheet>
      </div>
      </div>
  )
}

export default AdminProducts