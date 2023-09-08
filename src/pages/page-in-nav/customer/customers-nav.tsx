import useFetchZaloCustomers from "common/stores/customers/zalo-customers";
import { ICustomerZalo } from "common/types/customer";
import ButtonIcon from "components/button/ButtonIcon";
import LoadingSquareSpin from "components/loading";
import React, { useEffect, useState } from "react";
import { supabase } from "services/supabase";
import { Header, Input } from "zmp-ui";
import ModalDivertingConfirm from "./ModalDivertingConfirm";
import TableCustomerNav from "./TableCustomerNav";
import { ExportParams } from "services/rpc/clinic-revenue";
import { temp } from "utils/date-params-default";
import useDateFilter from "common/stores/date-filter";

const actionFilter = [
  {
    title: "Có Zalo ID",
    value: "hasZaloId",
  },
  {
    title: "Có số điện thoại",
    value: "havePhoneNumber",
  },
];

const CustomersNav = () => {
  const { setZaloCustomers, zaloCustomers } = useFetchZaloCustomers();
  const { setDateFilter } = useDateFilter();
  const [allCustomers, setAllCustomers] = useState<ICustomerZalo[]>([]);
  const [initAllCustomers, setInitAllCustomer] = useState<ICustomerZalo[]>([]);

  const [allCustomersHasZaloId, setAllCustomersHasZaloId] = useState<
    ICustomerZalo[]
  >([]);
  const [allCustomersHavePhone, setAllCustomersHavePhone] = useState<
    ICustomerZalo[]
  >([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [indexSelect, setIndexSelect] = useState<any>(0);
  const [date, setDate] = useState<ExportParams>(temp);

  const [datePickerEnable, setDatePickerEnable] = useState<boolean>(false);
  const [openModalDateRangePicker, setOpenModalDateRangePicker] =
    useState<boolean>(false);
  const onHandleFilterDate = (date_start: string, date_end: string) => {
    const dateNew: ExportParams = {
      start_date: date_start,
      end_date: date_end,
    };
    setDate(dateNew);
    setDateFilter(dateNew);
    setOpenModalDateRangePicker(false);
  };

  const handleOnclickRange = (index: number, value: string) => {
    if (index == indexSelect) {
      setIndexSelect(null);
      filterNewest();
    } else if (index !== indexSelect) {
      setIndexSelect(index);
      if (value == "havePhoneNumber") {
        filterCustomersByPhone();

        console.log("havePhoneNumber");
      } else if (value == "hasZaloId") {
        filterNewest();
        console.log("hasZaloId");
      }
    }
  };

  const filterCustomersByPhone = () => {
    // setLoading(true);
    setAllCustomers(allCustomersHavePhone);
    // const filterCustomersHavePhone = allCustomers.filter(
    //     (customer) => customer.phone !== null,
    // );
    // if (filterCustomersHavePhone.length > 0) {
    //     setAllCustomers(filterCustomersHavePhone);
    //     setLoading(false);
    // } else {
    //     console.log("Không có khách hàng phù hợp với filter");
    // }
  };
  const filterNewest = () => {
    setAllCustomers(allCustomersHasZaloId);
  };
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) {
          console.log(error.message);
          return;
        }
        if (data) {
          setZaloCustomers(data);
          setInitAllCustomer(data);

          const filterHasZaloId = data
            .filter((customer) => customer.zalo_id !== null)
            .slice(0, 150);
          const filterHasPhone = data
            .filter((customer) => customer.phone !== null)
            .slice(0, 150);
          setAllCustomers(filterHasZaloId);
          setAllCustomersHavePhone(filterHasPhone);
          setAllCustomersHasZaloId(filterHasZaloId);
          console.log("filterHasZaloId", filterHasZaloId);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  const handleSearch = (input: string) => {
    if (input === "") {
      setIndexSelect(0);
      setAllCustomers(zaloCustomers);
      return;
    }
    setIndexSelect(null);
    var regex = /^[0-9]+$/;
    if (input.match(regex)) {
      const pattern = new RegExp(input, "i");
      const tmp = initAllCustomers.filter((item: ICustomerZalo) => {
        return pattern.test(item.phone);
      });
      setAllCustomers(tmp);
    } else {
      const pattern = new RegExp(input, "i");
      const tmp = initAllCustomers.filter((item: ICustomerZalo) => {
        return pattern.test(item.name);
      });
      setAllCustomers(tmp);
    }
  };

  return (
    <div className="h-full">
      <>
        <Header
          className="app-header no-border pl-4 flex-none pb-[6px] font-[500] leading-[26px] text-[20px] tracking-[0.15px]"
          showBackIcon={true}
          title="Khách"
        />
        <div className="p-[16px] flex flex-col gap-[16px]">
          <Input.Search
            placeholder="Nhập tên hoặc số điện thoại"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap items-center gap-[5px]">
              {actionFilter.map((action, key) => {
                return (
                  <div
                    onClick={() => {
                      handleOnclickRange(key, action.value);
                    }}
                    className={`${
                      indexSelect == key
                        ? "bg-[#36383A] text-white"
                        : "bg-[white] text-[#36383A]"
                    } rounded-[8px] text-[10px]  font-[400] leading-[16px] flex items-center justify-center w- h-[24px] px-[12px] py-[4px]`}
                    key={key}
                  >
                    {action.title}
                  </div>
                );
              })}
            </div>
            <div className="flex gap-[8px]">
              {/* <ButtonIcon icon={"zi-location"} /> */}
              {/* <ButtonIcon
                                onClick={() => {
                                  setDatePickerEnable(true);
                                  setOpenModalDateRangePicker(true);
                                  setIndexSelect(null);
                                }}
                                active={datePickerEnable}
                                icon={"zi-calendar"}
                            /> */}
            </div>
          </div>
          <TableCustomerNav allCustomers={allCustomers} />
        </div>

        {loading && <LoadingSquareSpin />}
      </>
    </div>
  );
};

export default CustomersNav;
