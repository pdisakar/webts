'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SmartSearch from '@/components/SmartSearch/SmartSearch';

interface MenuItem {
  id: string | number;
  item_title: string;
  item_slug?: string;
  url_segment?: string;
  children?: MenuItem[];
}

interface GlobalData {
  main_menu?: {
    menu: MenuItem[];
  };
  phone?: string;
  email?: string;
  address?: string;
}

interface MobileNavbarProps {
  globalData: GlobalData;
  optionalData?: Record<string, any>;
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({
  globalData,
  optionalData,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const menuData: MenuItem[] = globalData?.main_menu?.menu || [];

  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', isMobileMenuOpen);
    return () => document.body.classList.remove('overflow-hidden');
  }, [isMobileMenuOpen]);

  const toggleMenu = (menuTitle?: string) => {
    if (menuTitle) {
      setExpandedMenu(prev => (prev === menuTitle ? null : menuTitle));
    } else {
      setIsMobileMenuOpen(prev => !prev);
      if (isMobileMenuOpen) setExpandedMenu(null);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
        setExpandedMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <div
        className="relative lg:hidden z-40 bg-page-bg"
        ref={menuRef}>
        <div className="flex justify-between items-center container py-3">
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}>
            <div className="w-[66px] h-[82.5px] relative">
              <Image
                src="/logo.png"
                alt="Logo"
                title="logo"
                fill
                className="object-contain"
              />
            </div>
          </Link>

          <div className="flex items-center gap-5">
            <SmartSearch optionalData={optionalData ?? {}} />

            {globalData.phone && (
              <a
                href={`https://wa.me/${globalData.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary">
                <svg
                  className="icon"
                  width="24"
                  height="24">
                  <use
                    xlinkHref="/icons.svg#whatsapp"
                    fill="currentColor"
                  />
                </svg>
              </a>
            )}

            <button
              onClick={() => toggleMenu()}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              className="text-primary text-2xl focus:outline-none">
              {isMobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-page-bg shadow-lg z-40 max-h-[calc(100vh-86px)] overflow-y-auto">
            <div className="container pb-10 pt-3 text-headings">
              <ul className="space-y-4">
                {menuData.map(menu => (
                  <li key={menu.id}>
                    {menu.children?.length ? (
                      <>
                        <button
                          onClick={() => toggleMenu(menu.item_title)}
                          className="w-full flex justify-between items-center text-left font-bold hover:text-primary">
                          {menu.item_title}
                          <span className="h-5 w-5 bg-primary/20 rounded-full flex items-center justify-center transition-transform duration-300">
                            {expandedMenu === menu.item_title ? '-' : '+'}
                          </span>
                        </button>
                        {expandedMenu === menu.item_title && (
                          <ul className="ml-2 mt-2 space-y-2">
                            {menu.children.map(child => (
                              <li key={child.id}>
                                <Link
                                  href={`/${
                                    child.url_segment || child.item_slug
                                  }`}
                                  className="text-sm hover:text-primary block py-1 pl-2"
                                  onClick={() => setIsMobileMenuOpen(false)}>
                                  {child.item_title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : (
                      <Link
                        href={`/${menu.item_slug}`}
                        className="w-full block text-left font-bold hover:text-primary"
                        onClick={() => setIsMobileMenuOpen(false)}>
                        {menu.item_title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>

              <div className="mt-10 py-2 border-y-[1.5px] border-primary border-dashed">
                {globalData.email && (
                  <div className="flex gap-2 items-center mt-3 text-sm">
                    <svg
                      className="icon text-primary shrink-0"
                      width="18"
                      height="18">
                      <use
                        xlinkHref="/icons.svg#sidepannel-mail"
                        fill="currentColor"
                      />
                    </svg>
                    {globalData.email}
                  </div>
                )}
                {globalData.phone && (
                  <div className="flex gap-2 items-center mt-3 text-sm">
                    <svg
                      className="icon text-primary shrink-0"
                      width="18"
                      height="18">
                      <use
                        xlinkHref="/icons.svg#sidepannel-phone"
                        fill="currentColor"
                      />
                    </svg>
                    {globalData.phone}
                  </div>
                )}
                {globalData.address && (
                  <div className="flex gap-2 items-start mt-3 text-sm">
                    <svg
                      className="icon text-primary shrink-0 mt-1"
                      width="18"
                      height="18">
                      <use
                        xlinkHref="/icons.svg#sidepannel-location"
                        fill="currentColor"
                      />
                    </svg>
                    <span>{globalData.address}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-20 lg:hidden"></div>
      )}
    </>
  );
};

export default MobileNavbar;
