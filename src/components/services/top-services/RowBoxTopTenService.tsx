import React from "react";
import { formatMoney } from "utils/money-format";
import { Avatar } from "zmp-ui";
interface BoxCustomerParams {
    name: string;
    index: number;
    avatar?: any;
    money?: any;
    currency: string;
    showCurrency?: boolean;
    classNameStatistic?: string;
    percentage: any;
}
const RowBoxTopTenService = (props: BoxCustomerParams) => {
    const {
        name,
        index,
        avatar,
        money,
        currency,
        percentage,
        classNameStatistic,
    } = props;

    return (
        <div
            className={`w-full h-auto flex items-center px-[12px] py-[8px] gap-[18px] text-[10px] text-[#36383A] font-[400] leading-[16px] border-b-[0.5px] border-b-[#E9EBED]`}
        >
            <div className="flex w-[10px] flex-start">{index}</div>
            <div
                className={`w-[135px] flex items-center  ${
                    avatar ? "justify-start ml-[5px]" : ""
                } gap-[6px]`}
            >
                {avatar ? (
                    <div className="w-[24px] h-[24px]">
                        <Avatar size={24} src={avatar} />
                    </div>
                ) : null}
                <div>{name}</div>
            </div>
            <div
                className={`w-[80px] flex justify-between ${classNameStatistic}`}
            >
                <div>{formatMoney(money)}</div>
                <div>{currency}</div>
            </div>
            <div className="w-[40px] text-center">{percentage}%</div>
        </div>
    );
};

export default RowBoxTopTenService;
