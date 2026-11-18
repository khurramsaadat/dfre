"use client";
import Link from 'next/link';
import GearIcon from './GearIcon';
import '../app/globals.css';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  BuildingOffice2Icon,
  DocumentDuplicateIcon,
  DocumentTextIcon,
  PencilIcon,
  EyeIcon,
  MapPinIcon,
  ChevronDownIcon,
  WrenchScrewdriverIcon
} from '@heroicons/react/24/outline';

/* ── Nav group definitions ─────────────────────────────────── */

interface NavItem {
  name: string;
  href: string;
  icon: typeof HomeIcon;
}

interface NavGroup {
  label: string;
  icon: typeof HomeIcon;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    label: 'DM Submission',
    icon: BuildingOffice2Icon,
    items: [
      { name: '6 Assets Pole 1-7', href: '/6-assets-pole-1-7', icon: BuildingOffice2Icon },
      { name: '6 Assets Pole 8-12', href: '/6-assets-pole-8-12', icon: DocumentDuplicateIcon },
      { name: '3 Assets Pole 1-7', href: '/3-assets-pole-1-7', icon: DocumentTextIcon },
      { name: '3 Assets Pole 8-12', href: '/3-assets-pole-8-12', icon: DocumentDuplicateIcon },
    ],
  },
  {
    label: 'Publish',
    icon: PencilIcon,
    items: [
      { name: 'Pole 1-7', href: '/pole-1-7', icon: PencilIcon },
      { name: 'Pole 8-12', href: '/pole-8-12', icon: DocumentDuplicateIcon },
    ],
  },
  {
    label: 'Tools',
    icon: WrenchScrewdriverIcon,
    items: [
      { name: 'Artwork QC', href: '/artwork-qc', icon: EyeIcon },
      { name: 'Locations', href: '/locations', icon: MapPinIcon },
    ],
  },
];

/* ── Header Component ──────────────────────────────────────── */

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [linksVisible, setLinksVisible] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [expandedMobileGroup, setExpandedMobileGroup] = useState<string | null>(null);
  const pathname = usePathname();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Animate mobile links after menu slides in
  useEffect(() => {
    if (menuOpen) {
      const timer = setTimeout(() => setLinksVisible(true), 300);
      return () => clearTimeout(timer);
    } else {
      setLinksVisible(false);
      setExpandedMobileGroup(null);
    }
  }, [menuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Close desktop dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close desktop dropdown on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenDropdown(null);
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  // Check if any route in a group is active
  const isGroupActive = (group: NavGroup) =>
    group.items.some((item) => pathname === item.href);

  // Desktop dropdown hover handlers with small delay to prevent flicker
  const handleDropdownEnter = (label: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setOpenDropdown(label);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  // Mobile accordion toggle
  const toggleMobileGroup = (label: string) => {
    setExpandedMobileGroup((prev) => (prev === label ? null : label));
  };

  // Base link styling
  const getLinkClasses = (path: string) => {
    const isActive = pathname === path;
    return `inline-flex items-center text-sm transition-colors duration-200 ${
      isActive ? 'text-white' : 'text-gray-300 hover:text-white'
    }`;
  };

  const getMobileLinkClasses = (path: string) => {
    const isActive = pathname === path;
    return `text-base font-semibold text-white flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
      isActive ? 'bg-white/20' : 'hover:bg-white/10'
    } link-slide-up ${linksVisible ? 'animate' : ''}`;
  };

  return (
    <header className="bg-orange-900 shadow-md relative z-50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
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

          {/* ── Desktop Nav ──────────────────────────────── */}
          <div ref={navRef} className="hidden md:flex items-center space-x-6">
            {/* Home – standalone */}
            <Link href="/" className={getLinkClasses('/')}>
              <HomeIcon className="w-4 h-4 mr-1" />
              <span>Home</span>
            </Link>

            {/* Dropdown groups */}
            {navGroups.map((group) => {
              const GroupIcon = group.icon;
              const isOpen = openDropdown === group.label;
              const active = isGroupActive(group);

              return (
                <div
                  key={group.label}
                  className="relative"
                  onMouseEnter={() => handleDropdownEnter(group.label)}
                  onMouseLeave={handleDropdownLeave}
                >
                  {/* Trigger */}
                  <button
                    className={`inline-flex items-center text-sm gap-1 transition-colors duration-200 focus:outline-none ${
                      active || isOpen ? 'text-white' : 'text-gray-300 hover:text-white'
                    }`}
                    onClick={() => setOpenDropdown(isOpen ? null : group.label)}
                    aria-expanded={isOpen}
                  >
                    <GroupIcon className="w-4 h-4" />
                    <span>{group.label}</span>
                    <ChevronDownIcon
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {/* Dropdown panel */}
                  <div
                    className={`absolute top-full left-0 mt-2 w-52 bg-orange-950 border border-orange-800 rounded-xl shadow-2xl overflow-hidden transition-all duration-200 origin-top ${
                      isOpen
                        ? 'opacity-100 scale-y-100 pointer-events-auto'
                        : 'opacity-0 scale-y-95 pointer-events-none'
                    }`}
                  >
                    <div className="py-1">
                      {group.items.map((item) => {
                        const ItemIcon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setOpenDropdown(null)}
                            className={`flex items-center gap-2 px-4 py-2.5 text-sm transition-colors duration-150 ${
                              isActive
                                ? 'bg-white/15 text-white font-semibold'
                                : 'text-gray-300 hover:bg-white/10 hover:text-white'
                            }`}
                          >
                            <ItemIcon className="w-4 h-4 flex-shrink-0" />
                            <span>{item.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Mobile burger button ─────────────────────── */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 z-50 relative"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span
              className={`block w-7 h-1 rounded-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 transition-all duration-300 ${
                menuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-7 h-1 rounded-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 my-1 transition-all duration-300 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-7 h-1 rounded-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 transition-all duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>

        {/* ── Mobile menu panel ──────────────────────────── */}
        <div
          className={`fixed top-16 right-0 h-[calc(100vh-4rem)] w-[80vw] max-w-xs bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 shadow-2xl z-40 rounded-l-3xl ${
            menuOpen ? 'menu-slide-in' : 'translate-x-full'
          } transition-transform duration-300 ease-in-out md:hidden overflow-y-auto`}
        >
          <div className="flex flex-col h-full p-6 space-y-3">
            {/* Home – standalone */}
            <Link
              href="/"
              className={getMobileLinkClasses('/')}
              onClick={() => setMenuOpen(false)}
              style={{ animationDelay: '0ms' }}
            >
              <HomeIcon className="w-5 h-5" />
              <span>Home</span>
            </Link>

            <hr className="border border-white/20" />

            {/* Accordion groups */}
            {navGroups.map((group, groupIdx) => {
              const GroupIcon = group.icon;
              const isExpanded = expandedMobileGroup === group.label;
              const active = isGroupActive(group);

              return (
                <div
                  key={group.label}
                  className={`link-slide-up ${linksVisible ? 'animate' : ''}`}
                  style={{ animationDelay: `${(groupIdx + 1) * 100}ms` }}
                >
                  {/* Group header / toggle */}
                  <button
                    onClick={() => toggleMobileGroup(group.label)}
                    className={`w-full flex items-center justify-between text-base font-semibold text-white px-3 py-2 rounded-lg transition-colors duration-200 ${
                      active ? 'bg-white/20' : 'hover:bg-white/10'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <GroupIcon className="w-5 h-5" />
                      {group.label}
                    </span>
                    <ChevronDownIcon
                      className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {/* Collapsible items */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isExpanded ? 'max-h-96 opacity-100 mt-1' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="pl-4 space-y-1">
                      {group.items.map((item) => {
                        const ItemIcon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMenuOpen(false)}
                            className={`flex items-center gap-2 text-sm font-medium text-white px-3 py-2 rounded-lg transition-colors duration-200 ${
                              isActive ? 'bg-white/25' : 'hover:bg-white/10'
                            }`}
                          >
                            <ItemIcon className="w-4 h-4" />
                            <span>{item.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  {groupIdx < navGroups.length - 1 && (
                    <hr className="border border-white/20 mt-3" />
                  )}
                </div>
              );
            })}

            {/* Copyright at bottom */}
            <div className="mt-auto pt-4">
              <hr className="border border-white/20 mb-3" />
              <p className="text-white/60 text-xs text-center">
                © {new Date().getFullYear()} Layout Factory by Khurram
              </p>
            </div>
          </div>
        </div>

        {/* Overlay */}
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
