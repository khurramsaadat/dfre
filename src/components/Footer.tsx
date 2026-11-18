"use client";
import Link from 'next/link';
import GearIcon from './GearIcon';
import { usePathname } from 'next/navigation';
import { HomeIcon, BuildingOffice2Icon, DocumentDuplicateIcon, DocumentTextIcon, PencilIcon, EyeIcon, MapPinIcon } from '@heroicons/react/24/outline';

const Footer = () => {
  const pathname = usePathname();

  const footerLinkClasses = (path: string) => {
    const isActive = pathname === path;
    return `inline-flex items-center text-sm transition-colors relative after:absolute after:bottom-[-8px] after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:w-[100%] after:origin-bottom-right after:bg-white after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100 ${
      isActive ? 'after:scale-x-100 text-white' : 'after:scale-x-0 text-gray-300 hover:text-white'
    }`;
  };

  return (
    <footer className="bg-orange-900 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
          {/* Logo and Description – 2 columns */}
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

          {/* DM Submission group */}
          <div>
            <h3 className="text-sm font-bold mb-4 text-white">DM SUBMISSION</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/dm6assets" className={footerLinkClasses('/dm6assets')} style={{ display: 'inline-flex' }}>
                  <BuildingOffice2Icon className="w-4 h-4 mr-1" aria-hidden="true" /> DM 6 Assets
                </Link>
              </li>
              <li>
                <Link href="/dm6assets-v2" className={footerLinkClasses('/dm6assets-v2')} style={{ display: 'inline-flex' }}>
                  <DocumentDuplicateIcon className="w-4 h-4 mr-1" aria-hidden="true" /> DM 6 Assets V2
                </Link>
              </li>
              <li>
                <Link href="/dm3assets" className={footerLinkClasses('/dm3assets')} style={{ display: 'inline-flex' }}>
                  <DocumentTextIcon className="w-4 h-4 mr-1" aria-hidden="true" /> DM 3 Assets
                </Link>
              </li>
              <li>
                <Link href="/dm3assets-v2" className={footerLinkClasses('/dm3assets-v2')} style={{ display: 'inline-flex' }}>
                  <DocumentDuplicateIcon className="w-4 h-4 mr-1" aria-hidden="true" /> DM 3 Assets V2
                </Link>
              </li>
            </ul>
          </div>

          {/* Publish group */}
          <div>
            <h3 className="text-sm font-bold mb-4 text-white">PUBLISH</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/pole-1-7" className={footerLinkClasses('/pole-1-7')} style={{ display: 'inline-flex' }}>
                  <PencilIcon className="w-4 h-4 mr-1" aria-hidden="true" /> Pole 1-7
                </Link>
              </li>
              <li>
                <Link href="/pole-8-12" className={footerLinkClasses('/pole-8-12')} style={{ display: 'inline-flex' }}>
                  <DocumentDuplicateIcon className="w-4 h-4 mr-1" aria-hidden="true" /> Pole 8-12
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools group */}
          <div>
            <h3 className="text-sm font-bold mb-4 text-white">TOOLS</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/artwork-qc" className={footerLinkClasses('/artwork-qc')} style={{ display: 'inline-flex' }}>
                  <EyeIcon className="w-4 h-4 mr-1" aria-hidden="true" /> Artwork QC
                </Link>
              </li>
              <li>
                <Link href="/locations" className={footerLinkClasses('/locations')} style={{ display: 'inline-flex' }}>
                  <MapPinIcon className="w-4 h-4 mr-1" aria-hidden="true" /> Locations
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
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
        </div>

        {/* Social Icons Row */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <div className="flex justify-center">
            <div className="grid grid-cols-9 gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="relative group filter invert hover:invert-0 transition duration-200" aria-label="Facebook">
                <img src="/images/facebook_icon.svg" alt="Facebook" width={30} height={30} className="w-[30px] h-[30px]" />
                <span className="absolute left-1/2 -translate-x-1/2 -top-8 px-2 py-1 rounded-lg bg-black text-white text-xs opacity-0 group-hover:opacity-100 group-focus:opacity-100 pointer-events-none transition-none z-10 whitespace-nowrap">Facebook</span>
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="relative group filter invert hover:invert-0 transition duration-200" aria-label="X (Twitter)">
                <img src="/images/x.svg" alt="X (Twitter)" width={30} height={30} className="w-[30px] h-[30px]" />
                <span className="absolute left-1/2 -translate-x-1/2 -top-8 px-2 py-1 rounded-lg bg-black text-white text-xs opacity-0 group-hover:opacity-100 group-focus:opacity-100 pointer-events-none transition-none z-10 whitespace-nowrap">X (Twitter)</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="relative group filter invert hover:invert-0 transition duration-200" aria-label="Instagram">
                <img src="/images/instagram_icon.svg" alt="Instagram" width={30} height={30} className="w-[30px] h-[30px]" />
                <span className="absolute left-1/2 -translate-x-1/2 -top-8 px-2 py-1 rounded-lg bg-black text-white text-xs opacity-0 group-hover:opacity-100 group-focus:opacity-100 pointer-events-none transition-none z-10 whitespace-nowrap">Instagram</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="relative group filter invert hover:invert-0 transition duration-200" aria-label="LinkedIn">
                <img src="/images/linkedin_icon.svg" alt="LinkedIn" width={30} height={30} className="w-[30px] h-[30px]" />
                <span className="absolute left-1/2 -translate-x-1/2 -top-8 px-2 py-1 rounded-lg bg-black text-white text-xs opacity-0 group-hover:opacity-100 group-focus:opacity-100 pointer-events-none transition-none z-10 whitespace-nowrap">LinkedIn</span>
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="relative group filter invert hover:invert-0 transition duration-200" aria-label="TikTok">
                <img src="/images/tiktok_icon.svg" alt="TikTok" width={30} height={30} className="w-[30px] h-[30px]" />
                <span className="absolute left-1/2 -translate-x-1/2 -top-8 px-2 py-1 rounded-lg bg-black text-white text-xs opacity-0 group-hover:opacity-100 group-focus:opacity-100 pointer-events-none transition-none z-10 whitespace-nowrap">TikTok</span>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="relative group filter invert hover:invert-0 transition duration-200" aria-label="YouTube">
                <img src="/images/youtube_icon.svg" alt="YouTube" width={30} height={30} className="w-[30px] h-[30px]" />
                <span className="absolute left-1/2 -translate-x-1/2 -top-8 px-2 py-1 rounded-lg bg-black text-white text-xs opacity-0 group-hover:opacity-100 group-focus:opacity-100 pointer-events-none transition-none z-10 whitespace-nowrap">YouTube</span>
              </a>
              <a href="https://reddit.com" target="_blank" rel="noopener noreferrer" className="relative group filter invert hover:invert-0 transition duration-200" aria-label="Reddit">
                <img src="/images/reddit_icon.svg" alt="Reddit" width={30} height={30} className="w-[30px] h-[30px]" />
                <span className="absolute left-1/2 -translate-x-1/2 -top-8 px-2 py-1 rounded-lg bg-black text-white text-xs opacity-0 group-hover:opacity-100 group-focus:opacity-100 pointer-events-none transition-none z-10 whitespace-nowrap">Reddit</span>
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="relative group filter invert hover:invert-0 transition duration-200" aria-label="Pinterest">
                <img src="/images/pinterest_icon.svg" alt="Pinterest" width={30} height={30} className="w-[30px] h-[30px]" />
                <span className="absolute left-1/2 -translate-x-1/2 -top-8 px-2 py-1 rounded-lg bg-black text-white text-xs opacity-0 group-hover:opacity-100 group-focus:opacity-100 pointer-events-none transition-none z-10 whitespace-nowrap">Pinterest</span>
              </a>
              <a href="https://messenger.com" target="_blank" rel="noopener noreferrer" className="relative group filter invert hover:invert-0 transition duration-200" aria-label="Messenger">
                <img src="/images/messenger_icon.svg" alt="Messenger" width={30} height={30} className="w-[30px] h-[30px]" />
                <span className="absolute left-1/2 -translate-x-1/2 -top-8 px-2 py-1 rounded-lg bg-black text-white text-xs opacity-0 group-hover:opacity-100 group-focus:opacity-100 pointer-events-none transition-none z-10 whitespace-nowrap">Messenger</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 pt-6 text-center">
          <p className="text-gray-300 text-sm">© {new Date().getFullYear()} Layout Factory by Khurram. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
