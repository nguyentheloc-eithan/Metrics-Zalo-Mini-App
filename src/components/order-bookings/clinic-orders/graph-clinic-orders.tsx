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
          type: 'Đã thanh toán',
        };
      });
      const formatDataUnpaid = clinicOrders.map((item: any) => {
        return {
          clinic_name: item.clinic_data.clinic_name,
          value: item.clinic_data.unpaid,
          type: 'Chưa thanh toán',
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
    label: false,
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
