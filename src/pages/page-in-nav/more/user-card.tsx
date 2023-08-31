import React from "react";
import { Avatar, Icon, useNavigate } from "zmp-ui";
type UserCardProps = {
    avatar: string;
    name: string;
    job: string;
};
const UserCard = (props: UserCardProps) => {
    const { avatar, name, job } = props;
    const navigate = useNavigate();
    return (
        <div
            onClick={() => navigate("/profile")}
            className="w-full p-[16px] flex items-center justify-between bg-white rounded-[8px]"
        >
            <div className="flex items-center gap-[16px]">
                <Avatar src={avatar} size={40} />
                <div className="flex flex-col">
                    <div className="text-[14px] font-[600] leading-[20px] tracking-[0.25px] text-[#36383A]">
                        {name}
                    </div>
                    <div className="text-[12px] font-[400] leading-[18px] tracking-[0.4px] text-[#36383A]">
                        {job}
                    </div>
                </div>
            </div>
            <Icon icon="zi-chevron-right" size={24} />
        </div>
    );
};

export default UserCard;
