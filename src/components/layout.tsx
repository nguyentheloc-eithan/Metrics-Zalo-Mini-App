import React, { FC } from 'react';
import { Route, Routes } from 'react-router';
import { Box } from 'zmp-ui';
import { Navigation } from './navigation';
import HomePage from 'pages/index';
import CategoryPage from 'pages/category';
import CartPage from 'pages/cart';
import NotificationPage from 'pages/notification';
import ProfilePage from 'pages/profile';
import SearchPage from 'pages/search';
import { getSystemInfo } from 'zmp-sdk';
import { ScrollRestoration } from './scroll-restoration';
import OverallStatistics from 'pages/index/overal-statistics';
import RevenuePage from 'pages/revenue';

if (getSystemInfo().platform === 'android') {
  const androidSafeTop = Math.round(
    (window as any).ZaloJavaScriptInterface.getStatusBarHeight() /
      window.devicePixelRatio
  );
  document.body.style.setProperty(
    '--zaui-safe-area-inset-top',
    `${androidSafeTop}px`
  );
}

export const Layout: FC = () => {
  return (
    <Box
      flex
      flexDirection="column"
      className="h-screen">
      <Box className="flex-1 flex flex-col overflow-hidden">
        <Routes>
          <Route
            path="/"
            element={<HomePage />}></Route>
          <Route
            path="/overall-statistics"
            element={<OverallStatistics />}></Route>
          <Route
            path="/revenue"
            element={<RevenuePage />}></Route>
          <Route
            path="/profile"
            element={<ProfilePage />}></Route>
        </Routes>
      </Box>
      <Navigation />
    </Box>
  );
};
