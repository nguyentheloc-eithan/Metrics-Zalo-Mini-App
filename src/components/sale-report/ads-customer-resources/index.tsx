import ButtonIcon from "components/button/ButtonIcon";
import React, { useState } from "react";

const AdsCustomerResources = () => {
    const [chartType, setChartType] = useState<boolean>(true);
    const [tableType, setTableType] = useState<boolean>(false);

    const onClickChart = () => {
        setTableType(false);
        setChartType(true);
    };
    const onClickTable = () => {
        setChartType(false);
        setTableType(true);
    };

    return (
        <div className="p-[16px] flex flex-col gap-[16px] bg-white rounded-[8px]">
            <div className="flex items-center justify-between">
                <div className="text-[14px] font-[700] leading-[20px] tracking-[0.1px]">
                    Phần trăm khách hàng theo nguồn Ads
                </div>
                <div className="flex gap-[8px]">
                    <ButtonIcon
                        onClick={onClickTable}
                        icon={"zi-list-1"}
                        active={tableType}
                    />
                    <ButtonIcon
                        onClick={onClickChart}
                        icon={"zi-poll-solid"}
                        active={chartType}
                    />
                </div>
            </div>
            {chartType == false ? (
                <div>Chưa có data về trường thông tin này</div>
            ) : (
                <>Chưa có data về trường thông tin này</>
            )}
        </div>
    );
};

export default AdsCustomerResources;
