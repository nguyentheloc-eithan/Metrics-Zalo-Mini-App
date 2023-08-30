import React, { useState } from "react";

import useFetchCustomers from "common/stores/customers/customers";
import BulletPoint from "components/button/BulletPoint";
import BoxRow from "components/overall-statistics/table/BoxCustomer";
import useFetchStaffStatistics from "common/stores/staffs/staff-statistics";

const TableStaffStatistics = () => {
    const { customers } = useFetchCustomers();
    const { allStaffAttendances } = useFetchStaffStatistics();
    console.log("customers in table", customers);

    const [isRight, setIsRight] = useState<boolean>(true);
    const [isWrong, setIsWrong] = useState<boolean>(false);
    const [isNoCheck, setIsNoCheck] = useState<boolean>(false);

    const handleClickBulletPoint = (type: string) => {
        if (type == "allCustomers") {
            if (isRight) {
                setIsRight(false);
            } else {
                setIsRight(true);
                setIsWrong(false);
                setIsNoCheck(false);
            }
            return;
        } else if (type == "newCustomers") {
            if (isWrong) {
                setIsWrong(false);
            } else {
                setIsWrong(true);
                setIsRight(false);
                setIsNoCheck(false);
            }
            return;
        } else if (type == "noCheck") {
            if (isNoCheck) {
                setIsNoCheck(false);
            } else {
                setIsWrong(false);
                setIsRight(false);
                setIsNoCheck(true);
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
                        {isRight
                            ? "Chấm đúng"
                            : isWrong
                            ? "Chấm sai"
                            : isNoCheck
                            ? "Không chấm"
                            : "Chấm đúng"}
                    </p>
                </div>
                <div>
                    {allStaffAttendances.map((clinic, index) => {
                        return (
                            <BoxRow
                                classNameStatistic={`${
                                    isWrong
                                        ? "text-[#5A68ED]"
                                        : isRight
                                        ? "text-[#36383A]"
                                        : isNoCheck
                                        ? "text-[#D8315B]"
                                        : "text-[#36383A]"
                                }`}
                                key={index}
                                avatar={clinic.clinic_avatar}
                                name={clinic.clinic_name}
                                index={index + 1}
                                money={
                                    isRight
                                        ? clinic.right_count
                                        : isWrong
                                        ? clinic.wrong_count
                                        : isNoCheck
                                        ? clinic.not_do_count
                                        : clinic.right_count
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
                    text={"Chấm đúng"}
                    color={isRight ? "#34B764" : "#D1F5DE"}
                    enable={isRight}
                />
                <BulletPoint
                    onClick={() => {
                        handleClickBulletPoint("newCustomers");
                    }}
                    text={"Chấm sai"}
                    color={isWrong ? "#5A68ED" : "#A3ABF5"}
                    enable={isWrong}
                />
                <BulletPoint
                    onClick={() => {
                        handleClickBulletPoint("noCheck");
                    }}
                    text={"Không chấm"}
                    color={isNoCheck ? "#D8315B" : "#F2BBC9"}
                    enable={isNoCheck}
                />
            </div>
        </div>
    );
};

export default TableStaffStatistics;
