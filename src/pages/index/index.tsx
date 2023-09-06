import React, { useEffect, useState } from "react";
import { Box, Page, useNavigate } from "zmp-ui";
import { Welcome } from "./welcome";
import Lottie from "lottie-react";
import lottie from "../../static/lottie/animation_llkpplro.json";
import { IUser } from "common/types/user";
import useFetchZaloUser from "common/stores/users/user-login";
import { getAccessToken, getUserInfo, login } from "zmp-sdk/apis";
import { getPhoneNumber } from "zmp-sdk/apis";
import { supabase } from "services/supabase";
import LoadingSquareSpin from "components/loading";
import dayjs from "dayjs";
import {
  getPhoneNumberByToken,
  getPhoneNumberZalo,
} from "services/zalo/get-phone";
import { getClinicRevenue } from "services/rpc/clinic-revenue";
import { temp } from "utils/date-params-default";
import useFetchClinicSelects from "common/stores/clinics/clinics";
import { IClinicSelect } from "common/types/clinic";
const userLoginInit = {
  id: "",
  name: "",
  image: "",
  department: "",
  email: "",
  job: "",
  date_start: "",
  date_of_birth: "",
  phone: "",
  address: "",
};
const HomePage = () => {
  const navigate = useNavigate();
  const { userLogin, setUserLogin } = useFetchZaloUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [userPhone, setUserPhone] = useState<string>("");
  const { setAllClinicSelects } = useFetchClinicSelects();
  useEffect(() => {
    getUser();
  }, []);
  const loginSuccess = (user) => {
    setUserLogin(user);
    const timeout = setTimeout(() => {
      navigate("/revenue", { animate: false });
    }, 1200);
    return () => {
      clearTimeout(timeout);
    };
  };
  const noAccount = () => {
    const timeout = setTimeout(() => {
      navigate("/not-admin", { animate: false });
    }, 1200);
    return () => {
      clearTimeout(timeout);
    };
  };
  const getUser = async () => {
    try {
      await login({});
      const { userInfo } = await getUserInfo({});
      const _userInfo = {
        zalo_id: userInfo.id,
        avatar: userInfo.avatar,
        name: userInfo.name,
        phone: "",
        id: "",
        created_at: "",
        job: "",
        department: "",
      };
      setUserLogin(_userInfo);
    } catch (error) {
      // message("Login thất bại. Vui lòng thử lại sau.");
      console.log(error);
    }
  };
  const getStaffByZaloId = async (zaloId: string) => {
    if (zaloId) {
      try {
        setLoading(true);
        const { data } = await supabase.rpc(
          "get_staff_info_by_zalo_id_new_v2",
          { zaloid: zaloId },
        );
        console.log("data", data);
        if (data && data.length > 0) {
          console.log("Have zaloid");
          let department = await departmentFetch(data[0].roles_staff[0].name);
          console.log("department", department);

          setUserLogin({
            ...data[0],
            department: department,
            job: data[0].roles_staff[0].name,
          });
          if (
            (data[0].roles_staff[0].name == "Tester" ||
              data[0].roles_staff[0].name == "Admin" ||
              data[0].roles_staff[0].name == "Developer") &&
            data[0].roles_staff[0].verify
          ) {
            loginSuccess({
              ...data[0],
              department: department,
              job: data[0].roles_staff[0].name,
            });
            return;
          } else {
            console.log("Here 1");
            noAccount();
            return;
          }
        } else {
          console.log("Dont have zaloid");
          let phoneNumber = await getPhoneNumberZalo();
          if (phoneNumber) {
            let { data } = await supabase.rpc("get_staff_info_by_phone_v2", {
              staff_phone: phoneNumber,
            });

            if (data && data.length > 0) {
              await supabase
                .from("staffs")
                .update({ zalo_id: zaloId })
                .eq("id", data[0]?.id);
              let department = await departmentFetch(
                data[0].roles_staff[0].name,
              );
              console.log("department", department);

              setUserLogin({
                ...data[0],
                department: department,
                job: data[0].roles_staff[0].name,
              });
              if (
                (data[0].roles_staff[0].name == "Tester" ||
                  data[0].roles_staff[0].name == "Admin" ||
                  data[0].roles_staff[0].name == "Developer") &&
                data[0].roles_staff[0].verify
              ) {
                loginSuccess({
                  ...data[0],
                  department: department,
                  job: data[0].roles_staff[0].name,
                });
                return;
              } else {
                console.log("Here 2");

                noAccount();
                return;
              }
            } else {
              console.log("Here 3");

              noAccount();
            }
          } else {
            console.log("Here 4");

            noAccount();
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };
  /*phone*/
  const departmentFetch = async (value: string) => {
    let department: string = "";
    const { data: data_role, error: error_role } = await supabase
      .from("roles")
      .select("department_id(*)")
      .eq("value", value);
    console.log("data_role", data_role);
    if (error_role) {
      console.log("find department error");
      return;
    }
    if (data_role && data_role.length > 0) {
      if (data_role[0].department_id?.name) {
        department = data_role[0].department_id?.name;
      }
    }
    return department;
  };
  useEffect(() => {
    const fetchClinics = async () => {
      const { clinicRevenue } = await getClinicRevenue(temp);
      if (clinicRevenue) {
        const formatClinicSelect: IClinicSelect[] = clinicRevenue.map(
          (clinic: any) => {
            return {
              label:
                clinic.clinic_name.toLowerCase().charAt(0).toUpperCase() +
                clinic.clinic_name.toLowerCase().slice(1),
              value: clinic.clinic_name,
            };
          },
        );
        setAllClinicSelects(formatClinicSelect);
      }
    };
    fetchClinics();
  }, []);
  return (
    <Page className="relative flex-1 flex flex-col bg-white">
      <Welcome />
      <Box className="flex-1 overflow-auto">
        <div className="flex items-center flex-col justify-center">
          <Lottie
            animationData={lottie}
            loop={true}
            className="w-[343px] mt-[60px] h-[343px] object-contain"
          />

          <button
            onClick={async () => await getStaffByZaloId(userLogin?.zalo_id)}
            className="bg-[#36383A] mt-[50px] h-[44px] rounded-[8px] w-[343px] px-[24px] text-[14px] font-[700] leading-[20px] tracking-[1.25px] py-[12px] text-[white]"
          >
            Đăng nhập bằng Zalo
          </button>

          <div className="text-[14px] font-[700] mt-[8px] text-[#36383A] leading-[20px] tracking-[0.1px]">
            Bạn chưa có tài khoản?
            <span className="text-[#BC2449]">Liên hệ với Admin.</span>
          </div>
        </div>
        <div className="flex w-full items-center justify-center mt-[30px]">
          <img
            src="https://ucarecdn.com/3a1ae635-d250-4910-a931-d47b2fd5ebc6/-/quality/smart/-/format/auto/"
            className="w-[103px]"
          />
        </div>
      </Box>
      {loading && <LoadingSquareSpin />}
    </Page>
  );
};

export default HomePage;
