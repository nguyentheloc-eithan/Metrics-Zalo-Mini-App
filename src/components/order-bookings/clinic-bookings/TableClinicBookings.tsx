import React, { useEffect, useState } from "react";

import BulletPoint from "components/button/BulletPoint";
import BoxRow from "components/overall-statistics/table/BoxCustomer";
import useFetchClinicBookings from "common/stores/clinics/clinic-bookings";

const TableClinicBookings = () => {
    const { clinicBookings } = useFetchClinicBookings();

    const [isAllBookings, setIsAllBookings] = useState<boolean>(true);
    const [isNew, setIsNew] = useState<boolean>(false);
    const [isOld, setIsOld] = useState<boolean>(false);

    const [data, setData] = useState<any>([]);
    useEffect(() => {
        const filterDataNoCLinicName = () => {
            const dataNew = clinicBookings.filter((item: any) => {
                return item.clinic_data.clinic_name;
            });
            setData(dataNew);
        };
        filterDataNoCLinicName();
    }, [clinicBookings]);
    const handleClickBulletPoint = (type: string) => {
        if (type == "allBookings") {
            if (isAllBookings) {
                setIsAllBookings(false);
            } else {
                setIsAllBookings(true);
                setIsNew(false);
                setIsOld(false);
            }
            return;
        } else if (type == "new") {
            if (isNew) {
                setIsNew(false);
            } else {
                setIsAllBookings(false);
                setIsNew(true);
                setIsOld(false);
            }
            return;
        } else if (type == "old") {
            if (isOld) {
                setIsOld(false);
            } else {
                setIsAllBookings(false);
                setIsNew(false);
                setIsOld(true);
            }
        }
    };
    return (
        <div className="p-[16px] flex flex-col gap-[16px] bg-white rounded-[8px]">
            <div>
                <div className="w-full bg-[#E9EBED] h-[36px] px-[12px] py-[8px] flex justify-between text-[10px] text-[#1F1F1F] font-[600] leading-[16px] tracking-[1.5px] items-center">
                    <p>STT</p>
                    <p>Cơ sở</p>
                    <p className="w-[120px]">Tổng số bookings</p>
                </div>
                <div>
                    {data.map((clinic, index) => {
                        return (
                            <BoxRow
                                classNameStatistic={`${
                                    isOld
                                        ? "text-[#BC2449]"
                                        : isNew
                                        ? "text-[#5A68ED]"
                                        : "text-[#36383A]"
                                }`}
                                key={index}
                                avatar={clinic.clinic_data.clinic_avatar}
                                name={clinic.clinic_data.clinic_name}
                                index={index + 1}
                                money={
                                    isAllBookings
                                        ? clinic.clinic_data.new +
                                          clinic.clinic_data.old
                                        : isNew
                                        ? clinic.clinic_data.new
                                        : isOld
                                        ? clinic.clinic_data.old
                                        : clinic.clinic_data.new +
                                          clinic.clinic_data.old
                                }
                                currency={"bookings"}
                            />
                        );
                    })}
                </div>
            </div>
            <div className="mt-[16px] flex gap-[16px]">
                <BulletPoint
                    onClick={() => {
                        handleClickBulletPoint("allBookings");
                    }}
                    text={"Tổng số bookings"}
                    color={isAllBookings ? "#36383A" : "#D6D9DC"}
                    enable={isAllBookings}
                />
                <BulletPoint
                    onClick={() => {
                        handleClickBulletPoint("new");
                    }}
                    text={"Mới"}
                    color={isNew ? "#5A68ED" : "#A3ABF5"}
                    enable={isNew}
                />
                <BulletPoint
                    text={"Cũ"}
                    onClick={() => {
                        handleClickBulletPoint("old");
                    }}
                    color={isOld ? "#D8315B" : "#F2BBC9"}
                    enable={isOld}
                />
            </div>
        </div>
    );
};

export default TableClinicBookings;
