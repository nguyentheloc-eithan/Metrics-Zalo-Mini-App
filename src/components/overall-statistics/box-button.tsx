import React from "react";
import { useNavigate } from "zmp-ui";

interface BoxButtonParams {
    icon?: any;
    text: string;
    link: string;
    enable?: boolean;
}

const BoxButton = (params: BoxButtonParams) => {
    const navigate = useNavigate();
    const { icon, text, link, enable } = params;
    return (
        <>
            {enable == false ? (
                <>
                    <button className="w-[calc((100%-16px)/2)]  text-[#8F9499] rounded-[8px] gap-[8px] h-[92px] flex flex-col items-center justify-center py-[16px] px-[8px] bg-[white]">
                        <div className="w-[50px] h-[50px] ">{icon}</div>
                        <div className="text-[14px] text-[#8F9499] font-[500] leading-[20px] tracking-[0.1px]">
                            {text}
                        </div>
                    </button>
                </>
            ) : (
                <button
                    onClick={() => {
                        navigate(link);
                    }}
                    className="w-[calc((100%-16px)/2)] rounded-[8px] gap-[8px] h-[92px] flex flex-col items-start justify-center py-[12px] px-[16px] bg-[white]"
                >
                    <div className="bg-[#E9EBED] rounded-[8px] p-[6px] w-fit h-fit flex items-center justify-center">
                        {icon}
                    </div>
                    <div className="text-[10px] text-[#8F9499] font-[400] leading-[16px] tracking-[0.1px]">
                        {text}
                    </div>
                </button>
            )}
        </>
    );
};

export default BoxButton;
