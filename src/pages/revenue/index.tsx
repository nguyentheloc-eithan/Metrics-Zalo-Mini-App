import { message } from 'antd';
import useFetchClinic from 'common/stores/clinics/clinic-revenue';
import useFetchCustomers from 'common/stores/customers/customer';
import ButtonIcon from 'components/button/ButtonIcon';
import ClinicRevenue, {
  ClinicsRevenueFetch,
} from 'components/overall-statistics/ClinicRevenue';
import ServiceRevenue from 'components/overall-statistics/ServiceRevenue';
import BoxStatistics from 'components/overall-statistics/box-statistics';

import TopCustomers from 'components/overall-statistics/table/TopCustomers';
import TopSalers from 'components/overall-statistics/table/TopSalers';
import React, { useEffect, useState } from 'react';
import { ExportParams, getClinicRevenue } from 'services/rpc/clinic-revenue';
import { getTopCustomer } from 'services/rpc/top-customer';
import { formatMoney } from 'utils/money-format';

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
  customer_paid: number;
  debit: number;
}
const temp: ExportParams = {
  start_date: '2023-01-01',
  end_date: '2023-06-01',
};

const RevenuePage = () => {
  const { clinics, setClinics } = useFetchClinic();
  const { customers, setCustomers } = useFetchCustomers();
  const [totalRevenue, setTotalRevenue] = useState<string>('');
  const [totalCustomerPaid, setTotalCustomerPaid] = useState<string>('');
  const [totalDebit, setTotalDebit] = useState<string>('');

  useEffect(() => {
    const fetchClinicRevenue = async () => {
      try {
        const { clinicRevenue, errorClinicRevenue } = await getClinicRevenue(
          temp
        );
        const { dataCustomer, errorCustomer } = await getTopCustomer(temp);
        if (errorClinicRevenue) {
          message.error(errorClinicRevenue.message);
          return;
        }
        if (clinicRevenue) {
          setClinics(clinicRevenue);
          const revenue = clinicRevenue.reduce(
            (prev: any, cur: any) => prev + cur.revenue,
            0
          );
          const customerPaid = clinicRevenue.reduce(
            (prev: any, cur: any) => prev + cur.customer_paid,
            0
          );
          const debit = clinicRevenue.reduce(
            (prev: any, cur: any) => prev + cur.debit,
            0
          );
          setTotalRevenue(formatMoney(revenue));
          setTotalCustomerPaid(formatMoney(customerPaid));
          setTotalDebit(formatMoney(debit));

          if (errorCustomer) {
            message.error(errorCustomer.message);
            return;
          }
          if (dataCustomer) {
            setCustomers(dataCustomer);
          }
          console.log('dataCustomer', clinics);
        }
      } finally {
      }
    };
    fetchClinicRevenue();
  }, []);
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
            number={totalRevenue}
            current={'đ'}
          />
          <div className="flex gap-[8px]">
            <BoxStatistics
              title={'Thực thu'}
              colorNumber={'#5A68ED'}
              number={totalCustomerPaid}
              current={'đ'}
            />
            <BoxStatistics
              title={'Công nợ'}
              number={totalDebit}
              colorNumber={'#D8315B'}
              current={'đ'}
            />
          </div>
        </div>
        <ClinicRevenue data={clinics} />
        <ServiceRevenue />
        <TopCustomers customers={customers} />
        {/* <TopSalers /> */}
      </div>
    </>
  );
};

export default RevenuePage;

export type { DataCategories, DataServices };
