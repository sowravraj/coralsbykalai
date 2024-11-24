import ProductImageUpload from '@/components/admin-view/imgae-upload'
import Commonform from '@/components/common/form'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { addProductFormElements } from '@/config'
import React, { Fragment, useState } from 'react'

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


  function onSubmit(){
      
      
  }

  console.log(formData);

  return (
    <div className='bg-white'>
      <div className='mb-5 flex justify-end w-full'>
        <Button onClick={()=>{setOpenCreateProductsDialog(true)}} className="bg-black text-white hover:bg-white hover:text-black border border-black rounded">Add New Product</Button>
      </div>
      <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>

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