import React from 'react'
import TopBar from './components/waiter/Topbar'
import { Outlet } from 'react-router-dom'

const WaiterLayout = () => {
  return (
    <div>
      <TopBar />
      <Outlet />
    </div>
  )
}

export default WaiterLayout
