import React from 'react';
import { Avatar } from 'zmp-ui';
interface BoxCustomerParams {
  name: string;
  index: number;
  avatar?: any;
  money?: any;
}
const BoxCustomer = (props: BoxCustomerParams) => {
  const { name, index, avatar, money } = props;
  return (
    <div
      className={`w-full h-[40px] flex items-center px-[12px] py-[8px] lex justify-around text-[10px] text-[#36383A] font-[400] leading-[16px] border-b-[0.5px] border-b-[#E9EBED]`}>
      <div>{index}</div>
      <div
        className={`w-[142px] flex items-center  ${
          avatar ? 'justify-center' : ''
        } gap-[6px]`}>
        {avatar ? <Avatar size={24} /> : null}
        <div>{name}</div>
      </div>
      <div className="w-[100px] flex justify-between">
        <div>{money}</div>
        <div>đ</div>
      </div>
    </div>
  );
};

export default BoxCustomer;
