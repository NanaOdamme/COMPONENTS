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
    <header className="bg-gray-200 dark:bg-black w-full">
      <div className='mx-auto flex flex-col'>
        <div className="px-4 py-2 m-5 flex justify-between items-center">
          <nav className="flex">
            <Link to="/" className="mr-10 text-2xl dark:text-white font-bold text-gray-800">
              E-Shop
            </Link>

            <div className='space-x-6 mt-1'>
              <Link to="/" className="dark:text-white hover:text-gray-600">
                Home
              </Link>
              <Link to="/shop" className="dark:text-white hover:text-gray-600">
                Shop
              </Link>
              <Link to="/about" className="dark:text-white hover:text-gray-600">
                About Us
              </Link>
              <Link to="/contact" className="dark:text-white hover:text-gray-600">
                Contact
              </Link>
            </div>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                className="pl-14 pr-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none"
                placeholder="party floral dress"
              />
              <i className="bi bi-search bg-black px-2 rounded-full py-1 absolute left-3 top-1/2 transform -translate-y-1/2 text-white"></i>
            </div>

            <div className="flex justify-end items-center space-x-4 relative">
              <Link to="/cart" className="dark:text-white hover:text-gray-600">
                <i className="bi bi-cart"></i>
              </Link>

              <div
                className="relative"
                ref={(el) => (dropdownRefs.current.profile = el)}
              >
                <button
                  onClick={() => toggleDropdown('profile')}
                  className="dark:text-white hover:text-gray-600 focus:outline-none"
                >
                  <i className="bi bi-person"></i> <i class="bi bi-caret-down-fill"></i>
                </button>
                {activeDropdown === 'profile' && (
                  <div className="absolute right-0 mt-4 w-64 bg-white dark:bg-zinc-800 shadow-lg py-2" style={{ borderRadius: 20 }}>
                    <Link
                      to="/login"
                      className="text-center text-xl font-bold bg-zinc-700 rounded-full m-2 block px-4 py-3 text-white dark:text-white hover:bg-zinc-900"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      className="text-center text-xl font-bold rounded-full m-2 block px-4 py-3 text-zinc-700 dark:text-white hover:text-zinc-900"
                    >
                      Register
                    </Link>
                    <Link
                      to="/profile"
                      className="rounded-full m-2 block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      <i className="bi bi-person"></i> My Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="rounded-full m-2 block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      <i className="bi bi-list"></i> Orders
                    </Link>
                    <Link to="/payments"
                      className="rounded-full m-2 block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      <i className="bi bi-cash"></i> Payments
                    </Link>
                    <hr className='m-5 ' />
                    <Link
                      to="/settings"
                      className="rounded-full m-2 block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      <i className="bi bi-tools"></i> Settings
                    </Link>
                    <Link
                      to="/logout"
                      className="rounded-full m-2 block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      <i className="bi bi-person"></i> Logout
                    </Link>
                  </div>
                )}
              </div>

              <button onClick={toggleTheme} className="hover:text-blue-400 hover:dark:text-blue-400 p-2 rounded-full text-black dark:text-white">
                {theme === 'light' ? (
                  <i className="bi bi-moon"></i>
                ) : (
                  <i className="bi bi-sun"></i>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className='mx-auto flex justify-betwenn mb-3'>
          <div
            className="m-1 relative"
            ref={(el) => (dropdownRefs.current.categories = el)}
          >
            <button
              onClick={() => toggleDropdown('categories')}
              className="dark:text-white hover:text-gray-600 bg-zinc-500 py-2 px-4 rounded-full text-white font-bold focus:outline-none"
            >
              <i className="bi bi-list"></i> All Categories <i class="bi bi-caret-down-fill"></i>
            </button>
            {activeDropdown === 'categories' && (
              <div className="absolute right-0 mt-4 w-64 bg-white dark:bg-zinc-800 shadow-lg py-2" style={{ borderRadius: 20 }}>
                <Link
                  to="/clothes"
                  className="hover:bg-zinc-300 hover:text-black dark:hover:text-black rounded-full m-2 block px-4 py-3 text-black dark:text-zinc-300 "
                >
                  Clothes
                </Link>
                <Link
                  to="/house"
                  className="hover:bg-zinc-300 hover:text-black dark:hover:text-black rounded-full m-2 block px-4 py-3 text-black dark:text-zinc-300 "
                >
                  HouseHold
                </Link>
                <Link
                  to="/shoes"
                  className="hover:bg-zinc-300 hover:text-black dark:hover:text-black rounded-full m-2 block px-4 py-3 text-black dark:text-zinc-300 "
                >
                  Shoes
                </Link>
                <Link
                  to="/appliances"
                  className="hover:bg-zinc-300 hover:text-black dark:hover:text-black rounded-full m-2 block px-4 py-3 text-black dark:text-zinc-300 "
                >
                  Appliances
                </Link>
                <Link
                  to="/kids"
                  className="hover:bg-zinc-300 hover:text-black dark:hover:text-black rounded-full m-2 block px-4 py-3 text-black dark:text-zinc-300 "
                >
                  Kids
                </Link>
                <Link
                  to="/gadgets"
                  className="hover:bg-zinc-300 hover:text-black dark:hover:text-black rounded-full m-2 block px-4 py-3 text-black dark:text-zinc-300 "
                >
                  Gadgets
                </Link>
                <Link
                  to="/phonesandtablets"
                  className="hover:bg-zinc-300 hover:text-black dark:hover:text-black rounded-full m-2 block px-4 py-3 text-black dark:text-zinc-300 "
                >
                  Phones & Tablets
                </Link>
                <Link
                  to="/laptops"
                  className="hover:bg-zinc-300 hover:text-black dark:hover:text-black rounded-full m-2 block px-4 py-3 text-black dark:text-zinc-300 "
                >
                  Laptops
                </Link>
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
              More <i class="bi bi-caret-down-fill"></i>
            </button>
            {activeDropdown === 'more' && (
              <div className="absolute right-0 mt-4 w-64 bg-white dark:bg-zinc-800               shadow-lg py-2" style={{ borderRadius: 20 }}>
                <Link
                  to="/services"
                  className="hover:bg-zinc-300 hover:text-black dark:hover:text-black rounded-full m-2 block px-4 py-3 text-black dark:text-zinc-300"
                >
                  Services
                </Link>
                <Link
                  to="/careers"
                  className="hover:bg-zinc-300 hover:text-black dark:hover:text-black rounded-full m-2 block px-4 py-3 text-black dark:text-zinc-300"
                >
                  Careers
                </Link>
                <Link
                  to="/blog"
                  className="hover:bg-zinc-300 hover:text-black dark:hover:text-black rounded-full m-2 block px-4 py-3 text-black dark:text-zinc-300"
                >
                  Blog
                </Link>
                <Link
                  to="/events"
                  className="hover:bg-zinc-300 hover:text-black dark:hover:text-black rounded-full m-2 block px-4 py-3 text-black dark:text-zinc-300"
                >
                  Events
                </Link>
                <Link
                  to="/feedback"
                  className="hover:bg-zinc-300 hover:text-black dark:hover:text-black rounded-full m-2 block px-4 py-3 text-black dark:text-zinc-300"
                >
                  Feedback
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

