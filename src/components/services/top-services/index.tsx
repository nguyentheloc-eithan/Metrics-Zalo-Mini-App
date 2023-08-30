import ButtonIcon from "components/button/ButtonIcon";
import React, { useState } from "react";

import { ExportParams } from "services/rpc/clinic-revenue";

import GraphTopTenService from "./GraphTopTenService";
import TableTopTenServices from "./TableTopServices";

const TopServices = () => {
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
                    {`Top 10 dịch vụ mang lại doanh thu cao nhất ${
                        chartType ? "(đơn vị: triệu đồng)" : ""
                    }`}
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
                <div>
                    <TableTopTenServices />
                </div>
            ) : (
                <GraphTopTenService />
            )}
        </div>
    );
};

export default TopServices;
