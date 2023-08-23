import React from 'react';
import BoxRow from 'components/overall-statistics/table/BoxCustomer';
import useFetchClinicOrders from 'common/stores/clinics/clinic-orders';

const clinics = [
  {
    clinic_name: 'Tên cơ sở',
    revenue: 100000,
    clinic_avatar: '',
  },
  {
    clinic_name: 'Tên cơ sở',
    revenue: 100000,
    clinic_avatar: '',
  },
  {
    clinic_name: 'Tên cơ sở',
    revenue: 100000,
    clinic_avatar: '',
  },
  {
    clinic_name: 'Tên cơ sở',
    revenue: 100000,
    clinic_avatar: '',
  },
  {
    clinic_name: 'Tên cơ sở',
    revenue: 100000,
    clinic_avatar: '',
  },
];

// interface TableClinicRevenueProps {
//   data: ClinicsRevenueFetch[];
// }
const TableClinicOrders = () => {
  const { clinicOrders } = useFetchClinicOrders();

  return (
    <div className="p-[16px] flex flex-col gap-[16px] bg-white rounded-[8px]">
      <div>
        <div className="w-full bg-[#E9EBED] h-[36px] px-[12px] py-[8px] flex justify-between text-[10px] text-[#1F1F1F] font-[600] leading-[16px] tracking-[1.5px] items-center">
          <p>STT</p>
          <p>Cơ sở</p>
          <p className="w-[120px]">Tổng số orders</p>
        </div>
        <div>
          {clinicOrders.map((clinic, index) => {
            return (
              <BoxRow
                key={index}
                avatar={clinic.clinic_data.clinic_avatar}
                name={clinic.clinic_data.clinic_name}
                index={index + 1}
                money={clinic.clinic_data.paid + clinic.clinic_data.unpaid}
                currency={'orders'}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TableClinicOrders;
