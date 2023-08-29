import React from "react";

interface BulletPointProps {
    color?: string;
    text: string;
    enable: boolean;
    onClick?: any;
}
const BulletPoint = (props: BulletPointProps) => {
    const { color = "#36383A", text, enable, onClick } = props;
    return (
        <div
            onClick={onClick}
            className="flex gap-[8px] items-center w-fit h-[16px]"
        >
            <div
                className="w-[10px] h-[10px] rounded-[50%] "
                style={{ backgroundColor: `${color}` }}
            ></div>
            <div
                className={`${
                    enable ? "text-[#36383A]" : "text-[#8F9499]"
                } text-[12px] font-[400] leading-[18px] tracking-[0.4px]`}
            >
                {text}
            </div>
        </div>
    );
};

export default BulletPoint;
