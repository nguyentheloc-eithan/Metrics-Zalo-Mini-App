import React, { useEffect, useState } from 'react';

import BulletPoint from 'components/button/BulletPoint';
import BoxRow from 'components/overall-statistics/table/BoxCustomer';
import useFetchClinicBookings from 'common/stores/clinics/clinic-bookings';
import useFetchClinicCustomers from 'common/stores/customers/customer-clinics';

const TableCustomerClinics = () => {
  const { clinicCustomers } = useFetchClinicCustomers();
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const filterDataNoCLinicName = () => {
      const dataNew = clinicCustomers.filter((item: any) => {
        return item.clinic_data.clinic_name;
      });
      setData(dataNew);
    };
    filterDataNoCLinicName();
  }, [clinicCustomers]);

  return (
    <div className="p-[16px] flex flex-col gap-[16px] bg-white rounded-[8px]">
      <div>
        <div className="w-full bg-[#E9EBED] h-[36px] px-[12px] py-[8px] flex justify-between text-[10px] text-[#1F1F1F] font-[600] leading-[16px] tracking-[1.5px] items-center">
          <p>STT</p>
          <p>Cơ sở</p>
          <p className="w-[120px]">Tổng số K.Hàng</p>
        </div>
        <div>
          {data.map((clinic, index) => {
            return (
              <BoxRow
                key={index}
                avatar={clinic.clinic_data.clinic_avatar}
                name={clinic.clinic_data.clinic_name}
                index={index + 1}
                money={clinic.clinic_data.total}
                currency={'khách'}
              />
            );
          })}
        </div>
      </div>
      <div className="mt-[16px] flex gap-[16px]">
        <BulletPoint
          text={'Tổng số khách'}
          enable={true}
        />
        <BulletPoint
          text={'Khách mới'}
          color={'#A3ABF5'}
          enable={false}
        />
      </div>
    </div>
  );
};

export default TableCustomerClinics;
