import React, { useEffect, useState } from "react";
import BoxRow from "components/overall-statistics/table/BoxCustomer";
import useFetchClinicOrders from "common/stores/clinics/clinic-orders";
import BulletPoint from "components/button/BulletPoint";

const TableClinicOrders = () => {
    const { clinicOrders } = useFetchClinicOrders();

    const [paid, setPaid] = useState<boolean>(false);
    const [allOrders, setAllOrders] = useState<boolean>(true);
    const [unpaid, setUnpaid] = useState<boolean>(false);

    const [data, setData] = useState<any>([]);
    useEffect(() => {
        const filterDataNoCLinicName = () => {
            const dataNew = clinicOrders.filter((item: any) => {
                return item.clinic_data.clinic_name;
            });
            setData(dataNew);
        };
        filterDataNoCLinicName();
    }, [clinicOrders]);
    const handleClickBulletPoint = (type: string) => {
        if (type == "allOrders") {
            if (allOrders) {
                setAllOrders(false);
            } else {
                setAllOrders(true);
                setUnpaid(false);
                setPaid(false);
            }
            return;
        } else if (type == "unpaid") {
            if (unpaid) {
                setUnpaid(false);
            } else {
                setAllOrders(false);
                setUnpaid(true);
                setPaid(false);
            }
            return;
        } else if (type == "paid") {
            if (paid) {
                setPaid(false);
            } else {
                setAllOrders(false);
                setUnpaid(false);
                setPaid(true);
            }
        }
    };
    return (
        <div className="p-[16px] flex flex-col gap-[16px] bg-white rounded-[8px]">
            <div>
                <div className="w-full bg-[#E9EBED] h-[36px] px-[12px] py-[8px] flex justify-between text-[10px] text-[#1F1F1F] font-[600] leading-[16px] tracking-[1.5px] items-center">
                    <div>STT</div>
                    <div>Cơ sở</div>
                    <div className="w-[120px]">
                        {allOrders
                            ? "Tổng số orders"
                            : paid
                            ? "Có Thanh Toán"
                            : unpaid
                            ? "Chưa thanh toán"
                            : "Tổng số orders"}
                    </div>
                </div>
                <div>
                    {data.map((clinic, index) => {
                        return (
                            <BoxRow
                                classNameStatistic={`${
                                    unpaid
                                        ? "text-[#BC2449]"
                                        : paid
                                        ? "text-[#5A68ED]"
                                        : "text-[#36383A]"
                                }`}
                                key={index}
                                avatar={clinic.clinic_data.clinic_avatar}
                                name={clinic.clinic_data.clinic_name}
                                index={index + 1}
                                money={
                                    allOrders
                                        ? clinic.clinic_data.paid +
                                          clinic.clinic_data.unpaid
                                        : paid
                                        ? clinic.clinic_data.paid
                                        : unpaid
                                        ? clinic.clinic_data.unpaid
                                        : clinic.clinic_data.paid +
                                          clinic.clinic_data.unpaid
                                }
                                currency={"orders"}
                            />
                        );
                    })}
                </div>
                <div className="mt-[16px] flex gap-[16px]">
                    <BulletPoint
                        onClick={() => {
                            handleClickBulletPoint("allOrders");
                        }}
                        color={allOrders ? "#36383A" : "#D6D9DC"}
                        text={"Tổng order mới"}
                        enable={allOrders}
                    />
                    <BulletPoint
                        onClick={() => {
                            handleClickBulletPoint("paid");
                        }}
                        text={"Có thanh toán"}
                        color={paid ? "#5A68ED" : "#A3ABF5"}
                        enable={paid}
                    />
                    <BulletPoint
                        onClick={() => {
                            handleClickBulletPoint("unpaid");
                        }}
                        text={"Không có thanh toán"}
                        color={unpaid ? "#D8315B" : "#F2BBC9"}
                        enable={unpaid}
                    />
                </div>
            </div>
        </div>
    );
};

export default TableClinicOrders;
