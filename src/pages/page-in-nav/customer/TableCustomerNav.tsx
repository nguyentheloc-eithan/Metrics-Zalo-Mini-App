import React, { useState } from "react";
import { openChat, showToast } from "zmp-sdk/apis";
import { Avatar, Icon } from "zmp-ui";
import ModalDivertingConfirm from "./ModalDivertingConfirm";

interface TableCustomerNavProps {
  allCustomers: any;
}
const TableCustomerNav = (props: TableCustomerNavProps) => {
  const { allCustomers } = props;

  const [activeCustomerDiverting, setActiveCustomerDiverting] =
    useState<boolean>(false);
  const [customerSelected, setCustomerSelected] = useState<any>();

  return (
    <div>
      <div className="flex h-[calc((100vh-16px)/1.33)] flex-col gap-[16px] bg-white rounded-[8px] overflow-scroll">
        <div className="h-full w-full">
          <div className="w-[calc((100vw-32px))] mr-[16px] fixed z-[999] bg-[#E9EBED] h-[36px] px-[12px] py-[8px] flex justify-between text-[10px] text-[#1F1F1F] font-[600] leading-[16px] tracking-[1.5px] items-center ">
            <p className="text-[10px]">STT</p>
            <p className="w-fit mr-[60px] text-[10px]">Khách hàng</p>
            <p className=" w-fit mr-[2rem] text-[10px]">Số điện thoại</p>
          </div>
          <div className="mt-[40px]">
            {allCustomers.slice(0, 350).map((customer: any, index: number) => {
              return (
                <BoxRowCustomerNav
                  key={index}
                  index={index + 1}
                  customer={customer}
                  setActiveCustomerDiverting={setActiveCustomerDiverting}
                  setCustomerSelected={setCustomerSelected}
                />
              );
            })}
          </div>
        </div>
      </div>
      {activeCustomerDiverting && (
        <ModalDivertingConfirm
          setActiveCustomerDiverting={setActiveCustomerDiverting}
          customer={customerSelected}
          active={activeCustomerDiverting}
        />
      )}
    </div>
  );
};

export default TableCustomerNav;

interface BoxCustomerParams {
  index: number;
  customer: any;

  classNameStatistic?: string;
  setActiveCustomerDiverting: (e: boolean) => void;
  setCustomerSelected: any;
}
const BoxRowCustomerNav = (props: BoxCustomerParams) => {
  const {
    index,
    customer,
    classNameStatistic,
    setActiveCustomerDiverting,
    setCustomerSelected,
  } = props;

  return (
    <div
      className={`w-full h-auto flex items-center p-[12px]  justify-between text-[10px] text-[#36383A] font-[400] leading-[16px] border-b-[0.5px] border-b-[#E9EBED] `}
    >
      <div className="flex items-center">
        {index < 10 ? "0" + index : index}
      </div>
      <div
        className={`w-[180px] ml-[15px] flex items-center ${
          customer.avatar ? "justify-start ml-[15px]" : ""
        } gap-[6px]`}
      >
        {customer.avatar ? (
          <Avatar size={26} src={customer.avatar} />
        ) : (
          <Avatar size={26} src="" />
        )}
        <div className="w-fit capitalize">{customer.name}</div>
      </div>
      <div className={`w-[100px] flex justify-between ${classNameStatistic}`}>
        <div>{customer.phone}</div>
        {customer.zalo_id !== null || customer.phone ? (
          <div
            onClick={() => {
              setActiveCustomerDiverting(true), setCustomerSelected(customer);
            }}
          >
            <Icon icon="zi-chat" size={16} />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
// import React, { useEffect, useState } from "react";
// import { Button, Table } from "antd";
// import type { ColumnsType } from "antd/es/table";
// import { ICustomerZalo } from "common/types/customer";

// interface DataType {
//   key: React.Key;
//   name: string;
//   age: number;
//   address: string;
// }

// const columns: ColumnsType<ICustomerZalo> = [
//   {
//     title: () => <div className="text-[10px]">STT</div>,
//     dataIndex: "key",
//     width: 40,
//     render: (_, record, index) => (
//       <div className="w-auto flex items-center text-[10px] justify-center border-none">
//         {index + 1}
//       </div>
//     ),
//   },
//   {
//     title: () => (
//       <div className="w-full border-none text-[10px]">Tên khách hàng</div>
//     ),
//     width: 140,
//     dataIndex: "name",
//     render: (_, record, index) => (
//       <div className="w-full flex items-center  border-none justify-center text-[10px]">
//         {record.name}
//       </div>
//     ),
//   },
//   {
//     title: () => (
//       <div className="w-full border-none text-[10px]">Số điện thoại</div>
//     ),
//     width: 140,
//     dataIndex: "phone",

//     render: (_, record, index) => (
//       <div className="w-full flex items-center  border-none justify-center text-[10px]">
//         {record.phone}
//       </div>
//     ),
//   },
// ];

// const TableCustomerNav = ({ allCustomers }: TableCustomerNavProps) => {
//   const [data, setData] = useState<any>([]);
//   useEffect(() => {
//     const formatDataCustomer = () => {
//       const dataFormat = allCustomers.map((item, index) => {
//         return {
//           key: index + 1,
//           name: item.name,
//           avatar: item.avatar,
//           phone: item.phone,
//         };
//       });
//       setData(dataFormat);
//     };
//     formatDataCustomer();
//   }, [allCustomers]);

//   return (
//     <div>
//       <div style={{ marginBottom: 16 }}>
//         {/* <span style={{ marginLeft: 8 }}>
//           {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
//         </span> */}
//       </div>
//       <div className=" w-full h-auto overflow-y-scroll flex items-center justify-center border border-[red]">
//         <Table
//           columns={columns}
//           dataSource={data}
//           scroll={{ y: 440 }}
//           pagination={false}
//         />
//       </div>
//     </div>
//   );
// };

// export default TableCustomerNav;
