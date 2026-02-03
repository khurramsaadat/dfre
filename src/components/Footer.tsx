"use client";
import Link from 'next/link';
import GearIcon from './GearIcon';
import { usePathname } from 'next/navigation';
import { HomeIcon, BuildingOffice2Icon, DocumentTextIcon, PencilIcon, MapPinIcon } from '@heroicons/react/24/outline';

const Footer = () => {
  const pathname = usePathname();

  const getLinkClasses = (path: string) => {
    const baseClasses = "text-sm transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:bg-white after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100";
    const isActive = pathname === path;
    return `${baseClasses} ${isActive ? 'text-white after:scale-x-100' : 'text-gray-300 after:scale-x-0 hover:text-white'}`;
  };

  return (
    <footer className="bg-orange-900 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo and Description - Takes first 2 columns */}
          <div className="md:col-span-2">
            <Link href="/" className="flex flex-row items-center gap-4 mb-2 group">
              <div className="w-8 h-8 transition-transform group-hover:scale-110">
                <GearIcon />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold leading-none group-hover:text-white transition-colors">LAYOUT</span>
                <span className="text-sm font-semibold leading-none group-hover:text-white transition-colors">FACTORY</span>
              </div>
            </Link>
            <p className="text-gray-300 text-sm">Welcome to Layout Factory! Create professional layouts for DM approvals and Design Studio projects.</p>
          </div>
          {/* Quick Links - Column 3 */}
          <div>
            <h3 className="text-sm font-bold mb-4 text-white">QUICK LINKS</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className={`inline-flex items-center text-sm transition-colors relative after:absolute after:bottom-[-8px] after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:w-[100%] after:origin-bottom-right after:bg-white after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100 ${pathname === '/' ? 'after:scale-x-100 text-white' : 'after:scale-x-0 text-gray-300 hover:text-white'}`}
                  style={{ display: 'inline-flex' }}
                >
                  <HomeIcon className="w-4 h-4 mr-1" aria-hidden="true" /> Home
                </Link>
              </li>
              <li>
                <Link
                  href="/dm6assets"
                  className={`inline-flex items-center text-sm transition-colors relative after:absolute after:bottom-[-8px] after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:w-[100%] after:origin-bottom-right after:bg-white after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100 ${pathname === '/dm6assets' ? 'after:scale-x-100 text-white' : 'after:scale-x-0 text-gray-300 hover:text-white'}`}
                  style={{ display: 'inline-flex' }}
                >
                  <BuildingOffice2Icon className="w-4 h-4 mr-1" aria-hidden="true" /> DM 6 Assets
                </Link>
              </li>
              <li>
                <Link
                  href="/dm3assets"
                  className={`inline-flex items-center text-sm transition-colors relative after:absolute after:bottom-[-8px] after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:w-[100%] after:origin-bottom-right after:bg-white after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100 ${pathname === '/dm3assets' ? 'after:scale-x-100 text-white' : 'after:scale-x-0 text-gray-300 hover:text-white'}`}
                  style={{ display: 'inline-flex' }}
                >
                  <DocumentTextIcon className="w-4 h-4 mr-1" aria-hidden="true" /> DM 3 Assets
                </Link>
              </li>
              <li>
                <Link
                  href="/design-studio"
                  className={`inline-flex items-center text-sm transition-colors relative after:absolute after:bottom-[-8px] after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:w-[100%] after:origin-bottom-right after:bg-white after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100 ${pathname === '/design-studio' ? 'after:scale-x-100 text-white' : 'after:scale-x-0 text-gray-300 hover:text-white'}`}
                  style={{ display: 'inline-flex' }}
                >
                  <PencilIcon className="w-4 h-4 mr-1" aria-hidden="true" /> Design Studio
                </Link>
              </li>
              <li>
                <Link
                  href="/locations"
                  className={`inline-flex items-center text-sm transition-colors relative after:absolute after:bottom-[-8px] after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:w-[100%] after:origin-bottom-right after:bg-white after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100 ${pathname === '/locations' ? 'after:scale-x-100 text-white' : 'after:scale-x-0 text-gray-300 hover:text-white'}`}
                  style={{ display: 'inline-flex' }}
                >
                  <MapPinIcon className="w-4 h-4 mr-1" aria-hidden="true" /> Locations
                </Link>
              </li>
            </ul>
          </div>
          {/* Contact Us - Column 4 */}
          <div>
            <h3 className="text-sm font-bold mb-4 text-white">CONTACT US</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>
                <a 
                  href="mailto:khurram.saadat@yahoo.com"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  khurram.saadat@yahoo.com
                </a>
              </li>
              <li>Dubai</li>
              <li>United Arab Emirates</li>
            </ul>
          </div>
          {/* Follow Us - Column 5 */}
          <div>
            <h3 className="text-sm font-bold mb-4 text-white">FOLLOW US</h3>
            <div className="grid grid-cols-5 gap-4">
              {/* Facebook */}
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="relative group filter invert hover:invert-0 transition duration-200" aria-label="Facebook">
                <img src="/images/facebook_icon.svg" alt="Facebook" width={30} height={30} className="w-[30px] h-[30px]" />
                <span className="absolute left-1/2 -translate-x-1/2 -top-8 px-2 py-1 rounded-lg bg-black text-white text-xs opacity-0 group-hover:opacity-100 group-focus:opacity-100 pointer-events-none transition-none z-10 whitespace-nowrap">Facebook</span>
              </a>
              {/* X (Twitter) */}
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="relative group filter invert hover:invert-0 transition duration-200" aria-label="X (Twitter)">
                <img src="/images/x.svg" alt="X (Twitter)" width={30} height={30} className="w-[30px] h-[30px]" />
                <span className="absolute left-1/2 -translate-x-1/2 -top-8 px-2 py-1 rounded-lg bg-black text-white text-xs opacity-0 group-hover:opacity-100 group-focus:opacity-100 pointer-events-none transition-none z-10 whitespace-nowrap">X (Twitter)</span>
              </a>
              {/* Instagram */}
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="relative group filter invert hover:invert-0 transition duration-200" aria-label="Instagram">
                <img src="/images/instagram_icon.svg" alt="Instagram" width={30} height={30} className="w-[30px] h-[30px]" />
                <span className="absolute left-1/2 -translate-x-1/2 -top-8 px-2 py-1 rounded-lg bg-black text-white text-xs opacity-0 group-hover:opacity-100 group-focus:opacity-100 pointer-events-none transition-none z-10 whitespace-nowrap">Instagram</span>
              </a>
              {/* LinkedIn */}
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="relative group filter invert hover:invert-0 transition duration-200" aria-label="LinkedIn">
                <img src="/images/linkedin_icon.svg" alt="LinkedIn" width={30} height={30} className="w-[30px] h-[30px]" />
                <span className="absolute left-1/2 -translate-x-1/2 -top-8 px-2 py-1 rounded-lg bg-black text-white text-xs opacity-0 group-hover:opacity-100 group-focus:opacity-100 pointer-events-none transition-none z-10 whitespace-nowrap">LinkedIn</span>
              </a>
              {/* TikTok */}
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="relative group filter invert hover:invert-0 transition duration-200" aria-label="TikTok">
                <img src="/images/tiktok_icon.svg" alt="TikTok" width={30} height={30} className="w-[30px] h-[30px]" />
                <span className="absolute left-1/2 -translate-x-1/2 -top-8 px-2 py-1 rounded-lg bg-black text-white text-xs opacity-0 group-hover:opacity-100 group-focus:opacity-100 pointer-events-none transition-none z-10 whitespace-nowrap">TikTok</span>
              </a>
              {/* YouTube */}
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="relative group filter invert hover:invert-0 transition duration-200" aria-label="YouTube">
                <img src="/images/youtube_icon.svg" alt="YouTube" width={30} height={30} className="w-[30px] h-[30px]" />
                <span className="absolute left-1/2 -translate-x-1/2 -top-8 px-2 py-1 rounded-lg bg-black text-white text-xs opacity-0 group-hover:opacity-100 group-focus:opacity-100 pointer-events-none transition-none z-10 whitespace-nowrap">YouTube</span>
              </a>
              {/* Reddit */}
              <a href="https://reddit.com" target="_blank" rel="noopener noreferrer" className="relative group filter invert hover:invert-0 transition duration-200" aria-label="Reddit">
                <img src="/images/reddit_icon.svg" alt="Reddit" width={30} height={30} className="w-[30px] h-[30px]" />
                <span className="absolute left-1/2 -translate-x-1/2 -top-8 px-2 py-1 rounded-lg bg-black text-white text-xs opacity-0 group-hover:opacity-100 group-focus:opacity-100 pointer-events-none transition-none z-10 whitespace-nowrap">Reddit</span>
              </a>
              {/* Pinterest */}
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="relative group filter invert hover:invert-0 transition duration-200" aria-label="Pinterest">
                <img src="/images/pinterest_icon.svg" alt="Pinterest" width={30} height={30} className="w-[30px] h-[30px]" />
                <span className="absolute left-1/2 -translate-x-1/2 -top-8 px-2 py-1 rounded-lg bg-black text-white text-xs opacity-0 group-hover:opacity-100 group-focus:opacity-100 pointer-events-none transition-none z-10 whitespace-nowrap">Pinterest</span>
              </a>
              {/* Messenger */}
              <a href="https://messenger.com" target="_blank" rel="noopener noreferrer" className="relative group filter invert hover:invert-0 transition duration-200" aria-label="Messenger">
                <img src="/images/messenger_icon.svg" alt="Messenger" width={30} height={30} className="w-[30px] h-[30px]" />
                <span className="absolute left-1/2 -translate-x-1/2 -top-8 px-2 py-1 rounded-lg bg-black text-white text-xs opacity-0 group-hover:opacity-100 group-focus:opacity-100 pointer-events-none transition-none z-10 whitespace-nowrap">Messenger</span>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-300 text-sm">© 2026 Layout Factory by Khurram. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 