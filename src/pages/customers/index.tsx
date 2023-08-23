import useFetchClinicBookings from 'common/stores/clinics/clinic-bookings';
import useFetchClinicOrders from 'common/stores/clinics/clinic-orders';
import useFetchClinicCustomers from 'common/stores/customers/customer-clinics';
import ButtonIcon from 'components/button/ButtonIcon';
import CustomerClinics from 'components/customers/customer-clinics';
import ClinicBookings from 'components/order-bookings/clinic-bookings';
import BoxSum from 'components/order-bookings/clinic-bookings/BoxSum';
import ClinicOrders from 'components/order-bookings/clinic-orders';

import BoxStatistics from 'components/overall-statistics/box-statistics';

import React, { useEffect, useState } from 'react';
import { Header } from 'zmp-ui';

const dateRanges = ['Hôm nay', 'Tuần này', 'Tháng này'];

interface ClinicCustomersParams {
  clinic_name: string;
  user_phone: number;
  total: number;
  new: number;
}
const Customer = () => {
  const { clinicOrders } = useFetchClinicOrders();
  const { clinicCustomers, setClinicCustomers } = useFetchClinicCustomers();

  const [totalCustomers, setTotalCustomers] = useState<number>();
  const [totalNewCustomers, setTotalNewCustomers] = useState<number>();
  const [totalUserPhones, setTotalUserPhones] = useState<number>(0);
  useEffect(() => {
    const fetchClinicOrdersStatistic = async () => {
      try {
        const dataNew = clinicCustomers.filter((item: any) => {
          return item.clinic_data.clinic_name;
        });
        setClinicCustomers(dataNew);
        const dataOverall: ClinicCustomersParams[] = dataNew.map(
          (item: any) => {
            return {
              clinic_name: item.clinic_data.name,
              new: item.clinic_data.new,
              total: item.clinic_data.total,
              user_phone: item.clinic_data.user_phone,
            };
          }
        );
        const totalNew: number = dataOverall.reduce(
          (prev: any, cur: any) => prev + cur.new,
          0
        );
        const totalTotal: number = dataOverall.reduce(
          (prev: any, cur: any) => prev + cur.total,
          0
        );
        const totalUserPhone: number = dataOverall.reduce(
          (prev: any, cur: any) => prev + cur.user_phone,
          0
        );

        setTotalCustomers(totalTotal);
        setTotalNewCustomers(totalNew);
        setTotalUserPhones(totalUserPhone);
      } finally {
      }
    };
    fetchClinicOrdersStatistic();
  }, [clinicOrders]);

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
            number={totalCustomers}
            current={'khách'}
          />

          <div className="flex gap-[8px]">
            <BoxStatistics
              title={'Có số điện thoại'}
              number={totalNewCustomers}
              current={'khách'}
            />
            <BoxStatistics
              title={'Không có số điện thoại'}
              number={totalUserPhones}
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
