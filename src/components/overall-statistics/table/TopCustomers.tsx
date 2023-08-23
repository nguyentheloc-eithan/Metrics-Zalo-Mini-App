import React, { useEffect, useState } from 'react';

import BulletPoint from 'components/button/BulletPoint';
import BoxRow from './BoxCustomer';
import { ICustomer } from 'common/types/customer';
import { take } from 'lodash';

interface TopCustomerProps {
  customers: ICustomer[];
}
const TopCustomers = (props: TopCustomerProps) => {
  const { customers } = props;
  const [top5Customers, setTop5Customers] = useState<ICustomer[]>([]);
  useEffect(() => {
    const filterTop5Customer = () => {
      const customersFilter: ICustomer[] = take(customers, 5);
      setTop5Customers(customersFilter);
    };
    filterTop5Customer();
  }, [customers]);

  return (
    <div className="p-[16px] flex flex-col gap-[16px] bg-white rounded-[8px]">
      <div className="text-[14px] font-[700] leading-[20px] tracking-[0.1px]">
        Top 5 khách hàng
      </div>
      <div>
        <div className="w-full bg-[#E9EBED] h-[36px] px-[12px] py-[8px] flex justify-between text-[10px] text-[#1F1F1F] font-[600] leading-[16px] tracking-[1.5px] items-center">
          <p>STT</p>
          <p className="flex flex-start w-[100px] mr-[80px]">Khách hàng</p>
          <p>Doanh thu</p>
        </div>
        <div>
          {top5Customers.map((customer, index) => {
            return (
              <BoxRow
                key={index}
                avatar={'a'}
                name={customer.customer_name}
                index={index + 1}
                money={customer.customer_paid}
                currency={'đ'}
              />
            );
          })}
        </div>
        <div className="mt-[16px] flex gap-[16px]">
          <BulletPoint
            text={'Doanh thu'}
            enable={true}
          />
          <BulletPoint
            text={'Thực thu'}
            color={'#A3ABF5'}
            enable={false}
          />
          <BulletPoint
            text={'Công nợ'}
            color={'#F2BBC9'}
            enable={false}
          />
        </div>
      </div>
    </div>
  );
};

export default TopCustomers;
