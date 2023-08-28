import DevelopingLoading from 'components/developing-loading';
import Lottie from 'lottie-react';
import React from 'react';
import { Header } from 'zmp-ui';
import noti from '../../static/lottie/noti.json';
const Notifications = () => {
  return (
    <div className="h-full">
      <Header
        className="app-header no-border pl-4 flex-none pb-[6px] font-[500] leading-[26px] text-[20px] tracking-[0.15px]"
        showBackIcon={false}
        title="Thông báo"
      />
      <div className="w-full h-full bg-white flex flex-col items-center justify-center">
        <Lottie
          animationData={noti}
          loop={true}
          className="w-[380px] h-[380px]  object-contain"
        />
        <div>Chưa có thông báo mới. Vui lòng quay lại sau.</div>
      </div>
    </div>
  );
};

export default Notifications;
