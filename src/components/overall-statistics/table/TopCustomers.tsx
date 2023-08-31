import React, { useEffect, useState } from "react";

import BulletPoint from "components/button/BulletPoint";
import BoxRow from "./BoxCustomer";
import { ICustomer } from "common/types/customer";
import { take } from "lodash";

interface TopCustomerProps {
    customers: ICustomer[];
}
const TopCustomers = (props: TopCustomerProps) => {
    const { customers } = props;
    const [customerPaidFilter, setCustomerPaidFilter] =
        useState<boolean>(false);
    const [revenueFilter, setRevenueFilter] = useState<boolean>(true);
    const [debitFilter, setDebitFilter] = useState<boolean>(false);
    const [top5Customers, setTop5Customers] = useState<ICustomer[]>([]);
    const handleClickBulletPoint = (type: string) => {
        if (type == "revenue") {
            if (revenueFilter) {
                setRevenueFilter(false);
            } else {
                setRevenueFilter(true);
                setDebitFilter(false);
                setCustomerPaidFilter(false);
            }
            return;
        } else if (type == "debit") {
            if (debitFilter) {
                setDebitFilter(false);
            } else {
                setRevenueFilter(false);
                setDebitFilter(true);
                setCustomerPaidFilter(false);
            }
            return;
        } else if (type == "customer_paid") {
            if (customerPaidFilter) {
                setCustomerPaidFilter(false);
            } else {
                setRevenueFilter(false);
                setDebitFilter(false);
                setCustomerPaidFilter(true);
            }
        }
    };
    useEffect(() => {
        const filterTop5Customer = () => {
            const customersFilter: ICustomer[] = take(customers, 5);
            console.log(customersFilter);
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
                    <p className="text-[12px]">STT</p>
                    <p className="flex flex-start w-fit mr-[80px] text-[12px]">
                        Khách hàng
                    </p>
                    <p className={`w-fit  text-[12px]`}>
                        {revenueFilter
                            ? "Doanh thu"
                            : debitFilter
                            ? "Công nợ"
                            : customerPaidFilter
                            ? "Thực thu"
                            : "Doanh thu"}
                    </p>
                </div>
                <div>
                    {top5Customers.map((customer, index) => {
                        return (
                            <BoxRow
                                classNameStatistic={`${
                                    debitFilter
                                        ? "text-[#BC2449]"
                                        : customerPaidFilter
                                        ? "text-[#5A68ED]"
                                        : "text-[#36383A]"
                                }`}
                                key={index}
                                avatar={customer.customer_avatar}
                                name={customer.customer_name}
                                index={index + 1}
                                money={
                                    revenueFilter
                                        ? customer.revenue
                                        : customerPaidFilter
                                        ? customer.customer_paid
                                        : debitFilter
                                        ? customer.debit
                                        : customer.revenue
                                }
                                currency={"đ"}
                            />
                        );
                    })}
                </div>
                <div className="mt-[16px] flex gap-[16px]">
                    <BulletPoint
                        text={"Doanh thu"}
                        color={revenueFilter ? "#36383A" : "#D6D9DC"}
                        enable={revenueFilter}
                        onClick={() => {
                            handleClickBulletPoint("revenue");
                        }}
                    />
                    <BulletPoint
                        text={"Thực thu"}
                        color={customerPaidFilter ? "#5A68ED" : "#A3ABF5"}
                        enable={customerPaidFilter}
                        onClick={() => {
                            handleClickBulletPoint("customer_paid");
                        }}
                    />
                    <BulletPoint
                        text={"Công nợ"}
                        color={debitFilter ? "#D8315B" : "#F2BBC9"}
                        enable={debitFilter}
                        onClick={() => {
                            handleClickBulletPoint("debit");
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default TopCustomers;
