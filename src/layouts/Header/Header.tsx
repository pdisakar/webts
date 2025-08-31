import React from 'react';
import DesktopNavbar from './DesktopNavbar';
import MobileNavbar from './MobileNavbar';
import Notification from '../Notification/Notification';

interface MenuItem {
  id: string | number;
  item_title: string;
  item_slug?: string;
  url_segment?: string;
  children?: MenuItem[];
}

interface GlobalDataContent {
  notification?: string;
  main_menu?: {
    menu: MenuItem[];
  };
  mobile?: string;
  phone?: string;
  email?: string;
  address?: string;
}

interface OptionalDataContent {
  [key: string]: any;
}

interface GlobalData {
  data: GlobalDataContent;
}

interface OptionalData {
  data: OptionalDataContent;
}

interface HeaderProps {
  globalData: GlobalData;
  optionalData: OptionalData;
}

const Header: React.FC<HeaderProps> = ({ globalData, optionalData }) => {
  return (
    <div
      className="header relative bg-page-bg"
      id="header">
      <div className="desktop-header hidden lg:block">
        <Notification message={globalData?.data?.notification} />

        <DesktopNavbar
          globalData={globalData}
          optionalData={optionalData}
        />
      </div>

      <div className="mobile-header lg:hidden">
        <MobileNavbar
          globalData={globalData}
          optionalData={optionalData}
        />
      </div>
    </div>
  );
};

export default Header;
