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

const MenuItemComponent: React.FC<{
  item: MenuItem;
  parentId: string | number;
  expandedMenus: Record<string | number, string | number | null>;
  toggleMenu: (id: string | number, parentId: string | number) => void;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  level?: number;
}> = ({
  item,
  parentId,
  expandedMenus,
  toggleMenu,
  setIsMobileMenuOpen,
  level = 1,
}) => {
  const isExpanded = expandedMenus[parentId] === item.id;
  const hasChildren = item.children && item.children.length > 0;
  const fontWeight =
    level === 1 ? 'font-bold' : level === 2 ? 'font-semibold' : 'font-medium';

  return (
    <li key={item.id}>
      {hasChildren && level < 3 ? (
        <>
          <button
            onClick={() => toggleMenu(item.id, parentId)}
            className={`w-full flex justify-between items-center text-left ${fontWeight} hover:text-primary`}>
            {item.item_title}
            <span className="h-5 w-5 bg-primary/20 rounded-full flex items-center justify-center transition-transform duration-500">
              {isExpanded ? '-' : '+'}
            </span>
          </button>
          {isExpanded && (
            <ul
              className={` ml-3 mt-2 space-y-2 overflow-hidden transition-all duration-500 ease-in-out ${
                isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              } `}>
              {item.children?.map(child => (
                <MenuItemComponent
                  key={child.id}
                  item={child}
                  parentId={item.id}
                  expandedMenus={expandedMenus}
                  toggleMenu={toggleMenu}
                  setIsMobileMenuOpen={setIsMobileMenuOpen}
                  level={level + 1}
                />
              ))}
            </ul>
          )}
        </>
      ) : (
        <Link
          href={`/${item.url_segment || item.item_slug || ''}`}
          className={`w-full block text-left ${fontWeight} hover:text-primary`}
          onClick={() => setIsMobileMenuOpen(false)}>
          {item.item_title}
        </Link>
      )}
    </li>
  );
};

const MobileNavbar: React.FC<MobileNavbarProps> = ({
  globalData,
  optionalData,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<
    Record<string | number, string | number | null>
  >({});
  const menuRef = useRef<HTMLDivElement>(null);

  const menuData: MenuItem[] = globalData?.main_menu?.menu || [];

  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', isMobileMenuOpen);
    return () => document.body.classList.remove('overflow-hidden');
  }, [isMobileMenuOpen]);

  const toggleMenu = (id: string | number, parentId: string | number) => {
    setExpandedMenus(prev => ({
      ...prev,
      [parentId]: prev[parentId] === id ? null : id,
    }));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
        setExpandedMenus({});
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

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
              onClick={() => {
                setIsMobileMenuOpen(prev => !prev);
                if (isMobileMenuOpen) setExpandedMenus({});
              }}
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

        <div
          className={`
            absolute top-full left-0 w-full bg-page-bg shadow-lg z-40
            overflow-y-auto transform transition-all duration-300 ease-in-out
            ${
              isMobileMenuOpen
                ? 'max-h-[calc(100vh-86px)] opacity-100'
                : 'max-h-0 opacity-0 pointer-events-none'
            }
          `}>
          <div className="container pb-10 pt-3 text-headings">
            <ul className="space-y-4">
              {menuData.map(menu => (
                <MenuItemComponent
                  key={menu.id}
                  item={menu}
                  parentId="root"
                  expandedMenus={expandedMenus}
                  toggleMenu={toggleMenu}
                  setIsMobileMenuOpen={setIsMobileMenuOpen}
                  level={1}
                />
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
      </div>

      <div
        className={`
          fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-20 lg:hidden
          transition-opacity duration-700 ease-in-out
          ${
            isMobileMenuOpen
              ? 'opacity-100 pointer-events-auto'
              : 'opacity-0 pointer-events-none'
          }
        `}
        onClick={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};

export default MobileNavbar;
