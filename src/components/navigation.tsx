import { useVirtualKeyboardVisible } from 'hooks';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router';
import { MenuItem } from 'types/menu';
import { BottomNavigation, Icon, useNavigate } from 'zmp-ui';
import { CartIcon } from './cart-icon';

const navItems = [
  {
    path: '/overall-statistics',
    label: 'Tổng quan',
    icon: <Icon icon="zi-more-grid" />,
  },
  {
    path: '/notification',
    label: 'Thông báo',
    icon: <Icon icon="zi-notif" />,
  },
  {
    path: '/aura',
    label: 'Thẻ Aura',
    icon: <Icon icon="zi-user-circle" />,
  },
];

export const Navigation: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('/');
  const pathname = location.pathname.split('/')[1];

  useEffect(() => {
    if (navItems.find((item) => item.path === location.pathname)) {
      setActiveTab(location.pathname);
    }
  }, [location]);

  const handleChangeRoute = (key) => {
    setActiveTab(key);
    navigate(key, { animate: false });
  };
  return (
    <>
      {location.pathname == '/overall-statistics' && (
        <>
          <BottomNavigation
            id="bottom-nav"
            activeKey={activeTab}
            onChange={(key) => handleChangeRoute(key)}>
            {navItems.map(({ path, label, icon }) => (
              <BottomNavigation.Item
                key={path}
                label={label}
                icon={icon}
              />
            ))}
          </BottomNavigation>
        </>
      )}
    </>
  );
};
