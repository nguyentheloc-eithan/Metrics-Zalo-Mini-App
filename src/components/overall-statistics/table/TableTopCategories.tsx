import { DataCategories } from "pages/revenue";
import React from "react";
import BoxRow from "./BoxCustomer";

interface TableTopCategoriesProps {
    topCategories: DataCategories[];
}
const TableTopCategories = (props: TableTopCategoriesProps) => {
    const { topCategories } = props;
    return (
        <div className="p-[16px] flex flex-col gap-[16px] bg-white rounded-[8px]">
            <div className="text-[14px] font-[700] leading-[20px] tracking-[0.1px]">
                Top 5 danh mục
            </div>
            <div>
                <div className="w-full bg-[#E9EBED] h-[36px] px-[12px] py-[8px] flex justify-around text-[10px] text-[#1F1F1F] font-[600] leading-[16px] tracking-[1.5px] items-center">
                    <p>STT</p>
                    <p className="w-[142px]">Danh mục</p>
                    <p className="w-[100px]">Doanh thu</p>
                </div>
                <div>
                    {topCategories.map((customer, index) => {
                        return (
                            <BoxRow
                                key={index}
                                name={customer.type}
                                index={index + 1}
                                money={customer.revenue}
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
