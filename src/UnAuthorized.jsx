import React from 'react'
import { Link } from 'react-router-dom'

const UnAuthorized = () => {
  return (
    <div className='bg-black text-center h-screen w-screen flex flex-col gap-5 justify-center items-center text-white text-5xl font-bold'>
      You are not allowed to enter this route<br />
      (Apne Kam Se Kam Rakh)
      <Link to="/"><button className='border-1 border-white py-2 px-5 rounded-full text-3xl cursor-pointer hover:bg-white hover:text-black'>Go Back</button></Link>
    </div>
  )
}

export default UnAuthorized
