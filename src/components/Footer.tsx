import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-[rgb(9,36,57)] text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <p className="text-gray-300">
              We are dedicated to providing the best service to our customers.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Email: khurram.saadat@yahoo.com</li>
              <li>Phone: (123) 456-7890</li>
              <li>Address: Falconcity of wonders, Dubailand, Dubai, UAE</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
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
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 