import { Pie } from "@ant-design/charts";
import { message } from "antd";
import { take } from "lodash";
import { DataServices } from "pages/revenue";
import React, { useEffect, useState } from "react";
import { ExportCategoriesParams } from "services/rpc/top-categories";
import { getTopServices } from "services/rpc/top-services";
const temp: ExportCategoriesParams = {
    start_date: "2023-01-01",
    end_date: "2023-06-01",
};

interface DataServiceFetch {
    customer_paid: number;
    debit: number;
    revenue: number;
    service_image: string;
    service_name: string;
    total: number;
}
interface GraphServicesProps {
    setTopServices: (e: DataServices[]) => void;
}

const GraphServices = (props: GraphServicesProps) => {
    const { setTopServices } = props;
    const [data, setData] = useState<DataServices[]>([]);

    useEffect(() => {
        const fetchCatagoriesData = async () => {
            try {
                const { dataServices, errorServices } =
                    await getTopServices(temp);
                if (dataServices) {
                    const top5Services: DataServiceFetch[] = take(
                        dataServices,
                        5,
                    );
                    const totalRevenueService: number = dataServices.reduce(
                        (prev: any, cur: any) => prev + cur.revenue,
                        0,
                    );
                    const formatTop5Services: DataServices[] = top5Services.map(
                        (item) => {
                            return {
                                type: item.service_name,
                                value: Math.floor(
                                    (item.revenue / totalRevenueService) * 100,
                                ),
                                revenue: item.revenue,
                                service_image: item.service_image,
                                customer_paid: item.customer_paid,
                                debit: item.debit,
                            };
                        },
                    );
                    setTopServices(formatTop5Services);
                    setData(formatTop5Services);
                }
                if (errorServices) {
                    message.error(errorServices.message);
                    return;
                }
            } finally {
            }
        };
        fetchCatagoriesData();
    }, []);

    const config = {
        appendPadding: 10,
        data,
        angleField: "value",
        colorField: "type",
        radius: 0.9,
        label: {
            type: "inner",
            offset: "-30%",
            content: ({ percent }) => `${(percent * 100).toFixed(2)}%`,
            style: {
                fontSize: 14,
                textAlign: "center",
            },
        },
        color: [
            "#182CDC",
            "#3547E9",
            "#5A68ED",
            "#7E8AF1",
            "#A3ABF5",
            "#C8CDF9",
        ],
        legend: {
            title: {
                text: "Top 5 dịch vụ",
                style: {
                    fontSize: 12,
                    fontWeight: 600,
                    lineHeight: 18,
                },
            },
        },
        interactions: [
            {
                type: "element-active",
            },
        ],
    };

    return (
        <>
            <Pie {...(config as any)} />
        </>
    );
};

export default GraphServices;
