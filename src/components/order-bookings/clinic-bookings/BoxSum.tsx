import React from 'react';

interface BoxSum {
  title: string;
  number: any;
  currency: string;
  colorNumber?: string;
}

const BoxSum = (props: BoxSum) => {
  const { title, number, currency, colorNumber = '#36383A' } = props;
  return (
    <div className="bg-white rounded-[8px] w-full py-[8px] px-[16px] flex flex-col">
      <div className="text-[10px] text-[#36383A] font-[400] leading-[16px] tracking-[1.5px]">
        {title}
      </div>
      <div
        className={`text-[24px] font-[600] leading-[36px] flex items-center justify-between`}
        style={{ color: `${colorNumber}` }}>
        {number}
        <p className="text-[24px] leading-[36px] tracking-[0.5px]">
          {currency}
        </p>
      </div>
    </div>
  );
};

export default BoxSum;
