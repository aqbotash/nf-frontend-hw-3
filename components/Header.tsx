import React from 'react'
import ThemeSwitch from './ThemeSwitch'

const Header = () => {
  return (
    <div className="flex justify-between px-40 py-6 font-semibold dark:text-white">
        medium alike
        <ThemeSwitch />
    </div>
  )
}

export default Header