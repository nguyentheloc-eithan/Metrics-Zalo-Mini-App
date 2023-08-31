import React from "react";

import BulletPoint from "components/button/BulletPoint";
import { DataServices } from "pages/revenue";
import BoxRow from "./BoxCustomer";

interface TableTopServicesProps {
    topServices: DataServices[];
    revenueFilter: boolean;
    customerPaidFilter: boolean;
    debitFilter: boolean;
}
const TableTopCategories = (props: TableTopServicesProps) => {
    const { topServices, revenueFilter, customerPaidFilter, debitFilter } =
        props;
    return (
        <div className="p-[16px] flex flex-col gap-[16px] bg-white rounded-[8px]">
            <div className="text-[14px] font-[700] leading-[20px] tracking-[0.1px]">
                Top 5 dịch vụ
            </div>
            <div>
                <div className="w-full bg-[#E9EBED] h-[36px] px-[12px] py-[8px] flex justify-between text-[10px] text-[#1F1F1F] font-[600] leading-[16px] tracking-[1.5px] items-center">
                    <p className="w-[30px] flex flex-start">STT</p>
                    <p className="w-[100px] flex flex-start mr-[70px]">
                        Dịch vụ
                    </p>
                    <p>
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
                    {topServices.map((service, index) => {
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
                                name={service.type}
                                index={index + 1}
                                avatar={service.service_image}
                                money={
                                    revenueFilter
                                        ? service.revenue
                                        : customerPaidFilter
                                        ? service.customer_paid
                                        : debitFilter
                                        ? service.debit
                                        : service.revenue
                                }
                                currency={"đ"}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default TableTopCategories;
