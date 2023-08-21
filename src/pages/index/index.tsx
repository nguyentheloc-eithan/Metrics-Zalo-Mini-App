import React from 'react';
import { Box, Page } from 'zmp-ui';
import { Welcome } from './welcome';
import Lottie from 'lottie-react';
import lottie from '../../static/lottie/animation_llkpplro.json';

const HomePage: React.FunctionComponent = () => {
  return (
    <Page className="relative flex-1 flex flex-col bg-white">
      <Welcome />

      <Box className="flex-1 overflow-auto">
        <div className="flex items-center flex-col justify-center">
          <Lottie
            animationData={lottie}
            loop={true}
            className="w-[343px] mt-[60px] h-[343px] object-contain"
          />
          <a href="/overall-statistics">
            <button className="bg-[#36383A] mt-[120px] h-[44px] rounded-[8px] w-[343px] px-[24px] text-[14px] font-[700] leading-[20px] tracking-[1.25px] py-[12px] text-[white]">
              Đăng nhập bằng Zalo
            </button>
          </a>
          <div className="text-[14px] font-[700] mt-[8px] text-[#36383A] leading-[20px] tracking-[0.1px]">
            Bạn chưa có tài khoản?{' '}
            <span className="text-[#BC2449]"> Liên hệ với Admin.</span>
          </div>
        </div>
        <div className="flex w-full items-center justify-center mt-[60px]">
          <img
            src="https://ucarecdn.com/3a1ae635-d250-4910-a931-d47b2fd5ebc6/-/quality/smart/-/format/auto/"
            className="w-[103px]"
          />
        </div>
      </Box>
    </Page>
  );
};

export default HomePage;
