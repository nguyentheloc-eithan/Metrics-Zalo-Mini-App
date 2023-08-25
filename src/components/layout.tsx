import HomePage from 'pages/index';
import React, { FC } from 'react';
import { Route, Routes } from 'react-router';
import { Box } from 'zmp-ui';
import { Navigation } from './navigation';

import ProfilePage from 'pages/profile';

import OverallStatistics from 'pages/index/overal-statistics';
import RevenuePage from 'pages/revenue';
import { getSystemInfo } from 'zmp-sdk';
import OrderBookings from 'pages/order-bookings';
import Developing from 'pages/developing';
import Customers from 'pages/customers';
import ServicesPage from 'pages/services';

// if (getSystemInfo().platform === 'android') {
//   const androidSafeTop = Math.round(
//     (window as any).ZaloJavaScriptInterface.getStatusBarHeight() /
//       window.devicePixelRatio
//   );
//   document.body.style.setProperty(
//     '--zaui-safe-area-inset-top',
//     `${androidSafeTop}px`
//   );
// }

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
            path="/dev"
            element={<Developing />}></Route>
          <Route
            path="/overall-statistics"
            element={<OverallStatistics />}></Route>
          <Route
            path="/revenue"
            element={<RevenuePage />}></Route>
          <Route
            path="/services"
            element={<ServicesPage />}></Route>
          <Route
            path="/order-bookings"
            element={<OrderBookings />}></Route>
          <Route
            path="/customers"
            element={<Customers />}></Route>
          <Route
            path="/profile"
            element={<ProfilePage />}></Route>
        </Routes>
      </Box>
      <Navigation />
    </Box>
  );
};
