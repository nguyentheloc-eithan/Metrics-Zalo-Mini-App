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
                    <button className="w-[calc((100%-16px)/2)] text-[#8F9499] rounded-[8px] gap-[8px] h-[92px] flex flex-col items-center justify-center py-[16px] px-[8px] bg-[white]">
                        {icon}

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
                    className="w-[calc((100%-16px)/2)] rounded-[8px] gap-[8px] h-[92px] flex flex-col items-center justify-center py-[16px] px-[8px] bg-[white]"
                >
                    {icon}

                    <div className="text-[14px] text-[#36383A] font-[500] leading-[20px] tracking-[0.1px]">
                        {text}
                    </div>
                </button>
            )}
        </>
    );
};

export default BoxButton;
