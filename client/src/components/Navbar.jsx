import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative">
      <nav className="bg-[#C9A998] text-[#F7FFF7] font-abril-fatface p-4 flex items-center">
        <div className="absolute left-4">
          <a href="/" className="text-2xl">Logo</a>
        </div>

        <div className="flex-grow flex justify-center">
          <div className="hidden md:flex space-x-6">
            <motion.a
              href="/"
              className="group relative overflow-hidden"
              whileHover={{ scale: 1.1 }}
            >
              <span className="group-hover:text-[#FC9F01] transition duration-300 ease-in-out">
                Home
              </span>
            </motion.a>
            <motion.a
              href="/inventory"
              className="group relative overflow-hidden"
              whileHover={{ scale: 1.1 }}
            >
              <span className="group-hover:text-[#FC9F01] transition duration-300 ease-in-out">
                Inventory
              </span>
            </motion.a>
            <motion.a
              href="/about"
              className="group relative overflow-hidden"
              whileHover={{ scale: 1.1 }}
            >
              <span className="group-hover:text-[#FC9F01] transition duration-300 ease-in-out">
                About
              </span>
            </motion.a>
            <motion.a
              href="/contact"
              className="group relative overflow-hidden"
              whileHover={{ scale: 1.1 }}
            >
              <span className="group-hover:text-[#FC9F01] transition duration-300 ease-in-out">
                Contact
              </span>
            </motion.a>
          </div>
        </div>

        <div className=" space-x-6 items-center absolute right-4 hidden md:flex">
          <motion.a
            href="/cart"
            className="group relative overflow-hidden"
            whileHover={{ scale: 1.1 }}
          >
            <span className="group-hover:text-[#FC9F01] transition duration-300 ease-in-out">
              Cart
            </span>
          </motion.a>
          <motion.a
            href="/login"
            className="group relative overflow-hidden"
            whileHover={{ scale: 1.1 }}
          >
            <span className="group-hover:text-[#FC9F01] transition duration-300 ease-in-out">
              Login
            </span>
          </motion.a>
        </div>

        <div className="flex items-center md:hidden">
          <button
            className="focus:outline-none"
            onClick={toggleMenu}
          >
            <motion.div
              initial={false}
              animate={isMenuOpen ? 'open' : 'closed'}
              className="space-y-1"
            >
              <motion.div
                className="w-6 h-0.5 bg-[#F7FFF7]"
                variants={{
                  open: { rotate: 45, y: 6 },
                  closed: { rotate: 0, y: 0 },
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="w-6 h-0.5 bg-[#F7FFF7]"
                variants={{
                  open: { opacity: 0 },
                  closed: { opacity: 1 },
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="w-6 h-0.5 bg-[#F7FFF7]"
                variants={{
                  open: { rotate: -45, y: -6 },
                  closed: { rotate: 0, y: 0 },
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="absolute top-full left-0 w-full h-[100vh] bg-[#C9A998] p-4 md:hidden z-20"
        >
          <a href="/" className="block py-2 text-[#F7FFF7]">Home</a>
          <a href="/inventory" className="block py-2 text-[#F7FFF7]">Inventory</a>
          <a href="/cart" className="block py-2 text-[#F7FFF7]">Cart</a>
          <a href="/login" className="block py-2 text-[#F7FFF7]">Login</a>
        </motion.div>
      )}

      <div className="hidden md:block absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[1.5px] w-[65%] bg-[#F7FFF7]"></div>
    </div>
  );
};

export default Navbar;
