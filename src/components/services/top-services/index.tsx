import ButtonIcon from 'components/button/ButtonIcon';
import React, { useEffect, useState } from 'react';

import { message } from 'antd';
import { ExportParams, getClinicRevenue } from 'services/rpc/clinic-revenue';

import useFetchClinicOrders from 'common/stores/clinics/clinic-orders';
import TableTopTenServices from './TableTopServices';

const temp: ExportParams = {
  start_date: '2023-01-01',
  end_date: '2023-06-01',
};

const TopServices = () => {
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
          Top 10 dịch vụ mang lại doanh thu cao nhất
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
          <TableTopTenServices />
        </div>
      ) : (
        <>graph</>
      )}
    </div>
  );
};

export default TopServices;
