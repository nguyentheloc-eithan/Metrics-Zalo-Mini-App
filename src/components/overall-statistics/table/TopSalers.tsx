import React from 'react';
import BoxCustomer from './BoxCustomer';
const customerTop5 = [
  {
    name: 'Ten khach hang',
    money: '100.000.000',
  },
  {
    name: 'Ten khach hang',
    money: '100.000.000',
  },
  {
    name: 'Ten khach hang',
    money: '100.000.000',
  },
  {
    name: 'Ten khach hang',
    money: '100.000.000',
  },
  {
    name: 'Ten khach hang',
    money: '100.000.000',
  },
];

const TopSalers = () => {
  return (
    <div className="p-[16px] flex flex-col gap-[16px] bg-white rounded-[8px]">
      <div className="text-[14px] font-[700] leading-[20px] tracking-[0.1px]">
        Top 5 Salers
      </div>
      <div>
        <div className="w-full bg-[#E9EBED] h-[36px] px-[12px] py-[8px] flex justify-around text-[10px] text-[#1F1F1F] font-[600] leading-[16px] tracking-[1.5px] items-center">
          <p>STT</p>
          <p>Khách hàng</p>
          <p>Doanh thu</p>
        </div>
        <div>
          {customerTop5.map((customer, index) => {
            return (
              <BoxCustomer
                name={customer.name}
                index={index + 1}
                money={customer.money}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TopSalers;
