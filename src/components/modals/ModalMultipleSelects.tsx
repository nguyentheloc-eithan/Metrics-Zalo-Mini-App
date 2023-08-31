import useFetchClinicSelects from "common/stores/clinics/clinics";
import React, { Dispatch, SetStateAction } from "react";
import { Box, Modal, Select } from "zmp-ui";

type MultipleSelectProps = {
    open: boolean;
    onClose: any;
    setDataFilter: (e: string[]) => void;
    setOpen: Dispatch<SetStateAction<boolean>>;
};
interface OptionType {
    value: string;
    label: string;
}

const ModalMultipleSelects = (props: MultipleSelectProps) => {
    const { open, setOpen, setDataFilter } = props;
    const { allClinicSelects } = useFetchClinicSelects();
    const { Option } = Select;
    return (
        <Modal
            visible={open}
            title="Hãy chọn cơ sở"
            actions={[
                {
                    text: "Huỷ filter",
                    close: true,
                    highLight: false,
                    onClick: () => setOpen(false),
                },
                {
                    text: "Áp dụng",
                    close: true,
                    highLight: true,
                },
            ]}
        >
            <Box mt={6}>
                <Select
                    onChange={(e) => setDataFilter(e as any)}
                    label=""
                    placeholder="Hãy chọn cơ sở"
                    multiple
                >
                    {allClinicSelects.map((item) => {
                        return <Option value={item.value} title={item.label} />;
                    })}
                </Select>
            </Box>
        </Modal>
    );
};

export default ModalMultipleSelects;
export type { OptionType };
