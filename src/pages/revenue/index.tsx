import ButtonIcon from 'components/button/ButtonIcon';
import ClinicRevenue from 'components/overall-statistics/ClinicRevenue';
import ServiceRevenue from 'components/overall-statistics/ServiceRevenue';
import BoxStatistics from 'components/overall-statistics/box-statistics';

import TopCustomers from 'components/overall-statistics/table/TopCustomers';
import TopSalers from 'components/overall-statistics/table/TopSalers';
import React, { useState } from 'react';
import { Header } from 'zmp-ui';

const dateRanges = ['Hôm nay', 'Tuần này', 'Tháng này'];

const RevenuePage = () => {
  return (
    <>
      <Header
        className="app-header no-border pl-4 flex-none pb-[6px] font-[500] leading-[26px] text-[20px] tracking-[0.15px]"
        showBackIcon={true}
        title="Doanh thu"
      />
      <div className="flex flex-col p-[16px] gap-[16px] overflow-y-scroll">
        <div className="flex items-center justify-between">
          <div className="w-full flex gap-[5px]">
            {dateRanges.map((range, index) => {
              return (
                <div
                  key={index}
                  className="bg-[white] rounded-[8px] text-[10px] text-[#36383A] font-[400] leading-[16px] flex items-center justify-center w- h-[24px] px-[12px] py-[4px]">
                  {range}
                </div>
              );
            })}
          </div>
          <div className="flex gap-[8px]">
            <ButtonIcon icon={'zi-location'} />
            <ButtonIcon icon={'zi-calendar'} />
          </div>
        </div>
        <div className="flex flex-col gap-[8px]">
          <BoxStatistics
            title={'Doanh Thu'}
            number={50000000}
          />
          <div className="flex gap-[8px]">
            <BoxStatistics
              title={'Thực thu'}
              colorNumber={'#5A68ED'}
              number={50000000}
            />
            <BoxStatistics
              title={'Công nợ'}
              number={50000000}
              colorNumber={'#D8315B'}
            />
          </div>
        </div>
        <>
          <ClinicRevenue />
        </>
        <ServiceRevenue />
        <TopCustomers />
        <TopSalers />
      </div>
    </>
  );
};

export default RevenuePage;
