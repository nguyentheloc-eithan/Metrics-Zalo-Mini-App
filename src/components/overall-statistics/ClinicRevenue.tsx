import ButtonIcon from 'components/button/ButtonIcon';
import React, { useState } from 'react';
import TableClinicRevenue from './table/TableClinicRevenue';
import GraphClinicRevenue from './graph/graph-clinic-revenue';
import GraphServices from './graph/graph-services';

const ClinicRevenue = () => {
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
          <TableClinicRevenue />
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
