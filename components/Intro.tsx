import { useAuth } from '@/context/AuthContext'
import React from 'react'

const Intro = () => {
  const {username} = useAuth()
  return (
    <div className="flex px-40 py-16 font-kanit text-custom-48 font-medium leading-custom-120 text-left dark:text-white ">
      Hello, {username}</div>
  )
}

export default Intro