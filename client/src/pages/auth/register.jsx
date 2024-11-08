import Commonform from '@/components/common/form'
import { registerformcontrols } from '@/config'
import { registerUser } from '@/store/auth-slice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast'  // Correct import of useToast hook

const initialState ={
  username : "",
  email : "",
  password : ""
}

const AuthRegister = () => {

  const [formData, setFormData] = useState(initialState)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { toast } = useToast()  // Correct usage inside the component

  const onSubmit = (event)=>{
      event.preventDefault()
      dispatch(registerUser(formData)).then((data)=>{
        console.log(data);
        if (data?.payload?.success) {
          toast({
            title: "Hello, Explorer!",
            description: "Your registration is complete. Begin your journey today.",
          })
          navigate("/auth/login");
        } else {
          toast({
            title: data?.payload?.message,
            description: "Pick a different one",
            variant: "destructive", 
          })
        }       
       }
      )
  }

  console.log(formData)
  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>Create New Account</h1>
        <p className='mt-2'>Already a Member? 
          <Link to="/auth/login" className='font-medium hover:underline text-primary ml-2'>Step Back In</Link>
        </p>
      </div>
      <Commonform
      formControls={registerformcontrols}
      buttonText = {"Sign Up"}
      formData={formData}
      setFormData={setFormData}
      onSubmit={onSubmit}
      />
    </div>
  )
}

export default AuthRegister