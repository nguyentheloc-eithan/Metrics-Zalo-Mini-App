import React, { useEffect, useState } from 'react';
import useFetchTopTenServices from 'common/stores/services/top-ten-services';
import BulletPoint from 'components/button/BulletPoint';

import useFetchServicesRevenue from 'common/stores/services/service-revenue';
import RowBoxTopTenService from '../top-services/RowBoxTopTenService';
import useFetchTopServiceBookings from 'common/stores/services/service-bookings';
import { take } from 'lodash';

const TableTopServiceBookings = () => {
  const { topServiceBookings } = useFetchTopServiceBookings();
  const {
    sumServiceRevenue,
    sumServiceCustomerPaid,
    sumServiceTotalBookings,
    sumServiceDebit,
  } = useFetchServicesRevenue();

  const [customerPaidFilter, setCustomerPaidFilter] = useState<boolean>(false);
  const [revenueFilter, setRevenueFilter] = useState<boolean>(false);
  const [debitFilter, setDebitFilter] = useState<boolean>(false);
  const [isBookings, setIsBookings] = useState<boolean>(true);

  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const filterTopTen = () => {
      const topTen = take(topServiceBookings, 10);
      setData(topTen);
    };
    filterTopTen();
  }, [topServiceBookings]);

  const handleClickBulletPoint = (type: string) => {
    if (type == 'revenue') {
      if (revenueFilter) {
        setRevenueFilter(false);
      } else {
        setRevenueFilter(true);
        setDebitFilter(false);
        setIsBookings(false);
        setCustomerPaidFilter(false);
      }
      return;
    } else if (type == 'debit') {
      if (debitFilter) {
        setDebitFilter(false);
      } else {
        setRevenueFilter(false);
        setIsBookings(false);
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
        setIsBookings(false);
        setCustomerPaidFilter(true);
      }
    } else if (type == 'bookings') {
      if (isBookings) {
        setIsBookings(false);
      } else {
        setIsBookings(true);
        setRevenueFilter(false);
        setDebitFilter(false);
        setCustomerPaidFilter(false);
      }
    }
  };
  return (
    <div className="p-[2px] flex flex-col gap-[16px] bg-white rounded-[8px]">
      <div>
        <div className="w-full bg-[#E9EBED] h-[36px] px-[12px] py-[8px] flex  text-[10px] text-[#1F1F1F] font-[600] leading-[16px] tracking-[1.5px] items-center">
          <p>STT</p>
          <p className="w-[80px] ml-[15px]">Dịch vụ</p>
          <p className="w-[100px] ml-[60px]">
            {revenueFilter
              ? 'Doanh thu'
              : debitFilter
              ? 'Công nợ'
              : customerPaidFilter
              ? 'Thực thu'
              : isBookings
              ? 'Số bookings'
              : 'Số bookings'}
          </p>
          <p className="w-[80px] ml-[15px]">% so tổng</p>
        </div>
        <div>
          {data.map((service, index) => {
            return (
              <RowBoxTopTenService
                classNameStatistic={`${
                  debitFilter
                    ? 'text-[#BC2449]'
                    : customerPaidFilter
                    ? 'text-[#5A68ED]'
                    : isBookings
                    ? 'text-[#34B764] text-center'
                    : 'text-[#36383A]'
                }`}
                key={index}
                avatar={service.service_image}
                name={service.service_name}
                index={index + 1}
                money={
                  revenueFilter
                    ? service.revenue
                    : customerPaidFilter
                    ? service.customer_paid
                    : debitFilter
                    ? service.debit
                    : isBookings
                    ? service.total
                    : service.total
                }
                currency={isBookings ? 'bookings' : 'đ'}
                percentage={
                  revenueFilter
                    ? ((service.revenue / sumServiceRevenue) * 100).toFixed(2)
                    : customerPaidFilter
                    ? (
                        (service.customer_paid / sumServiceCustomerPaid) *
                        100
                      ).toFixed(2)
                    : debitFilter
                    ? ((service.debit / sumServiceDebit) * 100).toFixed(2)
                    : isBookings
                    ? ((service.total / sumServiceTotalBookings) * 100).toFixed(
                        2
                      )
                    : ((service.revenue / sumServiceRevenue) * 100).toFixed(2)
                }
              />
            );
          })}
        </div>
      </div>
      <div className="mt-[16px] flex flex-wrap gap-[16px]">
        <BulletPoint
          text={'Bookings'}
          color={isBookings ? '#34B764' : '#D1F5DE'}
          enable={isBookings}
          onClick={() => {
            handleClickBulletPoint('bookings');
          }}
        />
        <BulletPoint
          text={'Doanh thu'}
          color={revenueFilter ? '#36383A' : '#D6D9DC'}
          enable={revenueFilter}
          onClick={() => {
            handleClickBulletPoint('revenue');
          }}
        />
        <BulletPoint
          text={'Thực thu'}
          color={customerPaidFilter ? '#5A68ED' : '#A3ABF5'}
          enable={customerPaidFilter}
          onClick={() => {
            handleClickBulletPoint('customer_paid');
          }}
        />
        <BulletPoint
          text={'Công nợ'}
          color={debitFilter ? '#D8315B' : '#F2BBC9'}
          enable={debitFilter}
          onClick={() => {
            handleClickBulletPoint('debit');
          }}
        />
      </div>
    </div>
  );
};

export default TableTopServiceBookings;
