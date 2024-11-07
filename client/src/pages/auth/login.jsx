import Commonform from '@/components/common/form'
import { loginformcontrols } from '@/config'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const initialState ={
  email : "",
  password : ""
}

const AuthLogin = () => {


  const [formData, setFormData] = useState(initialState)

  const onSubmit = ()=>{

  }

  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
    <div className='text-center'>
      <h1 className='text-3xl font-bold tracking-tight text-foreground'>Synchronize with Your Universe</h1>
      <p className='mt-2'>Don't have an Account?
        <Link to="/auth/register" className='font-medium hover:underline text-primary ml-2'>Register</Link>
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