import ButtonIcon from 'components/button/ButtonIcon';
import React, { useEffect, useState } from 'react';

import { message } from 'antd';
import { ExportParams, getClinicRevenue } from 'services/rpc/clinic-revenue';
import TableClinicBookings from './TableClinicBookings';
import useFetchClinic from 'common/stores/clinics/clinic-revenue';
import useFetchClinicOrders from 'common/stores/clinics/clinic-orders';
import GraphClinicBookings from './graph-clinic-bookings';

const temp: ExportParams = {
  start_date: '2023-01-01',
  end_date: '2023-06-01',
};

interface ClinicsRevenueFetch {
  clinic_address: string;
  clinic_avatar: string;
  clinic_name: string;
  customer_paid: number;
  debit: number;
  revenue: number;
}
const ClinicBookings = () => {
  const [chartType, setChartType] = useState<boolean>(true);
  const [tableType, setTableType] = useState<boolean>(false);
  const { clinics } = useFetchClinic();
  const [data, setData] = useState<ClinicsRevenueFetch[]>([]);

  useEffect(() => {
    const fetchClinicRevenue = async () => {
      try {
        const { clinicRevenue, errorClinicRevenue } = await getClinicRevenue(
          temp
        );
        if (errorClinicRevenue) {
          message.error('loi');
          return;
        }
        if (clinicRevenue) {
          setData(clinicRevenue);
        }
      } finally {
      }
    };
    fetchClinicRevenue();
  }, []);

  const onClickChart = () => {
    setTableType(false);
    setChartType(true);
  };
  const onClickTable = () => {
    setChartType(false);
    setTableType(true);
  };

  return (
    <div className="p-[16px] flex flex-col gap-[16px] bg-white rounded-[8px]">
      <div className="flex items-center justify-between">
        <div className="text-[14px] font-[700] leading-[20px] tracking-[0.1px]">
          Bookings theo chi nhánh
        </div>
        <div className="flex gap-[8px]">
          <ButtonIcon
            onClick={onClickTable}
            icon={'zi-tune'}
            active={tableType}
          />
          <ButtonIcon
            onClick={onClickChart}
            icon={'zi-poll'}
            active={chartType}
          />
        </div>
      </div>
      {chartType == false ? (
        <div>
          <TableClinicBookings />
        </div>
      ) : (
        <GraphClinicBookings />
      )}
    </div>
  );
};

export default ClinicBookings;

export type { ClinicsRevenueFetch };
