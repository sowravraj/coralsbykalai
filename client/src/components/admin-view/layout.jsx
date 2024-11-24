import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from './sidebar'
import Adminheader from './header'

const AdminLayout = () => {
  const [openSidebar,setOpenSidebar] = useState(false)
  return (
    <div className='flex min-h-full w-full'>
        {/* admin sidebar*/}
        <AdminSidebar open={openSidebar} setOpen={setOpenSidebar} />
        <div className='flex flex-1 flex-col'>
            {/* admin header*/}
            <Adminheader setOpen={setOpenSidebar}/>
            <main className='flex flex-1 bg-muted/40 p-4 md:p-6'>
                <Outlet/>
            </main>
        </div>
    </div>
  )
}

export default AdminLayout