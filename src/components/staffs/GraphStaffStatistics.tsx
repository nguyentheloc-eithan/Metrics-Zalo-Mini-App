import { Column } from '@ant-design/charts';
import useFetchStaffStatistics from 'common/stores/staffs/staff-statistics';
import React from 'react';

const GraphStaffStatistics = () => {
  const { allStaffAttendances } = useFetchStaffStatistics();
  const chartData = [
    ...allStaffAttendances.map((_) => ({
      clinic_name: _.clinic_name,
      value: _.right_count,
      type: 'Chấm đúng',
    })),
    ...allStaffAttendances.map((_) => ({
      clinic_name: _.clinic_name,
      value: _.wrong_count,
      type: 'Chấm sai',
    })),
    ...allStaffAttendances.map((_) => ({
      clinic_name: _.clinic_name,
      value: _.not_do_count,
      type: 'Không chấm',
    })),
  ];
  const config = {
    data: chartData,
    xField: 'clinic_name',
    yField: 'value',
    seriesField: 'type',
    isPercent: true,
    isStack: true,
    xAxis: true,
    meta: {
      value: {
        min: 0,
        max: 1,
      },
    },
    label: false,
    tooltip: true,
    legend: {
      position: 'top',
    },
    interactions: [
      {
        type: 'element-highlight-by-color',
      },
      {
        type: 'element-link',
      },
    ],
    color: ['#34B764', '#5A68ED', '#D8315B'],
  };
  return <Column {...(config as any)} />;
};

export default GraphStaffStatistics;
