import React, { useEffect, useState } from 'react';
import { Box, Page, useNavigate } from 'zmp-ui';
import { Welcome } from './welcome';
import Lottie from 'lottie-react';
import lottie from '../../static/lottie/animation_llkpplro.json';
import { IUser } from 'common/types/user';
import useFetchZaloUser from 'common/stores/users/user-login';
import { getUserInfo, login } from 'zmp-sdk/apis';
import { getPhoneNumber } from 'zmp-sdk/apis';
import { supabase } from 'services/supabse';
import LoadingSquareSpin from 'components/loading';
import dayjs from 'dayjs';
const userLoginInit = {
  id: '',
  name: '',
  image: '',
  department: '',
  email: '',
  job: '',
  date_start: '',
  date_of_birth: '',
  phone: '',
  address: '',
};
const HomePage = () => {
  const navigate = useNavigate();
  const { userLogin, setUserLogin } = useFetchZaloUser();
  const [loading, setLoading] = useState<boolean>(false);

  const getUser = async () => {
    try {
      setLoading(true);
      await login({});
      const { userInfo } = await getUserInfo();
      let flag = await checkUser(userInfo.id);
      if (flag) {
        const staff: any = await getUserInStaffsTableByZaloId(userInfo.id);
        const user: any = formatUserInStaff(staff);
        setUserLogin(user);
        const checkAdmin = await checkIsAdmin(staff.id, staff);
        if (checkAdmin == true) {
          navigate('/overall-statistics');
        } else {
          navigate('/not-admin');
        }
      }
      setLoading(false);
    } catch (error) {
      // xử lý khi gọi api thất bại
      navigate('/not-admin');
      console.log('getuser', error);
    }
  };
  const getUserInStaffsTableByZaloId = async (zalo_id: string) => {
    const { data, error } = await supabase
      .from('staffs')
      .select('*')
      .eq('zalo_id', zalo_id);
    if (error) {
      console.log('instaff', error.message);
      return;
    }
    if (data) {
      return data[0];
    }
  };
  const checkUser = async (id: string) => {
    try {
      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('zalo_id', id);
      if ((user && user?.length == 0) || !user) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.log('incheckuser', error);
      return false;
    }
  };
  const checkIsAdmin = async (staff_id: string, user: any) => {
    let id_role = '';
    const { data: dataStaffRole, error: errorStaffRole } = await supabase
      .from('staffs_roles')
      .select('*')
      .eq('staff_id', staff_id);
    if (errorStaffRole) {
      return false;
    }
    if (dataStaffRole) {
      id_role = dataStaffRole[0].role_id;
    }
    if (id_role == 'a2886b4a-60c4-4f69-94a2-9650f7e02cd5') {
      const depart: any = await departmentFetch(
        'a2886b4a-60c4-4f69-94a2-9650f7e02cd5'
      );

      const updatedUser = {
        ...user,
        job: 'Admin',
        department: depart,
      };
      console.log(updatedUser);

      setUserLogin(updatedUser);
      return true;
    } else if (id_role == 'a1ee782b-2244-4015-877f-d11275afe27f') {
      const depart: any = await departmentFetch(
        'a1ee782b-2244-4015-877f-d11275afe27f'
      );
      const updatedUser = {
        ...userLogin,
        job: 'Developer',
        department: depart,
      };
      console.log(updatedUser);
      setUserLogin(updatedUser);

      return true;
    } else if (id_role == '881ea3d3-ffc5-4f54-ba8b-9921b06ee663') {
      const depart: any = await departmentFetch(
        '881ea3d3-ffc5-4f54-ba8b-9921b06ee663'
      );
      const updatedUser = {
        ...userLogin,
        job: 'Tester',
        department: depart,
      };
      console.log(updatedUser);

      setUserLogin(updatedUser);
      return true;
    } else {
      return false;
    }
  };

  const departmentFetch = async (role_id: string) => {
    let departmentId: any = '';
    let department: string = '';
    const { data: data_role, error: error_role } = await supabase
      .from('roles')
      .select('department_id')
      .eq('id', role_id);
    if (error_role) {
      console.log('find department error');
      return;
    }
    if (data_role) {
      departmentId = data_role[0].department_id;

      const { data: data_department, error: error_department } = await supabase
        .from('departments')
        .select('*')
        .eq('id', departmentId);
      if (error_department) {
        console.log('find department error', error_department);
        return;
      }
      if (data_department) {
        department = data_department[0].name;
      }
    }
    return department;
  };

  const formatUserInStaff = (data: any) => {
    if (data) {
      const result = {
        id: data.id,
        name: data?.name,
        image: data?.avatar,
        department: data?.department,
        email: data?.email,
        job: data?.role,
        date_start: dayjs(data?.created_at).format('DD-MM-YYYY'),
        date_of_birth: dayjs(data?.birth).format('DD-MM-YYYY'),
        phone: data?.phone,
        address: data?.address,
      };
      return result;
    } else {
      return;
    }
  };
  return (
    <>
      {loading ? (
        <LoadingSquareSpin />
      ) : (
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
                onClick={getUser}
                className="bg-[#36383A] mt-[50px] h-[44px] rounded-[8px] w-[343px] px-[24px] text-[14px] font-[700] leading-[20px] tracking-[1.25px] py-[12px] text-[white]">
                Đăng nhập bằng Zalo
              </button>

              <div className="text-[14px] font-[700] mt-[8px] text-[#36383A] leading-[20px] tracking-[0.1px]">
                Bạn chưa có tài khoản?
                <span className="text-[#BC2449]"> Liên hệ với Admin.</span>
              </div>
            </div>
            <div className="flex w-full items-center justify-center mt-[30px]">
              <img
                src="https://ucarecdn.com/3a1ae635-d250-4910-a931-d47b2fd5ebc6/-/quality/smart/-/format/auto/"
                className="w-[103px]"
              />
            </div>
          </Box>
        </Page>
      )}
    </>
  );
};

export default HomePage;
