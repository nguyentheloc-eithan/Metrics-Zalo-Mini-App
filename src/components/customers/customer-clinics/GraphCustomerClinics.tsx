// import React, { useState, useEffect } from 'react';
// import ReactDOM from 'react-dom';
// import { Column } from '@ant-design/plots';
// import useFetchClinicCustomers from 'common/stores/customers/customer-clinics';

import { Column } from '@ant-design/charts';
import useFetchClinicCustomers from 'common/stores/customers/customer-clinics';
import React from 'react';
import { useEffect, useState } from 'react';

interface DataClinicCustomer {
  clinic_name: string;
  value: any;
  type: string;
  total: any;
}

const GraphCustomerClinics = () => {
  const { clinicCustomers } = useFetchClinicCustomers();
  const [data, setData] = useState<DataClinicCustomer[]>([]);

  useEffect(() => {
    if (clinicCustomers) {
      const dataNew = clinicCustomers.filter((item: any) => {
        return item.clinic_data.clinic_name;
      });

      const dataCustomerTotal = dataNew.map((item: any) => {
        return {
          clinic_name: item.clinic_data.clinic_name,
          value: item.clinic_data.total,
          type: 'total',
          total: item.clinic_data.total,
        };
      });
      const dataCostumerNew = dataNew.map((item: any) => {
        return {
          clinic_name: item.clinic_data.clinic_name,
          value: item.clinic_data.new,
          type: 'new',
          total: item.clinic_data.total,
        };
      });
      const mergedData = [...dataCustomerTotal, ...dataCostumerNew];
      setData(mergedData);
    }
  }, [clinicCustomers]);

  const config = {
    data,
    isGroup: true,
    xField: 'clinic_name',
    yField: 'value',
    seriesField: 'type',
    // 分组柱状图 组内柱子间的间距 (像素级别)
    dodgePadding: 2,
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle',
      // 'top', 'middle', 'bottom'
      // 可配置附加的布局方法
      layout: [
        // 柱形图数据标签位置自动调整
        {
          type: 'interval-adjust-position',
        }, // 数据标签防遮挡
        {
          type: 'interval-hide-overlap',
        }, // 数据标签文颜色自动调整
        {
          type: 'adjust-color',
        },
      ],
    },
  };

  return (
    <Column
      {...(config as any)}
      data={[...data]}
      key={'graph-1'}
    />
  );
};

export default GraphCustomerClinics;
