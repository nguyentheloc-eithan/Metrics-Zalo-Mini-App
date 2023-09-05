import useFetchZaloUser from "common/stores/users/user-login";
import { ListRenderer } from "components/list-renderer";
import dayjs from "dayjs";
import React from "react";
import { Avatar, Box, Header, Icon, Page, Text, useNavigate } from "zmp-ui";

interface PageInformationProps {
    userLogin: any;
}
const PersonalInformation = (props: PageInformationProps) => {
    const { userLogin } = props;
    return (
        <Box className="m-4">
            <ListRenderer
                title={""}
                items={[
                    {
                        left: "",
                        right: (
                            <Box flex>
                                <Text.Header className="flex w-full items-center justify-between font-[700] text-[#36383A] spacing-[0.1px] text-[14px] leading-[20px]">
                                    Thông tin cá nhân
                                </Text.Header>
                            </Box>
                        ),
                    },
                    {
                        left: "",
                        right: (
                            <Box flex>
                                <Text.Header className="flex w-full items-center justify-between font-[400] text-[#8F9499] spacing-[0.25px] text-[14px] leading-[20px]">
                                    Ngày tháng năm sinh
                                </Text.Header>
                                <Text className="w-full flex justify-end">
                                    {userLogin.date_of_birth
                                        ? userLogin.date_of_birth
                                        : "dd-mm-yyyy"}
                                </Text>
                            </Box>
                        ),
                    },
                    {
                        left: "",
                        right: (
                            <Box flex>
                                <Text.Header className="flex w-full items-center justify-between font-[400] text-[#8F9499] spacing-[0.25px] text-[14px] leading-[20px]">
                                    Só điện thoại
                                </Text.Header>
                                <Text>{userLogin.phone}</Text>
                            </Box>
                        ),
                    },
                    {
                        left: "",
                        right: (
                            <Box flex>
                                <Text.Header className="flex w-full items-center justify-between font-[400] text-[#8F9499] spacing-[0.25px] text-[14px] leading-[20px]">
                                    Địa chỉ
                                </Text.Header>
                                <Text className="w-full flex justify-end">
                                    {userLogin.ward +
                                        ", " +
                                        userLogin.district +
                                        ", " +
                                        userLogin.city +
                                        "."}
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

const JobInformation = (props: PageInformationProps) => {
    const { userLogin } = props;
    const navigate = useNavigate();
    return (
        <Box className="m-4">
            <div className="flex flex-col items-center justify-center mt-[36px] mb-[16px]">
                <div className="relative w-[103px] h-[103px]">
                    <Avatar src={userLogin.avatar} size={103} online={true} />
                    <div
                        onClick={() => navigate("/user-settings")}
                        className="absolute right-0 bottom-0 w-[32px] h-[32px] rounded-[50%] bg-white border border-[#B9BDC1] flex items-center justify-center"
                    >
                        <Icon icon="zi-edit-text" size={16} />
                    </div>
                </div>

                <div className="mt-[16px] mb-[4px] text-[14px] font-[600] leading-[20px] tracking-[0.25px]">
                    {userLogin.name}
                </div>
                <div className="text-[12px] font-[300] leading-[18px] tracking-[0.4px]">
                    {userLogin.job}
                </div>
            </div>
            <ListRenderer
                title={""}
                items={[
                    {
                        left: "",
                        right: (
                            <Box flex>
                                <Text.Header className="flex w-full items-center justify-between font-[700] text-[#36383A] spacing-[0.1px] text-[14px] leading-[20px]">
                                    Thông tin công việc
                                </Text.Header>
                            </Box>
                        ),
                    },
                    {
                        left: "",
                        right: (
                            <Box flex>
                                <Text.Header className="flex w-full items-center justify-between font-[400] text-[#8F9499] spacing-[0.25px] text-[14px] leading-[20px]">
                                    Phòng ban
                                </Text.Header>
                                <Text>{userLogin.department}</Text>
                            </Box>
                        ),
                    },
                    {
                        left: "",
                        right: (
                            <Box flex>
                                <Text.Header className="flex w-full items-center justify-between font-[400] text-[#8F9499] spacing-[0.25px] text-[14px] leading-[20px]">
                                    Email
                                </Text.Header>
                                <Text>{userLogin.email}</Text>
                            </Box>
                        ),
                    },
                    {
                        left: "",
                        right: (
                            <Box flex>
                                <Text.Header className="flex w-full items-center justify-between font-[400] text-[#8F9499] spacing-[0.25px] text-[14px] leading-[20px]">
                                    Ngày gia nhập
                                </Text.Header>
                                <Text className="w-full flex justify-end">
                                    {userLogin.created_at
                                        ? dayjs(userLogin.created_at).format(
                                              "DD-MM-YYYY",
                                          )
                                        : "DD-MM-YYYY"}
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
                        left: "",
                        right: (
                            <Box flex>
                                <Text.Header className="flex-1 items-center font-[700] text-[#36383A] spacing-[0.1px] text-[14px] leading-[20px]">
                                    Settings
                                </Text.Header>
                            </Box>
                        ),
                    },
                    {
                        left: "",
                        right: (
                            <Box flex>
                                <Text.Header className="flex w-full items-center justify-between font-[400] text-[#36383A] spacing-[0.25px] text-[14px] leading-[20px]">
                                    Thông tin user
                                </Text.Header>
                            </Box>
                        ),
                    },
                    {
                        left: "",
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
    const { userLogin } = useFetchZaloUser();
    console.log("userLogin", userLogin);
    return (
        <Page>
            <Header
                className="app-header no-border pl-4 flex-none pb-[6px] font-[500] leading-[26px] text-[20px] tracking-[0.15px]"
                showBackIcon={true}
                title="Cá nhân"
            />
            <JobInformation userLogin={userLogin} />
            <PersonalInformation userLogin={userLogin} />
            {/* <Settings /> */}
        </Page>
    );
};

export default Profile;
