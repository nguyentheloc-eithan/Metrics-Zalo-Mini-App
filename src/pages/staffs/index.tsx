import { message } from "antd";
import useDateFilter from "common/stores/date-filter";
import useFetchStaffStatistics from "common/stores/staffs/staff-statistics";
import ButtonIcon from "components/button/ButtonIcon";
import LoadingSquareSpin from "components/loading";
import ModalDatePicker from "components/modals/ModalDatePicker";

import BoxStatistics from "components/overall-statistics/box-statistics";
import StaffStatistics from "components/staffs";
import dayjs from "dayjs";

import React, { useEffect, useState } from "react";
import { ExportParams } from "services/rpc/clinic-revenue";
import {
    getStaffAttendance,
    getStaffStatistics,
} from "services/rpc/staffs/staffs";
import { dateRangeOptions } from "utils/date-data-filter";
import { temp } from "utils/date-params-default";
import { formatMoney } from "utils/money-format";
import { Header } from "zmp-ui";

const StaffsPage = () => {
    const { setAllStaffStatistics, setAllStaffAttendances } =
        useFetchStaffStatistics();

    const [totalStaffs, setTotalStaffs] = useState<number>(0);
    const [totalNew, setTotalNew] = useState<number>(0);
    const [totalUserPhones, setTotalUserPhones] = useState<number>(0);
    const { dateFilter, setDateFilter } = useDateFilter();
    const [date, setDate] = useState<ExportParams>(temp);
    const [datePickerEnable, setDatePickerEnable] = useState<boolean>(false);
    const [indexSelect, setIndexSelect] = useState<any>(3);

    const [loading, setLoading] = useState<boolean>(false);
    const [openModalDateRangePicker, setOpenModalDateRangePicker] =
        useState<boolean>(false);

    useEffect(() => {
        const fetchClinicOrdersStatistic = async () => {
            try {
                setLoading(true);
                const { allStaffStatistics, errorAllStaffStatistics } =
                    await getStaffStatistics(date);
                if (errorAllStaffStatistics) {
                    message.error(errorAllStaffStatistics.message);
                    return;
                }
                if (allStaffStatistics) {
                    setAllStaffStatistics(allStaffStatistics);
                    const allStaffs = allStaffStatistics.reduce(
                        (prev: any, cur: any) => prev + cur.total,
                        0,
                    );
                    const allNewStaffs = allStaffStatistics.reduce(
                        (prev: any, cur: any) => prev + cur.new,
                        0,
                    );
                    setTotalNew(allNewStaffs);
                    setTotalStaffs(allStaffs);
                }
                const { allStaffAttendance, errorAllStaffAttendance } =
                    await getStaffAttendance(date);
                if (errorAllStaffAttendance) {
                    message.error(errorAllStaffAttendance.message);
                    return;
                }
                if (allStaffAttendance) {
                    setAllStaffAttendances(allStaffAttendance);
                }
                // console.log("allStaffStatistics", allStaffStatistics);
                // console.log("allStaffAttendance", allStaffAttendance);
            } finally {
                setLoading(false);
            }
        };
        fetchClinicOrdersStatistic();
    }, [dateFilter]);
    const handleOnclickRange = (index: number, value: string) => {
        if (index == indexSelect) {
            setIndexSelect(null);
            setDate(temp);
            setDateFilter(temp);
        } else if (index !== indexSelect) {
            setIndexSelect(index);
            if (value == "thisWeek") {
                console.log("week");
                thisWeekStatistics();
            } else if (value == "thisMonth") {
                console.log("month");
                thisMonthStatistic();
            } else if (value == "today") {
                console.log("today");
                todayStatistics();
            } else if (value == "yesterday") {
                console.log("yesterday");
                yesterdayFilter();
            }
        }
    };
    const yesterdayFilter = () => {
        const currentDate = new Date();
        const previousDate = new Date(currentDate);
        previousDate.setDate(currentDate.getDate() - 1);
        const formatDate = dayjs(previousDate).format("YYYY-MM-DD");
        const dateNew: ExportParams = {
            start_date: formatDate,
            end_date: formatDate,
        };
        setDate(dateNew);
        setDateFilter(dateNew);
    };

    const thisWeekStatistics = () => {
        const now = dayjs().format("YYYY-MM-DD");
        const currentDate = new Date();
        const dayOfWeek = currentDate.getDay();
        const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

        const firstDayOfWeek = new Date(currentDate);
        firstDayOfWeek.setDate(currentDate.getDate() - daysToSubtract);
        const dateNew: ExportParams = {
            start_date: dayjs(firstDayOfWeek).format("YYYY-MM-DD"),
            end_date: now,
        };
        setDate(dateNew);
        setDateFilter(dateNew);
    };
    const todayStatistics = () => {
        const now = dayjs().format("YYYY-MM-DD");
        const dateNew: ExportParams = {
            start_date: now,
            end_date: now,
        };
        setDate(dateNew);
        setDateFilter(dateNew);
    };
    const thisMonthStatistic = () => {
        const now = dayjs().format("YYYY-MM-DD");
        const currentDate = new Date();

        const firstDayOfMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            1,
        );
        const dateNew: ExportParams = {
            start_date: dayjs(firstDayOfMonth).format("YYYY-MM-DD"),
            end_date: now,
        };
        setDate(dateNew);
        setDateFilter(dateNew);
    };
    const onHandleFilterDate = (date_start: string, date_end: string) => {
        const dateNew: ExportParams = {
            start_date: date_start,
            end_date: date_end,
        };
        setDate(dateNew);
        setDateFilter(dateNew);
        setOpenModalDateRangePicker(false);
    };
    const cancelFilterOnRangePicker = () => {
        setDatePickerEnable(false);
        const dateNew: ExportParams = {
            start_date: temp.start_date,
            end_date: temp.end_date,
        };
        setDate(dateNew);
        setDateFilter(dateNew);
    };
    return (
        <>
            <Header
                className="app-header no-border pl-4 flex-none pb-[6px] font-[500] leading-[26px] text-[20px] tracking-[0.15px]"
                showBackIcon={true}
                title="Nhân viên"
            />
            {loading ? (
                <LoadingSquareSpin />
            ) : (
                <div className="flex flex-col p-[16px] gap-[16px] overflow-y-scroll">
                    <div className="flex items-center justify-between">
                        <div className="w-full flex-wrap items-center justify-start flex gap-[5px]">
                            {dateRangeOptions.map((range, index) => {
                                return (
                                    <div
                                        onClick={() => {
                                            handleOnclickRange(
                                                index,
                                                range.value,
                                            );
                                        }}
                                        key={index}
                                        className={`${
                                            indexSelect == index
                                                ? "bg-[#36383A] text-white"
                                                : "bg-[white] text-[#36383A]"
                                        } rounded-[8px] text-[10px]  font-[400] leading-[16px] flex items-center justify-center w- h-[24px] px-[12px] py-[4px]`}
                                    >
                                        {range.title}
                                    </div>
                                );
                            })}
                        </div>
                        <div className="flex gap-[8px]">
                            {/* <ButtonIcon icon={"zi-location"} /> */}
                            <ButtonIcon
                                icon={"zi-calendar"}
                                onClick={() => {
                                    setDatePickerEnable(true);
                                    setOpenModalDateRangePicker(true);
                                    setIndexSelect(null);
                                }}
                                active={datePickerEnable}
                            />
                        </div>
                    </div>
                    {datePickerEnable && (
                        <ModalDatePicker
                            open={openModalDateRangePicker}
                            onClose={onHandleFilterDate}
                            setOpen={setDatePickerEnable}
                        />
                    )}
                    <div className="flex flex-col gap-[8px]">
                        <BoxStatistics
                            title={"Tổng số nhân viên"}
                            number={formatMoney(totalStaffs)}
                            current={"Nhân viên"}
                        />

                        <div className="flex gap-[8px]">
                            <BoxStatistics
                                title={"Nhân viên mới"}
                                number={formatMoney(totalNew)}
                                colorNumber={"#5A68ED"}
                                current={"Nhân viên"}
                            />
                            <BoxStatistics
                                title={"Lay-off (quit)"}
                                colorNumber={"#D8315B"}
                                number={formatMoney(totalUserPhones)}
                                current={"Nhân viên"}
                            />
                        </div>
                    </div>

                    <StaffStatistics />
                    {/* <TopSalers /> */}
                </div>
            )}
        </>
    );
};

export default StaffsPage;
