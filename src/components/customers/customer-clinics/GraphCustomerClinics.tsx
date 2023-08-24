import { Column } from '@ant-design/charts';
import useFetchClinicCustomers from 'common/stores/customers/customer-clinics';
import useFetchCustomers from 'common/stores/customers/customers';
import React from 'react';
import { useEffect, useState } from 'react';

interface DataClinicCustomer {
  clinic_name: string;
  value: any;
  type: string;
  total: any;
}

const GraphCustomerClinics = () => {
  const { customers } = useFetchCustomers();
  const [data, setData] = useState<DataClinicCustomer[]>([]);

  useEffect(() => {
    if (customers) {
      const dataCustomerTotal = customers.map((item: any) => {
        return {
          clinic_name: item.clinic_name,
          value: item.total,
          type: 'Tổng khách hàng đang có',
          total: item.total,
        };
      });
      const dataCostumerNew = customers.map((item: any) => {
        return {
          clinic_name: item.clinic_name,
          value: item.new,
          type: 'Khách mới',
          total: item.total,
        };
      });
      const mergedData = [...dataCustomerTotal, ...dataCostumerNew];
      setData(mergedData);
    }
  }, [customers]);

  const config = {
    data,
    isGroup: true,
    xField: 'clinic_name',
    yField: 'value',
    seriesField: 'type',
    xAxis: false,
    dodgePadding: 2,
    label: false,
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
