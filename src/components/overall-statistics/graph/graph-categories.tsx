import { Pie } from '@ant-design/charts';
import React from 'react';
import { ICategory } from 'types/category';

const GraphCategories = () => {
  const data = [
    {
      type: 'Danh mục 1',
      value: 25,
    },
    {
      type: 'Danh mục 2',
      value: 20,
    },
    {
      type: 'Danh mục 3',
      value: 17.5,
    },
    {
      type: 'Danh mục 4',
      value: 12.5,
    },
    {
      type: 'Danh mục 5',
      value: 10,
    },
    {
      type: 'Danh mục khác',
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
        Top 5 Danh mục
      </div>
      <Pie {...config} />
    </>
  );
};

export default GraphCategories;
