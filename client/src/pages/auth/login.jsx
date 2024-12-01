import Commonform from '@/components/common/form'
import { loginformcontrols } from '@/config'
import { useToast } from '@/hooks/use-toast'
import { loginUser } from '@/store/auth-slice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const initialState ={
  email : "",
  password : ""
}

const AuthLogin = () => {

  
  const [formData, setFormData] = useState(initialState)

  const dispatch = useDispatch()
  const {toast} = useToast()
  const navigate = useNavigate()

  const onSubmit = (event)=>{
      event.preventDefault()

      dispatch(loginUser(formData)).then((data)=>{
        if (data?.payload?.success) {
          toast({
            title: "Login Success",
            description: "Welcome back!",
          });
          // navigate("/shop/home");
        } else {
          toast({
            title: "Login Failed",
            description: "Invalid credentials or account not found",
            variant: "destructive", 
          });
        }
          })

  }

  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
    <div className='text-center'>
      <h1 className='text-3xl font-bold tracking-tight text-foreground'>Synchronize with Your Universe</h1>
      <p className='mt-2'>New Here?
        <Link to="/auth/register" className='font-medium hover:underline text-primary ml-2'>Create Your Space</Link>
      </p>
    </div>
    <Commonform
    formControls={loginformcontrols}
    buttonText = {"Login"}
    formData={formData}
    setFormData={setFormData}
    onSubmit={onSubmit}
    />
  </div>
  )
}

export default AuthLogin