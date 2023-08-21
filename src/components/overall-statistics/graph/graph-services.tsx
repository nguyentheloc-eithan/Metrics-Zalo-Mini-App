import { Pie } from '@ant-design/charts';
import React from 'react';
import { ICategory } from 'types/category';

const GraphServices = () => {
  const data = [
    {
      type: 'Dịch vụ 1',
      value: 25,
    },
    {
      type: 'Dịch vụ 2',
      value: 20,
    },
    {
      type: 'Dịch vụ 3',
      value: 17.5,
    },
    {
      type: 'Dịch vụ 4',
      value: 12.5,
    },
    {
      type: 'Dịch vụ 5',
      value: 10,
    },
    {
      type: 'Dịch vụ khác',
      value: 12.5,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };

  return (
    <>
      <div className="text-[14px] font-[700] leading-[20px] tracking-[0.1px]">
        Top 5 Dịch vụ
      </div>
      <Pie {...config} />
    </>
  );
};

export default GraphServices;
