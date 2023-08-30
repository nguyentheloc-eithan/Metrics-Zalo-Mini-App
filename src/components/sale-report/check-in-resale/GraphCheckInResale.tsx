import { Column } from "@ant-design/charts";
import useFetchClinic from "common/stores/clinics/clinic-revenue";
import React, { useEffect, useState } from "react";
interface DataBarChart {
    clinic: string;
    value: number;
    type: string;
}

const dataT = [
    {
        clinic_name: "clinic",
        new: 70,
        old: 26,
        total: 96,
    },
    {
        clinic_name: "clinic1",
        new: 72,
        old: 2,
        total: 74,
    },
    {
        clinic_name: "clinic2",
        new: 60,
        old: 6,
        total: 16,
    },
    {
        clinic_name: "clinic3",
        new: 90,
        old: 1,
        total: 11,
    },
    {
        clinic_name: "clinic4",
        new: 70,
        old: 22,
        total: 92,
    },
    {
        clinic_name: "clinic5",
        new: 55,
        old: 12,
        total: 67,
    },
    {
        clinic_name: "clinic6",
        new: 95,
        old: 47,
        total: 142,
    },
];
const GraphCheckInResale = () => {
    const { clinics } = useFetchClinic();
    const [data, setData] = useState<DataBarChart[]>([]);

    useEffect(() => {
        if (clinics) {
            const dataClinicRevenue = dataT.map((clinic) => {
                return {
                    clinic: clinic.clinic_name,
                    value: clinic.new,
                    type: "Khách hàng mới",
                };
            });
            const dataClinicDebit = dataT.map((clinic) => {
                return {
                    clinic: clinic.clinic_name,
                    value: clinic.old,
                    type: "Khách hàng cũ",
                };
            });
            const mergedData = [...dataClinicRevenue, ...dataClinicDebit];
            setData(mergedData);
        }
    }, [clinics]);
    const config = {
        autoFit: true,
        isStack: false,
        xField: "clinic",
        yField: "value",
        seriesField: "type",
        // legend: false,
        label: false,
        interactions: [
            {
                type: "active-region",
                enable: false,
            },
        ],
        xAxis: false,
        yAxis: {},
        color: ["#5A68ED", "#8F9499"],

        columnBackground: {
            style: {
                fill: "rgba(0,0,0,0.1)",
            },
        },
    };
    return <Column {...(config as any)} data={[...data]} key={"graph-1"} />;
};

export default GraphCheckInResale;
