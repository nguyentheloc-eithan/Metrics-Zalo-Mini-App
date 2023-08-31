import React from "react";
import { Avatar, Box, Header, Input } from "zmp-ui";

const userTemp: any = {
    id: "",
    image: "",
    job: "Engineer",
    name: "Nguyen The Loc",
    department: "BOD",
    email: "username@email.com",
    date_start: "15-05-2023",
    date_of_birth: "31-01-2001",
    phone: "0772898981",
    address: "123 Main Street",
};
const UserSettings = () => {
    return (
        <div className="bg-white h-full w-full">
            <Header
                className="app-header no-border pl-4 flex-none pb-[6px] font-[500] leading-[26px] text-[20px] tracking-[0.15px]"
                showBackIcon={true}
                title="Thông tin user"
            />
            <div className="flex flex-col items-center justify-center mt-[36px] mb-[16px]">
                <Avatar size={103} />
            </div>
            <div className="px-[16px] flex flex-col gap-[16px]">
                <div>
                    <div className="font-[700] text-[#36383A] spacing-[0.1px] text-[14px] leading-[20px]">
                        Thông tin công việc
                    </div>
                    <InputSettingsCustom
                        label={"Họ & tên"}
                        placeHolder={"Họ và tên user"}
                        onChange={undefined}
                    />
                </div>
            </div>
        </div>
    );
};

export default UserSettings;

interface InputSettingsCustomProps {
    label: string;
    placeHolder: string;
    onChange: any;
    classNameLabel?: string;
    classNameInput?: string;
}
const InputSettingsCustom = (props: InputSettingsCustomProps) => {
    const { label, placeHolder, onChange, classNameLabel, classNameInput } =
        props;
    return (
        <div>
            <label
                className={`text-[#1F1F1F] text-[14px] font-[400] leading-[20px] tracking-[0.25px]`}
            >
                {label}
            </label>
            <Input
                onChange={onChange}
                // value={value}
                // type={type}
                placeholder={placeHolder}
                className={`rounded-[8px] text-[16px] h-[46px] mt-[4px] px-[12px] py-[11px] border border-solid border-[#B9BDC1] ${classNameInput}`}
            />
        </div>
    );
};
