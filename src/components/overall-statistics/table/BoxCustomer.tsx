import React from 'react';
import { formatMoney } from 'utils/money-format';
import { Avatar } from 'zmp-ui';
interface BoxCustomerParams {
  name: string;
  index: number;
  avatar?: any;
  money?: any;
  currency: string;
  classNameStatistic?: string;
}
const BoxRow = (props: BoxCustomerParams) => {
  const { name, index, avatar, money, currency, classNameStatistic } = props;

  return (
    <div
      className={`w-full h-[40px] flex items-center px-[12px] py-[8px] lex justify-around text-[10px] text-[#36383A] font-[400] leading-[16px] border-b-[0.5px] border-b-[#E9EBED]`}>
      <div>{index}</div>
      <div
        className={`w-[122px] flex items-center  ${
          avatar ? 'justify-start ml-[10px]' : ''
        } gap-[6px]`}>
        {avatar ? (
          <Avatar
            size={24}
            src={avatar}
          />
        ) : null}
        <div>{name}</div>
      </div>
      <div className={`w-[100px] flex justify-between ${classNameStatistic}`}>
        <div>{formatMoney(money)}</div>
        <div>{currency}</div>
      </div>
    </div>
  );
};

export default BoxRow;
