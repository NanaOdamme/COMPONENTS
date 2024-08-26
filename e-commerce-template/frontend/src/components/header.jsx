import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../Context/ThemeContext.jsx';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRefs = useRef({});

  const toggleDropdown = (key) => {
    setActiveDropdown(activeDropdown === key ? null : key);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !Object.values(dropdownRefs.current).some(ref => ref.contains(event.target))
      ) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRefs]);

  return (
    <header className="header bg-gray-200 dark:bg-black w-full">
      <div className='mx-auto flex flex-col'>
        <div className="px-4 py-2 m-5 flex justify-between items-center">
          <nav className="flex">
            <Link to="/" className="mr-10 text-2xl dark:text-white font-bold text-gray-800">
              E-Shop
            </Link>
            <button onClick={toggleTheme} className="hover:text-blue-400 hover:dark:text-blue-400 rounded-full text-black mx-3 dark:text-white">
              {theme === 'light' ? (
                <i className="bi bi-moon"></i>
              ) : (
                <i className="bi bi-sun"></i>
              )}
            </button>
            <div className='hidden lg:block md:block space-x-6 mt-1'>
              <Link to="/" className="dark:text-white hover:text-gray-600">Home</Link>
              <Link to="/shop" className="dark:text-white hover:text-gray-600">Shop</Link>
              <Link to="/about" className="dark:text-white hover:text-gray-600">About Us</Link>
              <Link to="/contact" className="dark:text-white hover:text-gray-600">Contact</Link>
            </div>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                className="w-14 lg:w-full pl-14 pr-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none"
                placeholder="party floral dress"
              />
              <i className="bi bi-search bg-black px-2 rounded-full py-1 absolute left-3 top-1/2 transform -translate-y-1/2 text-white"></i>
            </div>

            <div className="flex justify-end items-center space-x-4 relative">
              <Link to="/cart" className="dark:text-white hover:text-gray-600">
                <i className="bi bi-cart"></i>
              </Link>
            </div>

            <div
              className="relative"
              ref={(el) => (dropdownRefs.current.profile = el)}
            >
              <button
                onClick={() => toggleDropdown('profile')}
                className="dark:text-white hover:text-gray-600 focus:outline-none"
              >
                <i className="bi bi-person"></i> <i className="bi bi-caret-down-fill"></i>
              </button>
              {activeDropdown === 'profile' && (
                <div className="dropdown absolute right-0 mt-4 w-64 bg-white dark:bg-zinc-800 shadow-lg py-2 z-50" style={{ borderRadius: 20 }}>
                  {/* Profile dropdown items */}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='mx-auto flex justify-betwenn mb-3'>
          <div
            className="m-1 relative w-52"
            ref={(el) => (dropdownRefs.current.categories = el)}
          >
            <button
              onClick={() => toggleDropdown('categories')}
              className="dark:text-white hover:text-gray-600 bg-zinc-500 py-2 px-4 rounded-full text-white font-bold focus:outline-none"
            >
              <i className="bi bi-list"></i> All Categories <i className="bi bi-caret-down-fill"></i>
            </button>
            {activeDropdown === 'categories' && (
              <div className="absolute right-0 mt-4 w-64 bg-white dark:bg-zinc-800 shadow-lg py-2 z-50" style={{ borderRadius: 20 }}>
                {/* Categories dropdown items */}
              </div>
            )}
          </div>

          <Link to='/deals' className='m-1 text-xl font-bold text-black dark:text-white rounded-full hover:bg-zinc-300 py-2 px-4'>
            SuperDeals
          </Link>
          <Link to='/new' className='m-1 text-xl text-black dark:text-white rounded-full hover:bg-zinc-300 py-2 px-4'>
            New
          </Link>
          <Link to='/today' className='m-1 text-xl text-black dark:text-white rounded-full hover:bg-zinc-300 py-2 px-4'>
            In Today
          </Link>
          <Link to='/stores' className='m-1 text-xl text-black dark:text-white rounded-full hover:bg-zinc-300 py-2 px-4'>
            Stores
          </Link>
          <div
            className="m-1 relative"
            ref={(el) => (dropdownRefs.current.more = el)}
          >
            <button
              onClick={() => toggleDropdown('more')}
              className="dark:text-white hover:text-gray-600 bg-zinc-500 py-2 px-4 rounded-full text-white font-bold focus:outline-none"
            >
              More <i className="bi bi-caret-down-fill"></i>
            </button>
            {activeDropdown === 'more' && (
              <div className="absolute right-0 mt-4 w-64 bg-white dark:bg-zinc-800 shadow-lg py-2 z-50" style={{ borderRadius: 20 }}>
                {/* More dropdown items */}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
