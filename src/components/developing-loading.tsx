import Lottie from 'lottie-react';
import React from 'react';
import devLoading from '../static/lottie/dev_ing.json';
const DevelopingLoading = () => {
  return (
    <div className="w-full h-full bg-white flex flex-col items-center justify-center">
      <Lottie
        animationData={devLoading}
        loop={true}
        className="w-[380px] h-[380px]  object-contain"
      />
      <div>Tính năng đang được phát triển</div>
    </div>
  );
};

export default DevelopingLoading;
