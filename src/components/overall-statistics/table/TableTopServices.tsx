import React from 'react';
import BoxCustomer from './BoxCustomer';
import BulletPoint from 'components/button/BulletPoint';
const customerTop5 = [
  {
    name: 'Tên dịch vụ',
    money: '100.000.000',
  },
  {
    name: 'Tên dịch vụ',
    money: '100.000.000',
  },
  {
    name: 'Tên dịch vụ',
    money: '100.000.000',
  },
  {
    name: 'Tên dịch vụ',
    money: '100.000.000',
  },
  {
    name: 'Tên dịch vụ',
    money: '100.000.000',
  },
];

const TableTopCategories = () => {
  return (
    <div className="p-[16px] flex flex-col gap-[16px] bg-white rounded-[8px]">
      <div className="text-[14px] font-[700] leading-[20px] tracking-[0.1px]">
        Top 5 dịch vụ
      </div>
      <div>
        <div className="w-full bg-[#E9EBED] h-[36px] px-[12px] py-[8px] flex justify-around text-[10px] text-[#1F1F1F] font-[600] leading-[16px] tracking-[1.5px] items-center">
          <p>STT</p>
          <p>Dịch vụ</p>
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
        <div className="mt-[16px] flex gap-[16px]">
          <BulletPoint
            text={'Doanh thu'}
            enable={true}
          />
          <BulletPoint
            text={'Thực thu'}
            color={'#A3ABF5'}
            enable={false}
          />
          <BulletPoint
            text={'Công nợ'}
            color={'#F2BBC9'}
            enable={false}
          />
        </div>
      </div>
    </div>
  );
};

export default TableTopCategories;
