import useFetchClinic from 'common/stores/clinics/clinic-revenue';
import ButtonIcon from 'components/button/ButtonIcon';
import ClinicBookings from 'components/order-bookings/clinic-bookings';
import BoxSum from 'components/order-bookings/clinic-bookings/BoxSum';
import ClinicOrders from 'components/order-bookings/clinic-orders';
import ClinicRevenue from 'components/overall-statistics/ClinicRevenue';
import ServiceRevenue from 'components/overall-statistics/ServiceRevenue';
import BoxStatistics from 'components/overall-statistics/box-statistics';

import TopCustomers from 'components/overall-statistics/table/TopCustomers';
import TopSalers from 'components/overall-statistics/table/TopSalers';
import React, { useState } from 'react';
import { Header } from 'zmp-ui';

const dateRanges = ['Hôm nay', 'Tuần này', 'Tháng này'];
interface DataCategories {
  type: string;
  value: number;
  revenue: number;
}
interface DataServices {
  value: number;
  type: string;
  revenue: number;
  service_image: string;
}
const OrderBookings = () => {
  return (
    <>
      <Header
        className="app-header no-border pl-4 flex-none pb-[6px] font-[500] leading-[26px] text-[20px] tracking-[0.15px]"
        showBackIcon={true}
        title="Order & bookings"
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
          <div className="flex gap-[8px]">
            <BoxStatistics
              title={'Tổng số order mới'}
              number={100}
              current={'Orders'}
            />
            <BoxStatistics
              title={'Có thanh toán'}
              number={45}
              current={'orders'}
              colorNumber={'#5A68ED'}
            />
          </div>

          <div className="flex gap-[8px]">
            <BoxStatistics
              title={'Không có thanh toán'}
              colorNumber={'#D8315B'}
              number={21}
              current={'orders'}
            />
            <BoxStatistics
              title={'Upsale'}
              number={34}
              colorNumber={'#34B764'}
              current={'orders'}
            />
          </div>
        </div>
        <ClinicOrders />
        <BoxSum
          title={'Tổng số bookings'}
          number={550}
          currency={'bookings'}
        />
        <ClinicBookings />
        {/* <TopSalers /> */}
      </div>
    </>
  );
};

export default OrderBookings;

export type { DataCategories, DataServices };
