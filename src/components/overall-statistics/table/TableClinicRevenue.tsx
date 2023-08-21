import React from 'react';
import BoxCustomer from './BoxCustomer';
import BulletPoint from 'components/button/BulletPoint';
const clinics = [
  {
    name: 'Tên cơ sở',
    money: '100.000.000',
  },
  {
    name: 'Tên cơ sở',
    money: '100.000.000',
  },
  {
    name: 'Tên cơ sở',
    money: '100.000.000',
  },
  {
    name: 'Tên cơ sở',
    money: '100.000.000',
  },
  {
    name: 'Tên cơ sở',
    money: '100.000.000',
  },
];

const TableClinicRevenue = () => {
  return (
    <div className="p-[16px] flex flex-col gap-[16px] bg-white rounded-[8px]">
      <div>
        <div className="w-full bg-[#E9EBED] h-[36px] px-[12px] py-[8px] flex justify-between text-[10px] text-[#1F1F1F] font-[600] leading-[16px] tracking-[1.5px] items-center">
          <p>STT</p>
          <p>Cơ sở</p>
          <p className="w-[100px]">Doanh thu</p>
        </div>
        <div>
          {clinics.map((customer, index) => {
            return (
              <BoxCustomer
                avatar={'s'}
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

export default TableClinicRevenue;
