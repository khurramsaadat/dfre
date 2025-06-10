"use client";
import Link from 'next/link';
import GearIcon from './GearIcon';
import { usePathname } from 'next/navigation';

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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex flex-row items-center gap-4 mb-2 group">
              <div className="w-8 h-8 transition-transform group-hover:scale-110">
                <GearIcon />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold leading-none group-hover:text-white transition-colors">LAYOUT</span>
                <span className="text-sm font-semibold leading-none group-hover:text-white transition-colors">FACTORY</span>
              </div>
            </Link>
            <p className="text-gray-300 text-sm">Welcome to Layout Factory!</p>
          </div>
          <div>
            <h3 className="text-sm font-bold mb-4 text-white">QUICK LINKS</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className={getLinkClasses('/')}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/dm6assets" className={getLinkClasses('/dm6assets')}>
                  DM 6 Assets
                </Link>
              </li>
              <li>
                <Link href="/dm3assets" className={getLinkClasses('/dm3assets')}>
                  DM 3 Assets
                </Link>
              </li>
              <li>
                <Link href="/design-studio" className={getLinkClasses('/design-studio')}>Design Studio</Link>
              </li>
              <li>
                <Link href="/locations" className={getLinkClasses('/locations')}>Locations</Link>
              </li>
            </ul>
          </div>
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
              <li>Falconcity of wonders, Dubailand</li>
              <li>Dubai, UAE</li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold mb-4 text-white">FOLLOW US</h3>
            <div className="grid grid-cols-5 gap-4">
              {/* Facebook */}
              <a href="#" className="relative group filter invert hover:invert-0 transition duration-200" aria-label="Facebook">
                <img src="/images/facebook_icon.svg" alt="Facebook" width={30} height={30} className="w-[30px] h-[30px]" />
                <span className="absolute left-1/2 -translate-x-1/2 -top-8 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 group-focus:opacity-100 pointer-events-none transition-none z-10 whitespace-nowrap">Facebook</span>
              </a>
              {/* X (Twitter) */}
              <a href="#" className="relative group filter invert hover:invert-0 transition duration-200" aria-label="X (Twitter)">
                <img src="/images/x.svg" alt="X (Twitter)" width={30} height={30} className="w-[30px] h-[30px]" />
                <span className="absolute left-1/2 -translate-x-1/2 -top-8 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 group-focus:opacity-100 pointer-events-none transition-none z-10 whitespace-nowrap">X (Twitter)</span>
              </a>
              {/* Instagram */}
              <a href="#" className="relative group filter invert hover:invert-0 transition duration-200" aria-label="Instagram">
                <img src="/images/instagram_icon.svg" alt="Instagram" width={30} height={30} className="w-[30px] h-[30px]" />
                <span className="absolute left-1/2 -translate-x-1/2 -top-8 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 group-focus:opacity-100 pointer-events-none transition-none z-10 whitespace-nowrap">Instagram</span>
              </a>
              {/* LinkedIn */}
              <a href="#" className="relative group filter invert hover:invert-0 transition duration-200" aria-label="LinkedIn">
                <img src="/images/linkedin_icon.svg" alt="LinkedIn" width={30} height={30} className="w-[30px] h-[30px]" />
                <span className="absolute left-1/2 -translate-x-1/2 -top-8 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 group-focus:opacity-100 pointer-events-none transition-none z-10 whitespace-nowrap">LinkedIn</span>
              </a>
              {/* TikTok */}
              <a href="#" className="relative group filter invert hover:invert-0 transition duration-200" aria-label="TikTok">
                <img src="/images/tiktok_icon.svg" alt="TikTok" width={30} height={30} className="w-[30px] h-[30px]" />
                <span className="absolute left-1/2 -translate-x-1/2 -top-8 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 group-focus:opacity-100 pointer-events-none transition-none z-10 whitespace-nowrap">TikTok</span>
              </a>
              {/* YouTube */}
              <a href="#" className="relative group filter invert hover:invert-0 transition duration-200" aria-label="YouTube">
                <img src="/images/youtube_icon.svg" alt="YouTube" width={30} height={30} className="w-[30px] h-[30px]" />
                <span className="absolute left-1/2 -translate-x-1/2 -top-8 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 group-focus:opacity-100 pointer-events-none transition-none z-10 whitespace-nowrap">YouTube</span>
              </a>
              {/* Reddit */}
              <a href="#" className="relative group filter invert hover:invert-0 transition duration-200" aria-label="Reddit">
                <img src="/images/reddit_icon.svg" alt="Reddit" width={30} height={30} className="w-[30px] h-[30px]" />
                <span className="absolute left-1/2 -translate-x-1/2 -top-8 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 group-focus:opacity-100 pointer-events-none transition-none z-10 whitespace-nowrap">Reddit</span>
              </a>
              {/* Pinterest */}
              <a href="#" className="relative group filter invert hover:invert-0 transition duration-200" aria-label="Pinterest">
                <img src="/images/pinterest_icon.svg" alt="Pinterest" width={30} height={30} className="w-[30px] h-[30px]" />
                <span className="absolute left-1/2 -translate-x-1/2 -top-8 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 group-focus:opacity-100 pointer-events-none transition-none z-10 whitespace-nowrap">Pinterest</span>
              </a>
              {/* Messenger */}
              <a href="#" className="relative group filter invert hover:invert-0 transition duration-200" aria-label="Messenger">
                <img src="/images/messenger_icon.svg" alt="Messenger" width={30} height={30} className="w-[30px] h-[30px]" />
                <span className="absolute left-1/2 -translate-x-1/2 -top-8 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 group-focus:opacity-100 pointer-events-none transition-none z-10 whitespace-nowrap">Messenger</span>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-300 text-sm">&copy; {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 