// import React, { useState } from "react";
// import { openChat, showToast } from "zmp-sdk/apis";
// import { Avatar, Icon } from "zmp-ui";
// import ModalDivertingConfirm from "./ModalDivertingConfirm";

interface TableCustomerNavProps {
  allCustomers: any;
}
// const TableCustomerNav = (props: TableCustomerNavProps) => {
//     const { allCustomers } = props;

//     const [activeCustomerDiverting, setActiveCustomerDiverting] =
//         useState<boolean>(false);
//     const [customerSelected, setCustomerSelected] = useState<any>();

//     return (
//         <div>
//             <div className="flex h-[calc((100vh-16px)/1.33)] flex-col gap-[16px] bg-white rounded-[8px] overflow-scroll">
//                 <div className="h-full w-full">
//                     <div className="w-[calc((100vw-32px))] mr-[16px] fixed z-[999] bg-[#E9EBED] h-[36px] px-[12px] py-[8px] flex justify-between text-[10px] text-[#1F1F1F] font-[600] leading-[16px] tracking-[1.5px] items-center ">
//                         <p className="text-[10px]">STT</p>
//                         <p className="w-fit mr-[60px] text-[10px]">
//                             Khách hàng
//                         </p>
//                         <p className=" w-fit mr-[2rem] text-[10px]">
//                             Số điện thoại
//                         </p>
//                     </div>
//                     <div className="mt-[40px]">
//                         {allCustomers
//                             .slice(0, 350)
//                             .map((customer: any, index: number) => {
//                                 return (
//                                     <BoxRowCustomerNav
//                                         key={index}
//                                         index={index + 1}
//                                         customer={customer}
//                                         setActiveCustomerDiverting={
//                                             setActiveCustomerDiverting
//                                         }
//                                         setCustomerSelected={
//                                             setCustomerSelected
//                                         }
//                                     />
//                                 );
//                             })}
//                     </div>
//                 </div>
//             </div>
//             {activeCustomerDiverting && (
//                 <ModalDivertingConfirm
//                     setActiveCustomerDiverting={setActiveCustomerDiverting}
//                     customer={customerSelected}
//                     active={activeCustomerDiverting}
//                 />
//             )}
//         </div>
//     );
// };

// export default TableCustomerNav;

// interface BoxCustomerParams {
//     index: number;
//     customer: any;

//     classNameStatistic?: string;
//     setActiveCustomerDiverting: (e: boolean) => void;
//     setCustomerSelected: any;
// }
// const BoxRowCustomerNav = (props: BoxCustomerParams) => {
//     const {
//         index,
//         customer,
//         classNameStatistic,
//         setActiveCustomerDiverting,
//         setCustomerSelected,
//     } = props;

//     return (
//         <div
//             className={`w-full h-auto flex items-center p-[12px]  justify-between text-[10px] text-[#36383A] font-[400] leading-[16px] border-b-[0.5px] border-b-[#E9EBED] `}
//         >
//             <div className="flex items-center">
//                 {index < 10 ? "0" + index : index}
//             </div>
//             <div
//                 className={`w-[180px] ml-[15px] flex items-center ${
//                     customer.avatar ? "justify-start ml-[15px]" : ""
//                 } gap-[6px]`}
//             >
//                 {customer.avatar ? (
//                     <Avatar size={26} src={customer.avatar} />
//                 ) : (
//                     <Avatar size={26} src="" />
//                 )}
//                 <div className="w-fit capitalize">{customer.name}</div>
//             </div>
//             <div
//                 className={`w-[100px] flex justify-between ${classNameStatistic}`}
//             >
//                 <div>{customer.phone}</div>
//                 {customer.zalo_id !== null || customer.phone ? (
//                     <div
//                         onClick={() => {
//                             setActiveCustomerDiverting(true),
//                                 setCustomerSelected(customer);
//                         }}
//                     >
//                         <Icon icon="zi-chat" size={16} />
//                     </div>
//                 ) : (
//                     <></>
//                 )}
//             </div>
//         </div>
//     );
// };
// import * as React from "react";
// import Box from "@mui/material/Box";
// import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

// const columns: GridColDef[] = [
//     { field: "key", headerName: "Key", width: 90 },
//     {
//         field: "name",
//         headerName: "Tên khách hàng",
//         width: 150,
//         sortable: false,
//     },
//     {
//         field: "phone",
//         headerName: "Số điện thoại",
//         width: 150,
//         sortable: false,
//     },
// ];

// const rows = [
//     { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
//     { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
//     { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
//     { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
//     { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
//     { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
//     { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
//     { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
//     { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
// ];

// export default function TableCustomerNav(props: TableCustomerNavProps) {
//     const { allCustomers } = props;
//     console.log("allCustomers", allCustomers);
//     return (
//         <Box sx={{ height: 400, width: "100%" }}>
//             <DataGrid
//                 rows={allCustomers}
//                 columns={columns}
//                 initialState={{
//                     pagination: {
//                         paginationModel: {
//                             pageSize: 5,
//                         },
//                     },
//                 }}
//                 pageSizeOptions={[5]}
//                 disableRowSelectionOnClick
//             />
//         </Box>
//     );
// }
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import TableHead from "@mui/material/TableHead";
import { useEffect, useState } from "react";
import { Icon } from "zmp-ui";
import ModalDivertingConfirm from "./ModalDivertingConfirm";

interface Column {
  id: any;
  label: string;
  minWidth?: number;
  align?: any;
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  {
    id: "index",
    label: "STT",
    minWidth: 2,
    align: "center",
  },
  {
    id: "name",
    label: "Tên khách hàng",
    // minWidth: 170,
    align: "left",
  },
  {
    id: "phone",
    label: "Số điện thoại",
    minWidth: 120,
    align: "left",
    // format: (value: number) => value.toLocaleString("en-US"),
  },
];

export default function TableCustomerNav(props: TableCustomerNavProps) {
  const { allCustomers } = props;
  const [data, setData] = useState<any>([]);
  const [activeCustomerDiverting, setActiveCustomerDiverting] =
    useState<boolean>(false);
  const [customerSelected, setCustomerSelected] = useState<any>();
  useEffect(() => {
    if (allCustomers) {
      formatData(allCustomers);
    }
    return;
  }, [allCustomers]);
  const formatData = (data: any) => {
    const dataAddIndex = allCustomers.map((item, index) => {
      return { ...item, index: index < 10 ? "0" + (index + 1) : index };
    });
    console.log("dataAddIndex", dataAddIndex);
    setData(dataAddIndex);
  };
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    fontSize: "10px",
                    backgroundColor: "#E9EBED",
                    fontWeight: "bold",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow
                    hover={false}
                    // role="checkbox"
                    tabIndex={-1}
                    key={index}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ fontSize: "10px" }}
                        >
                          {column.id == "phone" ? (
                            <div>
                              {" "}
                              <div
                                className={`w-[100px] flex justify-between `}
                              >
                                <div>{value}</div>
                                {value ? (
                                  <div
                                    onClick={() => {
                                      setActiveCustomerDiverting(true),
                                        setCustomerSelected(row);
                                    }}
                                  >
                                    <Icon icon="zi-chat" size={16} />
                                  </div>
                                ) : (
                                  <></>
                                )}
                              </div>
                            </div>
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        style={{ width: "100%" }}
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={allCustomers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {activeCustomerDiverting && (
        <ModalDivertingConfirm
          setActiveCustomerDiverting={setActiveCustomerDiverting}
          customer={customerSelected}
          active={activeCustomerDiverting}
        />
      )}
    </Paper>
  );
}
