import React, { useState } from 'react';

import useFetchCustomers from 'common/stores/customers/customers';
import BulletPoint from 'components/button/BulletPoint';
import BoxRow from 'components/overall-statistics/table/BoxCustomer';

const TableStaffStatistics = () => {
  const { customers } = useFetchCustomers();

  const [isRight, setIsRight] = useState<boolean>(true);
  const [isWrong, setIsWrong] = useState<boolean>(false);

  const handleClickBulletPoint = (type: string) => {
    if (type == 'allCustomers') {
      if (isRight) {
        setIsRight(false);
      } else {
        setIsRight(true);
        setIsWrong(false);
      }
      return;
    } else if (type == 'newCustomers') {
      if (isWrong) {
        setIsWrong(false);
      } else {
        setIsWrong(true);
        setIsRight(false);
      }
      return;
    }
  };
  return (
    <div className="p-[16px] flex flex-col gap-[16px] bg-white rounded-[8px]">
      <div>
        <div className="w-full bg-[#E9EBED] h-[36px] px-[12px] py-[8px] flex justify-between text-[10px] text-[#1F1F1F] font-[600] leading-[16px] tracking-[1.5px] items-center">
          <p>STT</p>
          <p>Cơ sở</p>
          <p className="w-[120px]">{isRight ? 'Tổng số K.Hàng' : 'Chấm sai'}</p>
        </div>
        <div>
          {customers.map((clinic, index) => {
            return (
              <BoxRow
                classNameStatistic={`${
                  isWrong ? 'text-[#5A68ED]' : 'text-[#36383A]'
                }`}
                key={index}
                avatar={clinic.clinic_avatar}
                name={clinic.clinic_name}
                index={index + 1}
                money={
                  isRight ? clinic.total : isWrong ? clinic.new : clinic.total
                }
                currency={'khách'}
              />
            );
          })}
        </div>
      </div>
      <div className="mt-[16px] flex gap-[16px]">
        <BulletPoint
          onClick={() => {
            handleClickBulletPoint('allCustomers');
          }}
          text={'Chấm đúng'}
          color={isRight ? '#34B764' : '#D1F5DE'}
          enable={isRight}
        />
        <BulletPoint
          onClick={() => {
            handleClickBulletPoint('newCustomers');
          }}
          text={'Chấm sai'}
          color={isWrong ? '#5A68ED' : '#A3ABF5'}
          enable={isWrong}
        />
        <BulletPoint
          text={'Không chấm'}
          color={isWrong ? '#D8315B' : '#F2BBC9'}
          enable={isWrong}
        />
      </div>
    </div>
  );
};

export default TableStaffStatistics;
