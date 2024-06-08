import React from 'react'
import dynamic from 'next/dynamic'

const ThemeSwitch = dynamic(() => import('./ThemeSwitch'), { ssr: false })

const Header = () => {
  
  return (
    <div className="flex justify-between px-20 md:px-40 py-6 font-semibold dark:text-white items-center">
        medium alike
        <ThemeSwitch />
    </div>
  )
}

export default Header