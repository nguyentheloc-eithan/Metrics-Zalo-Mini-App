import React, { useState } from 'react';

import BulletPoint from 'components/button/BulletPoint';
import { ClinicsRevenueFetch } from '../ClinicRevenue';
import BoxRow from './BoxCustomer';

interface TableClinicRevenueProps {
  data: ClinicsRevenueFetch[];
}
const TableClinicRevenue = (props: TableClinicRevenueProps) => {
  const { data } = props;
  const [customerPaidFilter, setCustomerPaidFilter] = useState<boolean>(false);
  const [revenueFilter, setRevenueFilter] = useState<boolean>(true);
  const [debitFilter, setDebitFilter] = useState<boolean>(false);
  const handleClickBulletPoint = (type: string) => {
    if (type == 'revenue') {
      if (revenueFilter) {
        setRevenueFilter(false);
      } else {
        setRevenueFilter(true);
        setDebitFilter(false);
        setCustomerPaidFilter(false);
      }
      return;
    } else if (type == 'debit') {
      if (debitFilter) {
        setDebitFilter(false);
      } else {
        setRevenueFilter(false);
        setDebitFilter(true);
        setCustomerPaidFilter(false);
      }
      return;
    } else if (type == 'customer_paid') {
      if (customerPaidFilter) {
        setCustomerPaidFilter(false);
      } else {
        setRevenueFilter(false);
        setDebitFilter(false);
        setCustomerPaidFilter(true);
      }
    }
  };

  return (
    <div className="p-[16px] flex flex-col gap-[16px] bg-white rounded-[8px]">
      <div>
        <div className="w-full bg-[#E9EBED] h-[36px] px-[12px] py-[8px] flex justify-between text-[10px] text-[#1F1F1F] font-[600] leading-[16px] tracking-[1.5px] items-center">
          <p className="flex flex-start">STT</p>
          <p className="flex flex-start w-[100px]">Cơ sở</p>
          <p className={`w-[100px]`}>
            {revenueFilter
              ? 'Doanh thu'
              : debitFilter
              ? 'Công nợ'
              : customerPaidFilter
              ? 'Thực thu'
              : 'Doanh thu'}
          </p>
        </div>
        <div>
          {data.map((clinic, index) => {
            return (
              <BoxRow
                classNameStatistic={`${
                  debitFilter
                    ? 'text-[#BC2449]'
                    : customerPaidFilter
                    ? 'text-[#5A68ED]'
                    : 'text-[#36383A]'
                }`}
                key={index}
                avatar={clinic.clinic_avatar}
                name={clinic.clinic_name}
                index={index + 1}
                money={
                  revenueFilter
                    ? clinic.revenue
                    : customerPaidFilter
                    ? clinic.customer_paid
                    : debitFilter
                    ? clinic.debit
                    : clinic.revenue
                }
                currency={'đ'}
              />
            );
          })}
        </div>
        <div className="mt-[16px] flex gap-[16px]">
          <BulletPoint
            onClick={() => {
              handleClickBulletPoint('revenue');
            }}
            color={revenueFilter ? '#36383A' : '#D6D9DC'}
            text={'Doanh thu'}
            enable={revenueFilter}
          />
          <BulletPoint
            onClick={() => {
              handleClickBulletPoint('customer_paid');
            }}
            text={'Thực thu'}
            color={customerPaidFilter ? '#5A68ED' : '#A3ABF5'}
            enable={customerPaidFilter}
          />
          <BulletPoint
            onClick={() => {
              handleClickBulletPoint('debit');
            }}
            text={'Công nợ'}
            color={debitFilter ? '#D8315B' : '#F2BBC9'}
            enable={debitFilter}
          />
        </div>
      </div>
    </div>
  );
};

export default TableClinicRevenue;
