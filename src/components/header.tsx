import React from 'react';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { getConfig } from 'utils/config';
import { Header } from 'zmp-ui';

function AppHeader() {
  const location = useLocation();
  const pathname = location.pathname.split('/')[1];

  const title = useMemo(() => {
    if (pathname === 'postdetail') {
      return 'Bài viết';
    }

    return getConfig((c) => c.app.title);
  }, [location.pathname]);

  return (
    <>
      <Header
        className="sticky top-0"
        title={title}
        style={{
          backgroundColor: getConfig((c) => c.app.statusBarColor),
        }}
        showBackIcon={location.pathname !== '/'}
      />
    </>
  );
}

export default AppHeader;
