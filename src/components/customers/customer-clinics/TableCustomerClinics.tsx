import React, { useState } from "react";

import useFetchCustomers from "common/stores/customers/customers";
import BulletPoint from "components/button/BulletPoint";
import BoxRow from "components/overall-statistics/table/BoxCustomer";

const TableCustomerClinics = () => {
    const { customers } = useFetchCustomers();

    const [isAllCustomers, setIsAllCustomers] = useState<boolean>(true);
    const [isNewCustomers, setIsNewCustomers] = useState<boolean>(false);

    const handleClickBulletPoint = (type: string) => {
        if (type == "allCustomers") {
            if (isAllCustomers) {
                setIsAllCustomers(false);
            } else {
                setIsAllCustomers(true);
                setIsNewCustomers(false);
            }
            return;
        } else if (type == "newCustomers") {
            if (isNewCustomers) {
                setIsNewCustomers(false);
            } else {
                setIsNewCustomers(true);
                setIsAllCustomers(false);
            }
            return;
        }
    };
    return (
        <div className="p-[16px] flex flex-col gap-[16px] bg-white rounded-[8px]">
            <div>
                <div className="w-full bg-[#E9EBED] h-[36px] px-[12px] py-[8px] flex justify-between text-[10px] text-[#1F1F1F] font-[600] leading-[16px] tracking-[1.5px] items-center">
                    <p>STT</p>
                    <p>Cơ sở</p>
                    <p className="w-[120px]">
                        {isAllCustomers ? "Tổng số K.Hàng" : "Khách hàng mới"}
                    </p>
                </div>
                <div>
                    {customers.map((clinic, index) => {
                        return (
                            <BoxRow
                                classNameStatistic={`${
                                    isNewCustomers
                                        ? "text-[#5A68ED]"
                                        : "text-[#36383A]"
                                }`}
                                key={index}
                                avatar={clinic.clinic_avatar}
                                name={clinic.clinic_name}
                                index={index + 1}
                                money={
                                    isAllCustomers
                                        ? clinic.total
                                        : isNewCustomers
                                        ? clinic.new
                                        : clinic.total
                                }
                                currency={"khách"}
                            />
                        );
                    })}
                </div>
            </div>
            <div className="mt-[16px] flex gap-[16px]">
                <BulletPoint
                    onClick={() => {
                        handleClickBulletPoint("allCustomers");
                    }}
                    text={"Tổng số khách"}
                    color={isAllCustomers ? "#36383A" : "#D6D9DC"}
                    enable={isAllCustomers}
                />
                <BulletPoint
                    onClick={() => {
                        handleClickBulletPoint("newCustomers");
                    }}
                    text={"Khách mới"}
                    color={isNewCustomers ? "#5A68ED" : "#A3ABF5"}
                    enable={isNewCustomers}
                />
            </div>
        </div>
    );
};

export default TableCustomerClinics;
