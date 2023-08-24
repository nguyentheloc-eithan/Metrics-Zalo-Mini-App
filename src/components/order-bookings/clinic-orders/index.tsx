import ButtonIcon from 'components/button/ButtonIcon';
import React, { useEffect, useState } from 'react';

import { message } from 'antd';
import { ExportParams, getClinicRevenue } from 'services/rpc/clinic-revenue';
import TableClinicOrders from './TableClinicOrders';
import GraphClinicOrders from './graph-clinic-orders';
import useFetchClinicOrders from 'common/stores/clinics/clinic-orders';

const temp: ExportParams = {
  start_date: '2023-01-01',
  end_date: '2023-06-01',
};

interface ClinicOrders {
  orders: any;
  paid: number;
  unpaid: number;
  upsale: number;
}
const ClinicOrders = () => {
  const [chartType, setChartType] = useState<boolean>(true);
  const [tableType, setTableType] = useState<boolean>(false);

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
          Orders theo chi nhánh
        </div>
        <div className="flex gap-[8px]">
          <ButtonIcon
            onClick={onClickTable}
            icon={'zi-list-1'}
            active={tableType}
          />
          <ButtonIcon
            onClick={onClickChart}
            icon={'zi-poll-solid'}
            active={chartType}
          />
        </div>
      </div>
      {chartType == false ? (
        <div>
          <TableClinicOrders />
        </div>
      ) : (
        <GraphClinicOrders />
      )}
    </div>
  );
};

export default ClinicOrders;
