import ButtonIcon from "components/button/ButtonIcon";
import React, { useState } from "react";
import TableTopCategories from "./table/TableTopCategories";
import TableTopServices from "./table/TableTopServices";
import GraphCategories from "./graph/graph-categories";
import GraphServices from "./graph/graph-services";
import { DataCategories, DataServices } from "pages/revenue";
import BulletPoint from "components/button/BulletPoint";

const ServiceRevenue = () => {
    const [chartType, setChartType] = useState<boolean>(true);
    const [tableType, setTableType] = useState<boolean>(false);
    const [topCategories, setTopCategories] = useState<DataCategories[]>([]);
    const [topServices, setTopServices] = useState<DataServices[]>([]);

    const [customerPaidFilter, setCustomerPaidFilter] =
        useState<boolean>(false);
    const [revenueFilter, setRevenueFilter] = useState<boolean>(true);
    const [debitFilter, setDebitFilter] = useState<boolean>(false);
    const onClickChart = () => {
        setTableType(false);
        setChartType(true);
    };
    const onClickTable = () => {
        setChartType(false);
        setTableType(true);
    };
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
                    <TableTopCategories
                        topCategories={topCategories}
                        revenueFilter={revenueFilter}
                        customerPaidFilter={customerPaidFilter}
                        debitFilter={debitFilter}
                    />
                    <TableTopServices
                        topServices={topServices}
                        revenueFilter={revenueFilter}
                        customerPaidFilter={customerPaidFilter}
                        debitFilter={debitFilter}
                    />
                    <div className="mt-[16px] flex gap-[16px]">
                        <BulletPoint
                            onClick={() => {
                                handleClickBulletPoint("revenue");
                            }}
                            color={revenueFilter ? "#36383A" : "#D6D9DC"}
                            text={"Doanh thu"}
                            enable={revenueFilter}
                        />
                        <BulletPoint
                            onClick={() => {
                                handleClickBulletPoint("customer_paid");
                            }}
                            text={"Thực thu"}
                            color={customerPaidFilter ? "#5A68ED" : "#A3ABF5"}
                            enable={customerPaidFilter}
                        />
                        <BulletPoint
                            onClick={() => {
                                handleClickBulletPoint("debit");
                            }}
                            text={"Công nợ"}
                            color={debitFilter ? "#D8315B" : "#F2BBC9"}
                            enable={debitFilter}
                        />
                    </div>
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
