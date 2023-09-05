import useFetchZaloUser from "common/stores/users/user-login";
import dayjs from "dayjs";
import React from "react";
import { Avatar, Header, Icon, Input, Page } from "zmp-ui";

const UserSettings = () => {
    const { userLogin } = useFetchZaloUser();
    return (
        <Page className="bg-white">
            <Header
                className="app-header no-border pl-4 flex-none pb-[6px] font-[500] leading-[26px] text-[20px] tracking-[0.15px]"
                showBackIcon={true}
                title="Thông tin user"
            />
            <div className="flex flex-col items-center justify-center mt-[36px] mb-[16px]">
                <div className="relative w-[103px] h-[103px]">
                    <Avatar src={userLogin.avatar} size={103} online={true} />
                    <div className="absolute right-0 bottom-0 w-[32px] h-[32px] rounded-[50%] bg-white border border-[#B9BDC1] flex items-center justify-center">
                        <Icon icon="zi-camera" size={16} />
                    </div>
                </div>
            </div>
            <div className="p-[16px] flex flex-col gap-[32px]">
                <div className="flex flex-col gap-[16px]">
                    <div className="font-[700] text-[#36383A] spacing-[0.1px] text-[14px] leading-[20px]">
                        Thông tin công việc
                    </div>
                    <InputSettingsCustom
                        required
                        label={"Họ & tên"}
                        placeHolder={"Họ và tên user"}
                        defaultValue={userLogin.name}
                    />
                    <InputSettingsCustom
                        required
                        label={"Email"}
                        placeHolder={"admin@email.com"}
                        defaultValue={userLogin.email}
                    />
                    <InputSettingsCustom
                        label={"Ngày gia nhập"}
                        placeHolder={"dd/mm/yyyy"}
                        defaultValue={dayjs(userLogin.created_at).format(
                            "DD/MM/YYYY",
                        )}
                    />
                </div>
                <div className="flex flex-col gap-[16px]">
                    <div className="font-[700] text-[#36383A] spacing-[0.1px] text-[14px] leading-[20px]">
                        Thông tin cá nhân
                    </div>
                    <InputSettingsCustom
                        label={"Ngày tháng năm sinh"}
                        placeHolder={"dd/mm/yyyy"}
                        defaultValue={userLogin.birth}
                    />
                    <InputSettingsCustom
                        required
                        label={"Số điện thoại"}
                        placeHolder={"Chỉ nhập số"}
                        defaultValue={userLogin.phone}
                    />
                    <div>
                        <div className="text-[#1F1F1F] text-[14px] font-[400] leading-[20px] tracking-[0.25px]">
                            Địa chỉ
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    );
};

export default UserSettings;

interface InputSettingsCustomProps {
    label: string;
    placeHolder: string;
    onChange?: any;
    classNameLabel?: string;
    classNameInput?: string;
    required?: boolean;
    defaultValue?: any;
}
const InputSettingsCustom = (props: InputSettingsCustomProps) => {
    const {
        label,
        placeHolder,
        onChange,
        classNameLabel,
        defaultValue,
        classNameInput,
        required,
    } = props;
    return (
        <div>
            <label
                className={`text-[#1F1F1F] text-[14px] font-[400] leading-[20px] tracking-[0.25px]`}
            >
                {label}
                <span className="text-[red]">{required ? " *" : ""}</span>
            </label>
            <Input
                onChange={onChange}
                // value={value}
                // type={type}
                defaultValue={defaultValue}
                placeholder={placeHolder}
                className={`rounded-[8px] text-[16px] h-[46px] mt-[4px] px-[12px] py-[11px] border border-solid border-[#B9BDC1] ${classNameInput}`}
            />
        </div>
    );
};
