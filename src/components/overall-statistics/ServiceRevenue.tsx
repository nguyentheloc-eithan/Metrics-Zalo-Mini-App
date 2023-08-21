import ButtonIcon from 'components/button/ButtonIcon';
import React, { useState } from 'react';
import TableTopCategories from './table/TableTopCategories';
import TableTopServices from './table/TableTopServices';
import GraphCategories from './graph/graph-categories';
import GraphServices from './graph/graph-services';

const ServiceRevenue = () => {
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
    <div className="p-[16px] h-fit flex flex-col gap-[16px] bg-white rounded-[8px]">
      <div className="flex items-center justify-between">
        <div className="text-[14px] font-[700] leading-[20px] tracking-[0.1px]">
          Doanh thu theo dịch vụ
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
          <TableTopCategories />
          <TableTopServices />
        </div>
      ) : (
        <div>
          <GraphCategories />
          <GraphServices />
        </div>
      )}
    </div>
  );
};

export default ServiceRevenue;
