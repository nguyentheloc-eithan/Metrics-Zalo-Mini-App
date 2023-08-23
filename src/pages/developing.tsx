import React from 'react';
import { Header } from 'zmp-ui';

const Developing = () => {
  return (
    <div>
      <Header
        className="app-header no-border pl-4 flex-none pb-[6px] font-[500] leading-[26px] text-[20px] tracking-[0.15px]"
        showBackIcon={true}
        title="Order & bookings"
      />
      <div className="flex items-center justify-center h-[100vh] w-full bg-white">
        Tính năng đang phát triển
      </div>
    </div>
  );
};

export default Developing;
