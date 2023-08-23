import { useVirtualKeyboardVisible } from 'hooks';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router';

import { BottomNavigation, Icon, useNavigate } from 'zmp-ui';

const navItems = [
  {
    path: '/overall-statistics',
    label: 'Tổng quan',
    icon: <Icon icon="zi-more-grid" />,
  },
  {
    path: '/dev',
    label: 'Khách',
    icon: <Icon icon="zi-group" />,
  },
  {
    path: '/dev',
    label: 'Thông báo',
    icon: <Icon icon="zi-notif" />,
  },
  {
    path: '/dev',
    label: 'Cá nhân',
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
