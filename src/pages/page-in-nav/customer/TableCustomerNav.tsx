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
                        <p className="w-fit mr-[60px] text-[10px]">
                            Khách hàng
                        </p>
                        <p className=" w-fit mr-[2rem] text-[10px]">
                            Số điện thoại
                        </p>
                    </div>
                    <div className="mt-[40px]">
                        {allCustomers
                            .slice(0, 150)
                            .map((customer: any, index: number) => {
                                return (
                                    <BoxRowCustomerNav
                                        index={index + 1}
                                        customer={customer}
                                        setActiveCustomerDiverting={
                                            setActiveCustomerDiverting
                                        }
                                        setCustomerSelected={
                                            setCustomerSelected
                                        }
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
            <div className="flex items-center">{index}</div>
            <div
                className={`w-[180px] flex items-center ${
                    customer.avatar ? "justify-start ml-[15px]" : ""
                } gap-[6px]`}
            >
                {customer.avatar ? (
                    <Avatar className="" size={26} src={customer.avatar} />
                ) : null}
                <div className="w-fit capitalize">{customer.name}</div>
            </div>
            <div
                className={`w-[100px] flex justify-between ${classNameStatistic}`}
            >
                <div>{customer.phone}</div>
                {customer.phone !== null ? (
                    <div
                        onClick={() => {
                            setActiveCustomerDiverting(true),
                                setCustomerSelected(customer);
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
