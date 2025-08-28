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
  mobile?: string;
  phone?: string;
  email?: string;
  address?: string;
}

interface OptionalData {
  [key: string]: any;
}

interface MobileNavbarProps {
  globalData: GlobalData;
  optionalData: OptionalData;
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({
  globalData,
  optionalData,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMainMenu, setExpandedMainMenu] = useState<string | null>(null);
  const [expandedSubMenu, setExpandedSubMenu] = useState<
    Record<string, string | null>
  >({});
  const [showSearch, setShowSearch] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const searchOverlayRef = useRef<HTMLDivElement>(null);

  const menuData: MenuItem[] = globalData?.main_menu?.menu || [];

  useEffect(() => {
    if (showSearch || isMobileMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => document.body.classList.remove('overflow-hidden');
  }, [showSearch, isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
    if (isMobileMenuOpen) {
      setExpandedMainMenu(null);
      setExpandedSubMenu({});
    }
  };

  const toggleMainAccordion = (menuTitle: string) => {
    setExpandedMainMenu(prev => (prev === menuTitle ? null : menuTitle));
    if (expandedMainMenu !== menuTitle) {
      setExpandedSubMenu({});
    }
  };

  const toggleSubAccordion = (mainMenuTitle: string, subMenuTitle: string) => {
    setExpandedSubMenu(prev => ({
      ...prev,
      [mainMenuTitle]:
        prev[mainMenuTitle] === subMenuTitle ? null : subMenuTitle,
    }));
  };

  const handleCloseSearch = () => setShowSearch(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
        setExpandedMainMenu(null);
        setExpandedSubMenu({});
      }
      if (
        searchOverlayRef.current &&
        !searchOverlayRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest('.quick-search')
      ) {
        setShowSearch(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      className="relative lg:hidden"
      ref={menuRef}>
      <div className="moblie-nav flex justify-between items-center container py-3">
        <div className="logo">
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}>
            <Image
              src="/logo.png"
              alt="Logo"
              width={88}
              height={110}
              className="logo"
            />
          </Link>
        </div>

        <div className="quick-access flex items-center gap-5">
          <div
            className="quick-search cursor-pointer"
            onClick={() => setShowSearch(true)}>
            <svg
              className="icon text-primary"
              width="22"
              height="22">
              <use
                xlinkHref="/icons.svg#search"
                fill="currentColor"
              />
            </svg>
          </div>

          {globalData.phone && (
            <a
              href={`https://wa.me/${globalData.phone}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Chat with us on WhatsApp at ${globalData.phone}`}
              className="quick-contact flex items-center gap-2">
              <svg
                className="icon text-primary"
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
            onClick={toggleMobileMenu}
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
        <div className="main-menu absolute top-full left-0 w-full bg-page-bg shadow-lg z-40 max-h-[calc(100vh-86px)] overflow-y-auto">
          <div className="container pb-10 pt-3 text-headings">
            <ul className="space-y-4">
              {menuData.map(menu => {
                const hasChildren = (menu.children || []).length > 0;
                if (!hasChildren) {
                  return (
                    <li key={menu.id}>
                      <Link
                        href={`/${menu.item_slug}`}
                        className="w-full block text-left font-bold hover:text-primary"
                        onClick={() => setIsMobileMenuOpen(false)}>
                        {menu.item_title}
                      </Link>
                    </li>
                  );
                }

                const isMega = (menu.children || []).some(
                  child => (child.children || []).length > 0
                );

                return (
                  <li key={menu.id}>
                    <button
                      onClick={() => toggleMainAccordion(menu.item_title)}
                      className="w-full flex justify-between items-center text-left font-bold hover:text-primary">
                      {menu.item_title}
                      <span className="h-5 w-5 bg-primary/20 hover:bg-primary/20 text-sm rounded-full flex items-center justify-center transition-transform duration-300">
                        {expandedMainMenu === menu.item_title ? '-' : '+'}
                      </span>
                    </button>

                    {expandedMainMenu === menu.item_title && (
                      <ul className="ml-2 mt-2 space-y-2">
                        {(menu.children || []).map(category => {
                          if (isMega) {
                            return (
                              <li key={category.id}>
                                <button
                                  onClick={() =>
                                    toggleSubAccordion(
                                      menu.item_title,
                                      category.item_title
                                    )
                                  }
                                  className="font-semibold w-full flex justify-between items-center text-left hover:text-primary pl-2">
                                  {category.item_title}
                                  <span className="h-5 w-5 bg-primary/20 hover:bg-primary/20 text-sm rounded-full flex items-center justify-center transition-transform duration-300">
                                    {expandedSubMenu[menu.item_title] ===
                                    category.item_title
                                      ? '-'
                                      : '+'}
                                  </span>
                                </button>

                                {expandedSubMenu[menu.item_title] ===
                                  category.item_title && (
                                  <ul className="ml-4 space-y-1 mt-1 pl-2">
                                    {(category.children || []).map(item => (
                                      <li key={item.id}>
                                        <Link
                                          href={`/${item.url_segment}`}
                                          className="text-sm hover:text-primary block py-1"
                                          onClick={() =>
                                            setIsMobileMenuOpen(false)
                                          }>
                                          {item.item_title}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </li>
                            );
                          }

                          return (
                            <li key={category.id}>
                              <Link
                                href={`/${category.url_segment}`}
                                className="text-sm hover:text-primary block py-1 pl-2"
                                onClick={() => setIsMobileMenuOpen(false)}>
                                {category.item_title}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="contact-us-section mt-10 py-2 border-y-[1.5px] border-primary border-dashed">
              {globalData.email && (
                <div className="email flex gap-2 items-center mt-3 text-sm">
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
                <div className="phone-number flex gap-2 items-center mt-3 text-sm">
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
                <div className="company-address flex gap-2 items-start mt-3 text-sm">
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

      {showSearch && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 flex justify-center items-start pt-24"
          onClick={handleCloseSearch}>
          <div
            className="relative container z-10 w-full"
            ref={searchOverlayRef}
            onClick={e => e.stopPropagation()}>
            <SmartSearch
              optionalData={optionalData}
              onClose={handleCloseSearch}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNavbar;
