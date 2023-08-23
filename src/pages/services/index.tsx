import useFetchClinicBookings from 'common/stores/clinics/clinic-bookings';
import useFetchClinicOrders from 'common/stores/clinics/clinic-orders';
import ButtonIcon from 'components/button/ButtonIcon';
import CustomerClinics from 'components/customers/customer-clinics';

import BoxStatistics from 'components/overall-statistics/box-statistics';

import React, { useEffect, useState } from 'react';
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
interface ClinicOrdersParams {
  orders: any;
  paid: number;
  unpaid: number;
  upsale: number;
}
interface ClinicBookingsParams {
  clinic_name: string;
  bookings: any;
  new: number;
  old: number;
}
const Customer = () => {
  const { clinicOrders } = useFetchClinicOrders();
  const { clinicBookings } = useFetchClinicBookings();

  const [totalOrders, setTotalOrders] = useState<number>();
  const [totalPaids, setTotalPaids] = useState<number>();
  const [totalUnpaids, setTotalUnpaids] = useState<number>();
  const [totalUpsales, setTotalUpsales] = useState<number>(0);
  const [totalBookings, setTotalBookings] = useState<number>(0);
  useEffect(() => {
    const fetchClinicOrdersStatistic = async () => {
      try {
        const dataOverall: ClinicOrdersParams[] = clinicOrders.map(
          (item: any) => {
            return {
              orders: item.clinic_data.paid + item.clinic_data.unpaid,
              paid: item.clinic_data.paid,
              unpaid: item.clinic_data.unpaid,
              upsale: item.clinic_data.upsale,
            };
          }
        );
        const totalOrder: number = dataOverall.reduce(
          (prev: any, cur: any) => prev + cur.orders,
          0
        );
        const totalPaid: number = dataOverall.reduce(
          (prev: any, cur: any) => prev + cur.paid,
          0
        );
        const totalUnpaid: number = dataOverall.reduce(
          (prev: any, cur: any) => prev + cur.unpaid,
          0
        );
        const totalUpsale: number = dataOverall.reduce(
          (prev: any, cur: any) => prev + cur.upsale,
          0
        );

        setTotalOrders(totalOrder);
        setTotalPaids(totalPaid);
        setTotalUnpaids(totalUnpaid);

        setTotalUpsales(totalUpsale);
      } finally {
      }
    };
    fetchClinicOrdersStatistic();
  }, [clinicOrders]);

  useEffect(() => {
    const filterStatisticBookings = () => {
      try {
        const dataBookings: ClinicBookingsParams[] = clinicBookings.map(
          (item: any) => {
            return {
              clinic_name: item.clinic_data.clinic_name,
              bookings: item.clinic_data.new + item.clinic_data.old,
              new: item.clinic_data.new,
              old: item.clinic_data.old,
            };
          }
        );

        const sumBookings: number = dataBookings.reduce(
          (prev: any, cur: any) => prev + cur.bookings,
          0
        );
        setTotalBookings(sumBookings);
      } finally {
      }
    };
    filterStatisticBookings();
  }, [clinicBookings]);

  return (
    <>
      <Header
        className="app-header no-border pl-4 flex-none pb-[6px] font-[500] leading-[26px] text-[20px] tracking-[0.15px]"
        showBackIcon={true}
        title="Khách hàng"
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
            title={'Tổng số khách hiện tại'}
            number={76000}
            current={'khách'}
          />

          <div className="flex gap-[8px]">
            <BoxStatistics
              title={'Có số điện thoại'}
              number={36000}
              current={'khách'}
            />
            <BoxStatistics
              title={'Không có số điện thoại'}
              number={2550}
              colorNumber={'#5A68ED'}
              current={'khách'}
            />
          </div>
        </div>

        <CustomerClinics />
        {/* <TopSalers /> */}
      </div>
    </>
  );
};

export default Customer;

export type { DataCategories, DataServices };
