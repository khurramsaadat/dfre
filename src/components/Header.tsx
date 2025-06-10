"use client";
import Link from 'next/link';
import GearIcon from './GearIcon';
import '../app/globals.css';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { HomeIcon, BuildingOffice2Icon, DocumentTextIcon, PencilIcon, MapPinIcon } from '@heroicons/react/24/outline';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [linksVisible, setLinksVisible] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'DM 6 Assets', href: '/dm6assets' },
    { name: 'DM 3 Assets', href: '/dm3assets' },
    { name: 'Design Studio', href: '/design-studio' },
    { name: 'Locations', href: '/locations' },
  ]

  // Handle menu animation timing
  useEffect(() => {
    if (menuOpen) {
      // Delay the links animation until after menu slides in
      const timer = setTimeout(() => {
        setLinksVisible(true);
      }, 300); // Match this with menuSlideIn duration
      return () => clearTimeout(timer);
    } else {
      setLinksVisible(false);
    }
  }, [menuOpen]);

  const getLinkClasses = (path: string) => {
    const baseClasses = "transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:bg-white after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100";
    const isActive = pathname === path;
    return `${baseClasses} ${isActive ? 'text-white after:scale-x-100' : 'text-gray-300 after:scale-x-0 hover:text-white'}`;
  };

  const getMobileLinkClasses = (path: string) => {
    const baseClasses = `text-lg font-bold text-white relative overflow-hidden group link-slide-up ${linksVisible ? 'animate' : ''} flex items-center justify-center gap-2`;
    const isActive = pathname === path;
    return `${baseClasses} ${isActive ? 'bg-white/20 rounded-lg' : ''}`;
  };

  return (
    <header className="bg-orange-900 shadow-md">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-3">
              <span style={{ display: 'inline-block' }}>
                <GearIcon />
              </span>
              <div className="flex flex-col text-white">
                <span className="text-sm font-semibold leading-none">LAYOUT</span>
                <span className="text-sm font-semibold leading-none">FACTORY</span>
              </div>
            </Link>
          </div>
          <div className="hidden md:flex space-x-8">
            <Link href="/" className={getLinkClasses('/')}>
              <HomeIcon className="w-5 h-5 mr-1 inline" /> Home
            </Link>
            <Link href="/dm6assets" className={getLinkClasses('/dm6assets')}>
              <BuildingOffice2Icon className="w-5 h-5 mr-1 inline" /> DM 6 Assets
            </Link>
            <Link href="/dm3assets" className={getLinkClasses('/dm3assets')}>
              <DocumentTextIcon className="w-5 h-5 mr-1 inline" /> DM 3 Assets
            </Link>
            <Link href="/design-studio" className={getLinkClasses('/design-studio')}>
              <PencilIcon className="w-5 h-5 mr-1 inline" /> Design Studio
            </Link>
            <Link href="/locations" className={getLinkClasses('/locations')}>
              <MapPinIcon className="w-5 h-5 mr-1 inline" /> Locations
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
          className={`fixed top-16 right-0 h-[50vh] w-[70vw] max-w-xs bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 shadow-2xl z-40 rounded-l-3xl ${menuOpen ? 'menu-slide-in' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden overflow-hidden`}
        >
          <div className="flex flex-col h-full justify-center p-8 space-y-6 text-center">
            <Link 
              href="/" 
              className={getMobileLinkClasses('/')}
              onClick={() => setMenuOpen(false)}
              style={{ animationDelay: '0ms' }}
            >
              <HomeIcon className="w-5 h-5 mr-1 inline" />
              <span className="relative z-10">Home</span>
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"></span>
            </Link>
            <hr className="border-2 border-white/20" />
            <Link 
              href="/dm6assets" 
              className={getMobileLinkClasses('/dm6assets')}
              onClick={() => setMenuOpen(false)}
              style={{ animationDelay: '100ms' }}
            >
              <BuildingOffice2Icon className="w-5 h-5 mr-1 inline" />
              <span className="relative z-10">DM 6 Assets</span>
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"></span>
            </Link>
            <hr className="border-2 border-white/20" />
            <Link 
              href="/dm3assets" 
              className={getMobileLinkClasses('/dm3assets')}
              onClick={() => setMenuOpen(false)}
              style={{ animationDelay: '200ms' }}
            >
              <DocumentTextIcon className="w-5 h-5 mr-1 inline" />
              <span className="relative z-10">DM 3 Assets</span>
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"></span>
            </Link>
            <hr className="border-2 border-white/20" />
            <Link 
              href="/design-studio" 
              className={getMobileLinkClasses('/design-studio')}
              onClick={() => setMenuOpen(false)}
              style={{ animationDelay: '300ms' }}
            >
              <PencilIcon className="w-5 h-5 mr-1 inline" />
              <span className="relative z-10">Design Studio</span>
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"></span>
            </Link>
            <hr className="border-2 border-white/20" />
            <Link 
              href="/locations" 
              className={getMobileLinkClasses('/locations')}
              onClick={() => setMenuOpen(false)}
              style={{ animationDelay: '400ms' }}
            >
              <MapPinIcon className="w-5 h-5 mr-1 inline" />
              <span className="relative z-10">Locations</span>
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"></span>
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