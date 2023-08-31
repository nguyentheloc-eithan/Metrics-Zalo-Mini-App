import React from "react";
import UserCard from "./user-card";
import { Header, Icon, Page, useNavigate } from "zmp-ui";
import useFetchZaloUser from "common/stores/users/user-login";
import BoxButton from "components/overall-statistics/box-button";
const sections = [
    {
        name: "Khách hàng report",
        icon: <Icon icon="zi-group-solid" />,
        link: "/customers",
        enable: true,
    },
    {
        name: "Danh sách khách hàng",
        icon: <Icon icon="zi-list-1" />,
        link: "/customers-nav",
        enable: true,
    },
    {
        name: "Dịch vụ",
        icon: (
            <img
                src="https://ucarecdn.com/cc288c29-dc77-4e68-9a0d-1e3306c3f750/"
                className="w-[24px] h-[24px]"
            />
        ),
        link: "/services",
        enable: true,
    },
    {
        name: "Nội bộ - Nhân viên",
        icon: (
            <img
                src="https://ucarecdn.com/0600023e-819b-48f7-b2e5-be2ef28ae470/"
                className="w-[24px] h-[24px]"
            />
        ),
        link: "/staffs",
        enable: true,
    },

    // {
    //   name: 'Sales report',
    //   icon: <Icon icon="zi-poll" />,
    //   link: '/sale-report',
    //   enable: false,
    // },
];
const More = () => {
    const { userLogin } = useFetchZaloUser();
    const navigate = useNavigate();
    return (
        <Page>
            <Header
                className="app-header no-border pl-4 flex-none pb-[6px] font-[500] leading-[26px] text-[20px] tracking-[0.15px]"
                showBackIcon={false}
                title="Menu"
            />
            <div className="p-[16px] flex flex-col items-center gap-[16px]">
                <UserCard
                    avatar={userLogin.avatar}
                    name={userLogin.name}
                    job={userLogin.job}
                />
            </div>
            <div className="p-[16px] w-full flex items-center justify-start flex-wrap gap-[16px]">
                {sections.map((section, index) => (
                    <BoxButton
                        key={index}
                        icon={section.icon}
                        text={section.name}
                        link={section.link}
                        enable={section.enable}
                    />
                ))}
                <div
                    onClick={() => navigate("/")}
                    className="w-full p-[16px] flex items-center justify-between bg-white rounded-[8px] text-[#DC1F18]"
                >
                    Đăng xuất
                </div>
            </div>
        </Page>
    );
};

export default More;
