import HomePage from 'pages/index';
import React, { FC } from 'react';
import { Route, Routes } from 'react-router';
import { Box } from 'zmp-ui';
import { Navigation } from './navigation';

import Customers from 'pages/customers';
import CustomersNav from 'pages/page-in-nav/customer/customers-nav';
import Developing from 'pages/developing';
import OverallStatistics from 'pages/index/overal-statistics';

import OrderBookings from 'pages/order-bookings';
import Profile from 'pages/page-in-nav/profile/profile';
import RevenuePage from 'pages/revenue';
import SaleReportPage from 'pages/sale-report';
import ServicesPage from 'pages/services';
import StaffsPage from 'pages/staffs';
import UserSettings from 'pages/page-in-nav/profile/user-setting';
import Notifications from 'pages/page-in-nav/notification';
import NotAdmin from 'pages/index/not-admin';

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
            path="/profile"
            element={<Profile />}></Route>
          <Route
            path="/user-settings"
            element={<UserSettings />}></Route>
          <Route
            path="/notifications"
            element={<Notifications />}></Route>
          <Route
            path="/customers-nav"
            element={<CustomersNav />}></Route>
          <Route
            path="/dev"
            element={<Developing />}></Route>
          <Route
            path="/sale-report"
            element={<SaleReportPage />}></Route>
          <Route
            path="/overall-statistics"
            element={<OverallStatistics />}></Route>
          <Route
            path="/staffs"
            element={<StaffsPage />}></Route>
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
            path="/not-admin"
            element={<NotAdmin />}></Route>
        </Routes>
      </Box>
      <Navigation />
    </Box>
  );
};
