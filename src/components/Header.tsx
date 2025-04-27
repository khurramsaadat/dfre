"use client";
import Link from 'next/link';
import GearIcon from './DiamondIcon';
import '../app/globals.css';
import { useState } from 'react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="bg-orange-900 shadow-md">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div style={{ width: 48, height: 48, display: 'flex', alignItems: 'center' }}>
            <Link href="/">
              <span style={{ display: 'inline-block' }}>
                <GearIcon />
              </span>
            </Link>
          </div>
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/dm6assets" className="text-gray-300 hover:text-white transition-colors">
              DM 6 Assets
            </Link>
            <Link href="/dm3assets" className="text-gray-300 hover:text-white transition-colors">
              DM 3 Assets
            </Link>
            <Link href="/designstudio" className="text-gray-300 hover:text-white transition-colors">
              Design Studio
            </Link>
          </div>
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 z-50 relative"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open menu"
          >
            <span className={`block w-7 h-1 rounded-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-7 h-1 rounded-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 my-1 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-7 h-1 rounded-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
        <div
          className={`fixed top-1/2 right-0 h-[50vh] w-[70vw] max-w-xs bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 shadow-2xl rounded-l-2xl z-40 transform -translate-y-1/2 ${menuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}
        >
          <div className="flex flex-col h-full p-8 space-y-8 text-center">
            <Link href="/" className="text-lg font-bold text-white hover:text-yellow-100 transition-colors" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <hr className="border-2 border-white/20" />
            <Link href="/dm6assets" className="text-lg font-bold text-white hover:text-yellow-100 transition-colors" onClick={() => setMenuOpen(false)}>
              DM 6 Assets
            </Link>
            <hr className="border-2 border-white/20" />
            <Link href="/dm3assets" className="text-lg font-bold text-white hover:text-yellow-100 transition-colors" onClick={() => setMenuOpen(false)}>
              DM 3 Assets
            </Link>
            <hr className="border-2 border-white/20" />
            <Link href="/designstudio" className="text-lg font-bold text-white hover:text-yellow-100 transition-colors" onClick={() => setMenuOpen(false)}>
              Design Studio
            </Link>
          </div>
        </div>
        {menuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu overlay"
          />
        )}
      </nav>
    </header>
  );
};

export default Header; 