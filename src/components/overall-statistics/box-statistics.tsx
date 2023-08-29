import React from "react";
interface BoxStatisticParams {
    title: string;
    number: any;
    colorNumber?: string;
    current: string;
}

const BoxStatistics = (props: BoxStatisticParams) => {
    const { title, number, colorNumber = "#36383A", current } = props;
    return (
        <div className="bg-white rounded-[8px] w-full py-[8px] px-[16px] flex flex-col">
            <div className="text-[10px] text-[#36383A] font-[400] leading-[16px] tracking-[1.5px]">
                {title}
            </div>
            <div
                className={`text-[18px] font-[600] leading-[36px] flex items-center justify-between`}
                style={{ color: `${colorNumber}` }}
            >
                {number}
                <p className="text-[16px] leading-[24px] tracking-[0.5px]">
                    {current}
                </p>
            </div>
        </div>
    );
};

export default BoxStatistics;
