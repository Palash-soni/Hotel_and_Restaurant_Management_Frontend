import React from 'react'
import TopBar from './components/receptionist/TopBar'
import { Outlet } from 'react-router-dom'

const ReceptionistLayout = () => {
  return (
    <div>
      <TopBar />
      <Outlet />
    </div>
  )
}

export default ReceptionistLayout
