import React from 'react';

import BulletPoint from 'components/button/BulletPoint';
import BoxRow from 'components/overall-statistics/table/BoxCustomer';

const clinics = [
  {
    clinic_name: 'Tên cơ sở',
    revenue: '100.000',
    clinic_avatar: '',
  },
  {
    clinic_name: 'Tên cơ sở',
    revenue: '100.000',
    clinic_avatar: '',
  },
  {
    clinic_name: 'Tên cơ sở',
    revenue: '100.000',
    clinic_avatar: '',
  },
  {
    clinic_name: 'Tên cơ sở',
    revenue: '100.000',
    clinic_avatar: '',
  },
  {
    clinic_name: 'Tên cơ sở',
    revenue: '100.000',
    clinic_avatar: '',
  },
];

const TableClinicBookings = () => {
  //   const { data } = props;
  return (
    <div className="p-[16px] flex flex-col gap-[16px] bg-white rounded-[8px]">
      <div>
        <div className="w-full bg-[#E9EBED] h-[36px] px-[12px] py-[8px] flex justify-between text-[10px] text-[#1F1F1F] font-[600] leading-[16px] tracking-[1.5px] items-center">
          <p>STT</p>
          <p>Cơ sở</p>
          <p className="w-[120px]">Tổng số bookings</p>
        </div>
        <div>
          {clinics.map((clinic, index) => {
            return (
              <BoxRow
                key={index}
                avatar={clinic.clinic_avatar}
                name={clinic.clinic_name}
                index={index + 1}
                money={clinic.revenue}
                currency={'bookings'}
              />
            );
          })}
        </div>
      </div>
      <div className="mt-[16px] flex gap-[16px]">
        <BulletPoint
          text={'Tổng số bookings'}
          enable={true}
        />
        <BulletPoint
          text={'Mới'}
          color={'#A3ABF5'}
          enable={false}
        />
        <BulletPoint
          text={'Cũ'}
          color={'#F2BBC9'}
          enable={false}
        />
      </div>
    </div>
  );
};

export default TableClinicBookings;
