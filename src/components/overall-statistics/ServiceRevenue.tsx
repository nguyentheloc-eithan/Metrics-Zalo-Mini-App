import ButtonIcon from "components/button/ButtonIcon";
import React, { useState } from "react";
import TableTopCategories from "./table/TableTopCategories";
import TableTopServices from "./table/TableTopServices";
import GraphCategories from "./graph/graph-categories";
import GraphServices from "./graph/graph-services";
import { DataCategories, DataServices } from "pages/revenue";

const ServiceRevenue = () => {
    const [chartType, setChartType] = useState<boolean>(true);
    const [tableType, setTableType] = useState<boolean>(false);
    const [topCategories, setTopCategories] = useState<DataCategories[]>([]);
    const [topServices, setTopServices] = useState<DataServices[]>([]);
    const onClickChart = () => {
        setTableType(false);
        setChartType(true);
    };
    const onClickTable = () => {
        setChartType(false);
        setTableType(true);
    };
    return (
        <div className="p-[16px] h-fit flex flex-col gap-[16px] bg-white rounded-[8px]">
            <div className="flex items-center justify-between">
                <div className="text-[14px] font-[700] leading-[20px] tracking-[0.1px]">
                    Doanh thu theo dịch vụ
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
                    <TableTopCategories topCategories={topCategories} />
                    <TableTopServices topServices={topServices} />
                </div>
            ) : (
                <div>
                    <GraphCategories setTopCategories={setTopCategories} />
                    <GraphServices setTopServices={setTopServices} />
                </div>
            )}
        </div>
    );
};

export default ServiceRevenue;
