import React, { useEffect, useState } from 'react';

import useFetchTopTenServices from 'common/stores/services/top-ten-services';
import BulletPoint from 'components/button/BulletPoint';
import BoxRow from 'components/overall-statistics/table/BoxCustomer';

const TableTopTenServices = () => {
  const { topTenServices } = useFetchTopTenServices();

  const [isAllBookings, setIsAllBookings] = useState<boolean>(true);
  const [isNew, setIsNew] = useState<boolean>(false);
  const [isOld, setIsOld] = useState<boolean>(false);

  const [data, setData] = useState<any>([]);

  const handleClickBulletPoint = (type: string) => {
    if (type == 'allBookings') {
      if (isAllBookings) {
        setIsAllBookings(false);
      } else {
        setIsAllBookings(true);
        setIsNew(false);
        setIsOld(false);
      }
      return;
    } else if (type == 'new') {
      if (isNew) {
        setIsNew(false);
      } else {
        setIsAllBookings(false);
        setIsNew(true);
        setIsOld(false);
      }
      return;
    } else if (type == 'old') {
      if (isOld) {
        setIsOld(false);
      } else {
        setIsAllBookings(false);
        setIsNew(false);
        setIsOld(true);
      }
    }
  };
  return (
    <div className="p-[2px] flex flex-col gap-[16px] bg-white rounded-[8px]">
      <div>
        <div className="w-full bg-[#E9EBED] h-[36px] px-[12px] py-[8px] flex justify-between text-[10px] text-[#1F1F1F] font-[600] leading-[16px] tracking-[1.5px] items-center">
          <p>STT</p>
          <p>Dịch vụ</p>
          <p className="w-[12px]">doanh thu</p>
          <p className="w-[]">% so tổng</p>
        </div>
        <div>
          {topTenServices.map((service, index) => {
            return (
              <BoxRow
                classNameStatistic={`${
                  isOld
                    ? 'text-[#BC2449]'
                    : isNew
                    ? 'text-[#5A68ED]'
                    : 'text-[#36383A]'
                }`}
                key={index}
                avatar={service.service_image}
                name={service.service_name}
                index={index + 1}
                money={service.revenue}
                currency={'đ'}
              />
            );
          })}
        </div>
      </div>
      <div className="mt-[16px] flex gap-[16px]">
        <BulletPoint
          onClick={() => {
            handleClickBulletPoint('allBookings');
          }}
          text={'Tổng số bookings'}
          enable={isAllBookings}
        />
        <BulletPoint
          onClick={() => {
            handleClickBulletPoint('new');
          }}
          text={'Mới'}
          color={'#A3ABF5'}
          enable={isNew}
        />
        <BulletPoint
          text={'Cũ'}
          onClick={() => {
            handleClickBulletPoint('old');
          }}
          color={'#F2BBC9'}
          enable={isOld}
        />
      </div>
    </div>
  );
};

export default TableTopTenServices;
