import React from 'react'
import AdminSidebar from '../../components/AdminCommonLayout/AdminSidebar'

function CommonAdminLayout({children}) {
  return (
    <>
        <AdminSidebar children={children} />
    </>
  )
}

export default CommonAdminLayout