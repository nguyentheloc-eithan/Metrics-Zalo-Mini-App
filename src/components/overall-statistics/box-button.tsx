import React from 'react';
import { useNavigate } from 'zmp-ui';

interface BoxButtonParams {
  icon?: any;
  text: string;
  link: string;
}

const BoxButton = (params: BoxButtonParams) => {
  const navigate = useNavigate();
  const { icon, text, link } = params;
  return (
    <button
      onClick={() => {
        navigate(link);
      }}
      className="w-[164px] rounded-[8px] gap-[8px] h-[92px] flex flex-col items-center justify-center py-[16px] px-[8px] bg-[white]">
      {icon}

      <div className="text-[14px] text-[#36383A] font-[500] leading-[20px] tracking-[0.1px]">
        {text}
      </div>
    </button>
  );
};

export default BoxButton;
