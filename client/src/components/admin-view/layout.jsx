import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from './sidebar'
import Adminheader from './header'

const AdminLayout = () => {
  return (
    <div className='flex min-h-full w-full'>
        {/* admin sidebar*/}
        <AdminSidebar/>
        <div className='flex flex-1 flex-col'>
            {/* admin header*/}
            <Adminheader/>
            <main className='flex flex-1 bg-muted/40 p-4 md:p-6'>
                <Outlet/>
            </main>
        </div>
    </div>
  )
}

export default AdminLayout