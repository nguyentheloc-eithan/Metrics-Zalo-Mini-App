import React, { useState } from "react";
import { Checkbox, Icon } from "zmp-ui";
type MultipleSelectProps = {
    options: any;
    takeOption?: any;
    setDataFilter: (e: string[]) => void;
};
const MultipleSelect = (props: MultipleSelectProps) => {
    const [active, setActive] = useState<boolean>(false);
    const { options, setDataFilter } = props;
    return (
        <>
            <div
                onClick={() => setActive((prev) => !prev)}
                className="w-full h-[40px] border border-[#E9EBED] rounded-[8px] justify-between p-[16px] flex items-center"
            >
                <div> Hãy chọn cơ sở</div>
                <Icon icon="zi-chevron-down" size={24} />
            </div>
            {active ? (
                <div className="flex flex-col items-start  bg-white rounded-[3px] p-[16px]  gap-[16px] h-[200px] w-full overflow-y-scroll">
                    {options.map((option, index) => {
                        return (
                            <div key={index} className="flex">
                                <Checkbox
                                    onChange={(e) => {
                                        console.log(e.target.value);
                                    }}
                                    label={option.label}
                                    value={option.value}
                                />
                            </div>
                        );
                    })}
                </div>
            ) : (
                <></>
            )}
        </>
    );
};

export default MultipleSelect;
