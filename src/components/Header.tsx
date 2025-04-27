import Link from 'next/link';
import GearIcon from './DiamondIcon';
import '../app/globals.css';

const Header = () => {
  return (
    <header className="bg-[rgb(9,36,57)] shadow-md">
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
            <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
              Design Studio
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header; 