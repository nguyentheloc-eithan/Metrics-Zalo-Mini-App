import { message } from "antd";
import useFetchClinicCustomers from "common/stores/customers/customer-clinics";
import useDateFilter from "common/stores/date-filter";
import useFetchTopServiceBookings from "common/stores/services/service-bookings";
import useFetchServicesRevenue from "common/stores/services/service-revenue";
import useFetchTopTenServices from "common/stores/services/top-ten-services";
import ButtonIcon from "components/button/ButtonIcon";
import LoadingSquareSpin from "components/loading";
import ModalDatePicker from "components/modals/ModalDatePicker";

import BoxStatistics from "components/overall-statistics/box-statistics";
import TopServiceBookings from "components/services/top-service-bookings";
import TopServices from "components/services/top-services";
import dayjs from "dayjs";
import { take } from "lodash";

import React, { useEffect, useState } from "react";
import { ExportParams } from "services/rpc/clinic-revenue";
import {
    getTopServiceBookings,
    getTopServices,
} from "services/rpc/top-services";
import { dateRangeOptions } from "utils/date-data-filter";
import { temp } from "utils/date-params-default";
import { formatMoney } from "utils/money-format";
import { Header } from "zmp-ui";

interface DataCategories {
    type: string;
    value: number;
    revenue: number;
}
interface DataServices {
    value: number;
    type: string;
    revenue: number;
    service_image: string;
}

const ServicesPage = () => {
    const { setTopTenServices } = useFetchTopTenServices();
    const {
        setServicesRevenue,
        setSumServiceRevenue,
        setSumServiceCustomerPaid,
        setSumServiceDebit,
        setSumServiceTotalBookings,
    } = useFetchServicesRevenue();
    const [allRevenueServices, setAllRevenueServices] = useState<string>("");
    const [realRevenue, setRealRevenue] = useState<string>("");
    const [allDebit, setAllDebit] = useState<string>("");
    const { setTopServiceBookings } = useFetchTopServiceBookings();

    const [indexSelect, setIndexSelect] = useState<any>(3);
    const [loading, setLoading] = useState<boolean>(false);

    const { dateFilter, setDateFilter } = useDateFilter();
    const [date, setDate] = useState<ExportParams>(temp);
    const [datePickerEnable, setDatePickerEnable] = useState<boolean>(false);
    const [openModalDateRangePicker, setOpenModalDateRangePicker] =
        useState<boolean>(false);

    useEffect(() => {
        const fetchTopTenServices = async () => {
            try {
                setLoading(true);
                const { dataServiceBookings, errorServiceBookings } =
                    await getTopServiceBookings(date);
                if (errorServiceBookings) {
                    message.error(errorServiceBookings.message);
                    return;
                }
                if (dataServiceBookings) {
                    setTopServiceBookings(dataServiceBookings);
                }
                const { dataServices, errorServices } =
                    await getTopServices(date);
                if (errorServices) {
                    message.error(errorServices.message);
                    return;
                }
                if (dataServices) {
                    //TODO: Trash code => need to reduce at next time.
                    setServicesRevenue(dataServices);
                    const setTop10 = take(dataServices, 10);
                    const revenue = formatMoney(
                        dataServices.reduce(
                            (prev: any, cur: any) => prev + cur.revenue,
                            0,
                        ),
                    );
                    const sum_customer_paid = formatMoney(
                        dataServices.reduce(
                            (prev: any, cur: any) => prev + cur.customer_paid,
                            0,
                        ),
                    );
                    const sum_debit = formatMoney(
                        dataServices.reduce(
                            (prev: any, cur: any) => prev + cur.debit,
                            0,
                        ),
                    );
                    const revenueSum = dataServices.reduce(
                        (prev: any, cur: any) => prev + cur.revenue,
                        0,
                    );
                    const debitSum = dataServices.reduce(
                        (prev: any, cur: any) => prev + cur.debit,
                        0,
                    );
                    const totalBookingsSum = dataServices.reduce(
                        (prev: any, cur: any) => prev + cur.total,
                        0,
                    );
                    const customerPaidSum = dataServices.reduce(
                        (prev: any, cur: any) => prev + cur.customer_paid,
                        0,
                    );
                    setSumServiceCustomerPaid(customerPaidSum);
                    setSumServiceDebit(debitSum);
                    setSumServiceTotalBookings(totalBookingsSum);
                    setSumServiceRevenue(revenueSum);
                    setAllDebit(sum_debit);
                    setRealRevenue(sum_customer_paid);
                    setAllRevenueServices(revenue);
                    setTopTenServices(setTop10);
                    /*** fetch services have most bookings **/
                }
            } finally {
                setLoading(false);
            }
        };
        fetchTopTenServices();
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
                title="Dịch vụ"
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
                            <ButtonIcon icon={"zi-location"} />
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
                            title={"Doanh thu của dịch vụ"}
                            number={allRevenueServices}
                            current={"đ"}
                        />

                        <div className="flex gap-[8px]">
                            <BoxStatistics
                                title={"Thực thu"}
                                number={realRevenue}
                                current={"đ"}
                            />
                            <BoxStatistics
                                title={"Công nợ"}
                                number={allDebit}
                                colorNumber={"#5A68ED"}
                                current={"đ"}
                            />
                        </div>
                    </div>
                    <TopServices />
                    <TopServiceBookings />
                    {/* <TopSalers /> */}
                </div>
            )}
        </>
    );
};

export default ServicesPage;

export type { DataCategories, DataServices };
