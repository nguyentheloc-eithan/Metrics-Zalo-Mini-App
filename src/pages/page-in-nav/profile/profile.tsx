import { ListRenderer } from 'components/list-renderer';
import React, { FC } from 'react';
import { Avatar, Box, Header, Page, Text, useNavigate } from 'zmp-ui';

const userTemp: IUser = {
  id: '',
  image: '',
  job: 'Engineer',
  name: 'Nguyen The Loc',
  department: 'BOD',
  email: 'username@email.com',
  date_start: '15-05-2023',
  date_of_birth: '31-01-2001',
  phone: '0772898981',
  address: '123 Main Street',
};

const PersonalInformation: FC = () => {
  return (
    <Box className="m-4">
      <ListRenderer
        title={''}
        items={[
          {
            left: '',
            right: (
              <Box flex>
                <Text.Header className="flex w-full items-center justify-between font-[700] text-[#36383A] spacing-[0.1px] text-[14px] leading-[20px]">
                  Thông tin cá nhân
                </Text.Header>
              </Box>
            ),
          },
          {
            left: '',
            right: (
              <Box flex>
                <Text.Header className="flex w-full items-center justify-between font-[400] text-[#8F9499] spacing-[0.25px] text-[14px] leading-[20px]">
                  Ngày tháng năm sinh
                </Text.Header>
                <Text className="w-full flex justify-end">
                  {userTemp.date_of_birth}
                </Text>
              </Box>
            ),
          },
          {
            left: '',
            right: (
              <Box flex>
                <Text.Header className="flex w-full items-center justify-between font-[400] text-[#8F9499] spacing-[0.25px] text-[14px] leading-[20px]">
                  Só điện thoại
                </Text.Header>
                <Text>{userTemp.phone}</Text>
              </Box>
            ),
          },
          {
            left: '',
            right: (
              <Box flex>
                <Text.Header className="flex w-full items-center justify-between font-[400] text-[#8F9499] spacing-[0.25px] text-[14px] leading-[20px]">
                  Địa chỉ
                </Text.Header>
                <Text className="w-full flex justify-end">
                  {userTemp.address}
                </Text>
              </Box>
            ),
          },
        ]}
        renderLeft={(item) => item.left}
        renderRight={(item) => item.right}
      />
    </Box>
  );
};

const JobInformation: FC = () => {
  return (
    <Box className="m-4">
      <div className="flex flex-col items-center justify-center mt-[36px] mb-[16px]">
        <Avatar size={103} />
        <div className="mt-[16px] mb-[4px] text-[14px] font-[600] leading-[20px] tracking-[0.25px]">
          {userTemp.name}
        </div>
        <div className="text-[12px] font-[300] leading-[18px] tracking-[0.4px]">
          {userTemp.job}
        </div>
      </div>
      <ListRenderer
        title={''}
        items={[
          {
            left: '',
            right: (
              <Box flex>
                <Text.Header className="flex w-full items-center justify-between font-[700] text-[#36383A] spacing-[0.1px] text-[14px] leading-[20px]">
                  Thông tin công việc
                </Text.Header>
              </Box>
            ),
          },
          {
            left: '',
            right: (
              <Box flex>
                <Text.Header className="flex w-full items-center justify-between font-[400] text-[#8F9499] spacing-[0.25px] text-[14px] leading-[20px]">
                  Phòng ban
                </Text.Header>
                <Text>{userTemp.department}</Text>
              </Box>
            ),
          },
          {
            left: '',
            right: (
              <Box flex>
                <Text.Header className="flex w-full items-center justify-between font-[400] text-[#8F9499] spacing-[0.25px] text-[14px] leading-[20px]">
                  Email
                </Text.Header>
                <Text>{userTemp.email}</Text>
              </Box>
            ),
          },
          {
            left: '',
            right: (
              <Box flex>
                <Text.Header className="flex w-full items-center justify-between font-[400] text-[#8F9499] spacing-[0.25px] text-[14px] leading-[20px]">
                  Ngày gia nhập
                </Text.Header>
                <Text className="w-full flex justify-end">
                  {userTemp.date_start}
                </Text>
              </Box>
            ),
          },
        ]}
        renderLeft={(item) => item.left}
        renderRight={(item) => item.right}
      />
    </Box>
  );
};

const Settings = () => {
  const navigate = useNavigate();
  return (
    <Box className="m-4">
      <ListRenderer
        title=""
        items={[
          {
            left: '',
            right: (
              <Box flex>
                <Text.Header className="flex-1 items-center font-[700] text-[#36383A] spacing-[0.1px] text-[14px] leading-[20px]">
                  Settings
                </Text.Header>
              </Box>
            ),
          },
          {
            left: '',
            right: (
              <Box flex>
                <Text.Header className="flex w-full items-center justify-between font-[400] text-[#36383A] spacing-[0.25px] text-[14px] leading-[20px]">
                  Thông tin user
                </Text.Header>
              </Box>
            ),
          },
          {
            left: '',
            right: (
              <Box flex>
                <Text.Header className="flex w-full items-center justify-between font-[400] text-[#DC1F18] spacing-[0.25px] text-[14px] leading-[20px]">
                  Đăng xuất
                </Text.Header>
              </Box>
            ),
          },
        ]}
        renderLeft={(item) => item.left}
        renderRight={(item) => item.right}
      />
    </Box>
  );
};

const Profile = () => {
  return (
    <Page>
      <Header
        className="app-header no-border pl-4 flex-none pb-[6px] font-[500] leading-[26px] text-[20px] tracking-[0.15px]"
        showBackIcon={false}
        title="Cá nhân"
      />
      {/* <Subscription /> */}
      <JobInformation />
      <PersonalInformation />
      <Settings />
    </Page>
  );
};

export default Profile;
