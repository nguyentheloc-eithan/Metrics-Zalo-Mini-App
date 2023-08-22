import { Column } from '@ant-design/charts';
import useFetchClinic from 'common/stores/clinics/clinic-revenue';
import React, { useEffect, useState } from 'react';
const data = [
  {
    year: '1991',
    value: 3,
    type: 'Lon',
  },
  {
    year: '1992',
    value: 4,
    type: 'Lon',
  },
  {
    year: '1993',
    value: 3.5,
    type: 'Lon',
  },
  {
    year: '1994',
    value: 5,
    type: 'Lon',
  },
  {
    year: '1995',
    value: 4.9,
    type: 'Lon',
  },
  {
    year: '1996',
    value: 6,
    type: 'Lon',
  },
  {
    year: '1997',
    value: 7,
    type: 'Lon',
  },
  {
    year: '1998',
    value: 9,
    type: 'Lon',
  },
  {
    year: '1999',
    value: 15,
    type: 'Lon',
  },
  {
    year: '1991',
    value: 3,
    type: 'Bor',
  },
  {
    year: '1992',
    value: 4,
    type: 'Bor',
  },
  {
    year: '1993',
    value: 3.5,
    type: 'Bor',
  },
  {
    year: '1994',
    value: 5,
    type: 'Bor',
  },
  {
    year: '1995',
    value: 4.9,
    type: 'Bor',
  },
  {
    year: '1996',
    value: 6,
    type: 'Bor',
  },
  {
    year: '1997',
    value: 7,
    type: 'Bor',
  },
  {
    year: '1998',
    value: 9,
    type: 'Bor',
  },
  {
    year: '1999',
    value: 13,
    type: 'Bor',
  },
];

interface DataBarChart {
  clinic: string;
  value: number;
  type: string;
}
const GraphClinicRevenue = () => {
  const { clinics } = useFetchClinic();
  const [data, setData] = useState<DataBarChart[]>([]);

  useEffect(() => {
    if (clinics) {
      const dataClinicRevenue = clinics.map((clinic) => {
        return {
          clinic: clinic.clinic_name,
          value: clinic.revenue / 1000000,
          type: 'customer_paid',
        };
      });
      const dataClinicDebit = clinics.map((clinic) => {
        return {
          clinic: clinic.clinic_name,
          value: clinic.debit / 1000000,
          type: 'debit',
        };
      });
      const mergedData = [...dataClinicRevenue, ...dataClinicDebit];
      setData(mergedData);
    }
  }, []);
  const config = {
    data,
    autoFit: true,
    isStack: false,
    xField: 'clinic',
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
    <>
      <Column {...(config as any)} />
    </>
  );
};

export default GraphClinicRevenue;
