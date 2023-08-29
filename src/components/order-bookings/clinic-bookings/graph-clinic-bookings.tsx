import { Column } from "@ant-design/charts";
import useFetchClinicBookings from "common/stores/clinics/clinic-bookings";

import React, { useEffect, useState } from "react";

interface DataClinicOrders {
    clinic_name: string;
    bookings: any;
    value: any;
    type: string;
}
const GraphClinicBookings = () => {
    const { clinicBookings } = useFetchClinicBookings();

    const [data, setData] = useState<DataClinicOrders[]>([]);

    useEffect(() => {
        if (clinicBookings) {
            const formatDataNew = clinicBookings.map((item: any) => {
                return {
                    clinic_name: item.clinic_data.clinic_name,
                    value: item.clinic_data.new,
                    type: "Mới",
                };
            });
            const formatDataOld = clinicBookings.map((item: any) => {
                return {
                    clinic_name: item.clinic_data.clinic_name,
                    value: item.clinic_data.old,
                    type: "Cũ",
                };
            });

            const mergedData = [...formatDataNew, ...formatDataOld];
            setData(mergedData);
        }
    }, [clinicBookings]);
    const config = {
        autoFit: true,
        isStack: false,
        xField: "clinic_name",
        yField: "value",
        seriesField: "type",
        label: false,
        interactions: [
            {
                type: "active-region",
                enable: true,
            },
        ],
        columnBackground: {
            style: {
                fill: "rgba(0,0,0,0.1)",
            },
        },
    };

    return <Column {...(config as any)} data={[...data]} key={"graph-1"} />;
};

export default GraphClinicBookings;
