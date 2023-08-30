import useFetchZaloCustomers from 'common/stores/customers/zalo-customers';
import { ICustomerZalo } from 'common/types/customer';
import React, { useState } from 'react';
import { Avatar, Icon } from 'zmp-ui';

interface TableCustomerNavProps {
  setActiveCustomerDiverting: (e: boolean) => void;
}
const TableCustomerNav = (props: TableCustomerNavProps) => {
  const { setActiveCustomerDiverting } = props;
  const { zaloCustomers } = useFetchZaloCustomers();
  const [data, setData] = useState<any>();

  return (
    <div>
      <div className="flex h-[calc((100vh-16px)/1.33)] flex-col gap-[16px] bg-white rounded-[8px] overflow-scroll">
        <div className="h-full w-full">
          <div className="w-[calc((100vw-32px))] mr-[16px] fixed z-[999] bg-[#E9EBED] h-[36px] px-[12px] py-[8px] flex justify-between text-[10px] text-[#1F1F1F] font-[600] leading-[16px] tracking-[1.5px] items-center ">
            <p>STT</p>
            <p className="w-fit mr-[60px]">Khách hàng</p>
            <p className=" w-fit mr-[1rem]">Số điện thoại</p>
          </div>
          <div className="mt-[40px]">
            {zaloCustomers.map((customer, index) => {
              return (
                <BoxRowCustomerNav
                  key={index}
                  avatar={customer.avatar}
                  name={customer.name}
                  index={index + 1}
                  number={customer.phone}
                  setActiveCustomerDiverting={setActiveCustomerDiverting}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableCustomerNav;

interface BoxCustomerParams {
  name: string;
  index: number;
  avatar?: any;
  number?: any;
  classNameStatistic?: string;
  setActiveCustomerDiverting: (e: boolean) => void;
}
const BoxRowCustomerNav = (props: BoxCustomerParams) => {
  const {
    name,
    index,
    avatar,
    number,
    classNameStatistic,
    setActiveCustomerDiverting,
  } = props;

  return (
    <div
      className={`w-full h-[40px] flex items-center p-[12px]  justify-between text-[10px] text-[#36383A] font-[400] leading-[16px] border-b-[0.5px] border-b-[#E9EBED] `}>
      <div className="flex items-center">
        {index < 10 ? '0' + index : index}
      </div>
      <div
        className={`w-[200px] flex items-center ${
          avatar ? 'justify-start ml-[10px]' : ''
        } gap-[6px]`}>
        {avatar ? (
          <Avatar
            className="object-cover"
            size={26}
            src={avatar}
          />
        ) : null}
        <div className="w-[120px] capitalize">{name}</div>
      </div>
      <div className={`w-[100px] flex justify-between ${classNameStatistic}`}>
        <div>{number}</div>
        {number !== null ? (
          <div onClick={() => setActiveCustomerDiverting(true)}>
            <Icon
              icon="zi-chat"
              size={16}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
