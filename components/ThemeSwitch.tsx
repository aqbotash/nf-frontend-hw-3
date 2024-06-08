'use client'
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { BiSun } from 'react-icons/bi';
import { BiMoon } from 'react-icons/bi';

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const isActive = theme === "light";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div 
      className="relative w-14 h-8 md:w-16 md:h-10 rounded-full p-1 bg-gray-800 dark:bg-white cursor-pointer bg-[#ccc] transition-colors duration-500"
      onClick={toggleTheme}
    >
      {isMounted && (
        <button
          className={`flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-full transform ${
            isActive ? 'translate-x-0' : 'translate-x-6 md:translate-x-8'
          } transition-transform duration-500 ease-in-out`}
        >
          {isActive ? (
            <BiSun size={16} className="text-white text-lg md:text-xl" />
          ) : (
            <BiMoon size={16} className="text-black dark:text-white text-lg md:text-xl" />
          )}
        </button>
      )}
    </div>
  );
};

export default ThemeSwitch;
