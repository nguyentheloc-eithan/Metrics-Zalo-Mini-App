"use client";
import React, { useState } from "react";
import ModalDivertingConfirm from "./ModalDivertingConfirm";
import { Avatar, Icon } from "zmp-ui";
// import { openChat, showToast } from "zmp-sdk/apis";
// import { Avatar, Icon } from "zmp-ui";
// import ModalDivertingConfirm from "./ModalDivertingConfirm";

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
            {allCustomers.map((customer: any, index: number) => {
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

// import {
//   ColumnDef,
//   flexRender,
//   getCoreRowModel,
//   getPaginationRowModel,
//   useReactTable,
// } from "@tanstack/react-table";

// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// type Payment = {
//   id: string;
//   amount: number;
//   status: "pending" | "processing" | "success" | "failed";
//   email: string;
// };

// export const payments: Payment[] = [
//   {
//     id: "728ed52f",
//     amount: 100,
//     status: "pending",
//     email: "m@example.com",
//   },
//   {
//     id: "489e1d42",
//     amount: 125,
//     status: "processing",
//     email: "example@gmail.com",
//   },
//   // ...
// ];
// export const columns: ColumnDef<any>[] = [
//   {
//     accessorKey: "key",
//     header: "STT",
//   },
//   {
//     accessorKey: "name",
//     header: "Email",
//   },
//   {
//     accessorKey: "phone",
//     header: "Amount",
//   },
// ];
// interface DataTableProps<TData, TValue> {
//   columns: ColumnDef<TData, TValue>[];
//   data: TData[];
// }
// export function DataTable<TData, TValue>({
//   columns,
//   data,
// }: DataTableProps<TData, TValue>) {
//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//   });

//   return (
//     <div>
//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => {
//                   return (
//                     <TableHead key={header.id}>
//                       {header.isPlaceholder
//                         ? null
//                         : flexRender(
//                             header.column.columnDef.header,
//                             header.getContext(),
//                           )}
//                     </TableHead>
//                   );
//                 })}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {table.getRowModel().rows?.length ? (
//               table.getRowModel().rows.map((row) => (
//                 <TableRow
//                   key={row.id}
//                   data-state={row.getIsSelected() && "selected"}
//                 >
//                   {row.getVisibleCells().map((cell) => (
//                     <TableCell key={cell.id}>
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext(),
//                       )}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell
//                   colSpan={columns.length}
//                   className="h-24 text-center"
//                 >
//                   No results.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>
//       <div className="flex items-center justify-end space-x-2 py-4">
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() => table.previousPage()}
//           disabled={!table.getCanPreviousPage()}
//         >
//           Previous
//         </Button>
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() => table.nextPage()}
//           disabled={!table.getCanNextPage()}
//         >
//           Next
//         </Button>
//       </div>
//     </div>
//   );
// }
// const data = [
//   {
//     id: "728ed52f",
//     amount: 100,
//     status: "pending",
//     email: "m@example.com",
//   },
//   {
//     id: "728ed52f",
//     amount: 100,
//     status: "pending",
//     email: "m@example.com",
//   },
//   {
//     id: "728ed52f",
//     amount: 100,
//     status: "pending",
//     email: "m@example.com",
//   },
//   {
//     id: "728ed52f",
//     amount: 100,
//     status: "pending",
//     email: "m@example.com",
//   },
//   {
//     id: "728ed52f",
//     amount: 100,
//     status: "pending",
//     email: "m@example.com",
//   },

//   {
//     id: "728ed52f",
//     amount: 100,
//     status: "pending",
//     email: "m@example.com",
//   },
//   {
//     id: "728ed52f",
//     amount: 100,
//     status: "pending",
//     email: "m@example.com",
//   },
//   {
//     id: "728ed52f",
//     amount: 100,
//     status: "pending",
//     email: "m@example.com",
//   },
//   {
//     id: "728ed52f",
//     amount: 100,
//     status: "pending",
//     email: "m@example.com",
//   },
//   {
//     id: "728ed52f",
//     amount: 100,
//     status: "pending",
//     email: "m@example.com",
//   },
//   {
//     id: "728ed52f",
//     amount: 100,
//     status: "pending",
//     email: "m@example.com",
//   },
//   {
//     id: "728ed52f",
//     amount: 100,
//     status: "pending",
//     email: "m@example.com",
//   },
//   {
//     id: "728ed52f",
//     amount: 100,
//     status: "pending",
//     email: "m@example.com",
//   },
//   {
//     id: "728ed52f",
//     amount: 100,
//     status: "pending",
//     email: "m@example.com",
//   },
//   {
//     id: "728ed52f",
//     amount: 100,
//     status: "pending",
//     email: "m@example.com",
//   },
// ];

// const TableCustomerNav = (props: TableCustomerNavProps) => {
//   const { allCustomers } = props;
//   return (
//     <div className="">
//       <DataTable columns={columns as any} data={allCustomers} />
//     </div>
//   );
// };
// export default TableCustomerNav;
