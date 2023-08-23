import { Column } from '@ant-design/charts';
import useFetchClinicOrders from 'common/stores/clinics/clinic-orders';

import React, { useEffect, useState } from 'react';

interface DataBarChart {
  clinic: string;
  value: number;
  type: string;
}

interface DataClinicOrders {
  clinic_name: string;
  orders: any;
  value: any;
  type: string;
}
const GraphClinicOrders = () => {
  const { clinicOrders } = useFetchClinicOrders();
  const [data, setData] = useState<DataClinicOrders[]>([]);

  useEffect(() => {
    if (clinicOrders) {
      const formatDataOrders = clinicOrders.map((item: any) => {
        return {
          clinic_name: item.clinic_data.clinic_name,
          value: item.clinic_data.paid + item.clinic_data.unpaid,
          type: 'orders',
        };
      });
      const formatDataPaid = clinicOrders.map((item: any) => {
        return {
          clinic_name: item.clinic_data.clinic_name,
          value: item.clinic_data.paid,
          type: 'paid',
        };
      });
      const formatDataUnpaid = clinicOrders.map((item: any) => {
        return {
          clinic_name: item.clinic_data.clinic_name,
          value: item.clinic_data.unpaid,
          type: 'unpaid',
        };
      });
      const mergedData = [
        ...formatDataOrders,
        ...formatDataPaid,
        ...formatDataUnpaid,
      ];
      setData(mergedData);
    }
  }, [clinicOrders]);
  const config = {
    autoFit: true,
    isStack: false,
    xField: 'clinic_name',
    yField: 'value',
    seriesField: 'type',
    label: {
      // 可手动配置 label 数据标签位置
      position: 'top', // 'top', 'bottom', 'middle'
    },
    interactions: [
      {
        type: 'active-region',
        enable: false,
      },
    ],
    columnBackground: {
      style: {
        fill: 'rgba(0,0,0,0.1)',
      },
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

export default GraphClinicOrders;
