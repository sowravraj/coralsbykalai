import Commonform from '@/components/common/form'
import { registerformcontrols } from '@/config'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const initialState ={
  username : "",
  email : "",
  password : ""
}

const AuthRegister = () => {

  const [formData, setFormData] = useState(initialState)

  const onSubmit = ()=>{

  }
  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>Create New Account</h1>
        <p className='mt-2'>Already have an Account?
          <Link to="/auth/login" className='font-medium hover:underline text-primary ml-2'>Login</Link>
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