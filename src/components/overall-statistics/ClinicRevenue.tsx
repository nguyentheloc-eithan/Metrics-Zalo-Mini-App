import ButtonIcon from 'components/button/ButtonIcon';
import React, { useEffect, useState } from 'react';
import TableClinicRevenue from './table/TableClinicRevenue';
import GraphClinicRevenue from './graph/graph-clinic-revenue';
import GraphServices from './graph/graph-services';
import { message } from 'antd';
import { ExportParams, getClinicRevenue } from 'services/rpc/clinic-revenue';

interface ClinicsRevenueFetch {
  clinic_address: string;
  clinic_avatar: string;
  clinic_name: string;
  customer_paid: number;
  debit: number;
  revenue: number;
}

interface ClinicRevenueProps {
  data: ClinicsRevenueFetch[];
}
const ClinicRevenue = (props: ClinicRevenueProps) => {
  const { data } = props;

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
          Doanh thu theo chi nhánh
          <span> {chartType ? '(Triệu đông)' : ''}</span>
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
          <TableClinicRevenue data={data} />
        </div>
      ) : (
        <>
          <GraphClinicRevenue />
        </>
      )}
    </div>
  );
};

export default ClinicRevenue;

export type { ClinicsRevenueFetch };
