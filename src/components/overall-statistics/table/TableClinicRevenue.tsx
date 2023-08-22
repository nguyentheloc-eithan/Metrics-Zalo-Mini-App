import React from 'react';

import BulletPoint from 'components/button/BulletPoint';
import { ClinicsRevenueFetch } from '../ClinicRevenue';
import BoxRow from './BoxCustomer';

interface TableClinicRevenueProps {
  data: ClinicsRevenueFetch[];
}
const TableClinicRevenue = (props: TableClinicRevenueProps) => {
  const { data } = props;
  return (
    <div className="p-[16px] flex flex-col gap-[16px] bg-white rounded-[8px]">
      <div>
        <div className="w-full bg-[#E9EBED] h-[36px] px-[12px] py-[8px] flex justify-between text-[10px] text-[#1F1F1F] font-[600] leading-[16px] tracking-[1.5px] items-center">
          <p className="flex flex-start">STT</p>
          <p className="flex flex-start w-[100px]">Cơ sở</p>
          <p className="w-[100px]">Doanh thu</p>
        </div>
        <div>
          {data.map((clinic, index) => {
            return (
              <BoxRow
                key={index}
                avatar={clinic.clinic_avatar}
                name={clinic.clinic_name}
                index={index + 1}
                money={clinic.revenue}
                currency={'đ'}
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
