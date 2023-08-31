import React, { useState } from "react";
import { openChat, showToast } from "zmp-sdk/apis";
import { Modal } from "zmp-ui";

type ModalDivertingProps = {
    customer: any;
    active: boolean;
    setActiveCustomerDiverting: (e: boolean) => void;
};

const ModalDivertingConfirm = (props: ModalDivertingProps) => {
    const { customer, active, setActiveCustomerDiverting } = props;
    const [hasZaloId, setHasZaloId] = useState<boolean>(false);
    console.log("ModalDivertingConfirm", customer);
    const contactCustomers = async (customer: any) => {
        if (customer.zalo_id == null) {
            setHasZaloId(true);
        } else {
            await openChat({
                type: "user",
                id: customer.zalo_id,
                message: "Xin chào bạn",
            });
            setActiveCustomerDiverting(false);
        }
    };
    return (
        <div>
            <Modal
                visible={active}
                title="Chuyển hướng"
                onClose={() => {
                    contactCustomers(customer);
                }}
                actions={[
                    {
                        text: "Quay lại",
                        onClick: () => setActiveCustomerDiverting(false),
                    },
                    {
                        text: "Đã hiểu",
                        close: true,
                        highLight: true,
                    },
                ]}
            >
                <div className="text-[15px] font-[400] text-[#8F9499] leading-[20px] tracking-[0.15px]">
                    Bạn sẽ được chuyển qua khung chat zalo để tương tác với
                    người dùng
                    <span className="font-[600] text-[#36383A] text-[14px] leading-[24px] tracking-[0.25px]">
                        {" " + customer?.name}
                    </span>
                    .
                    {hasZaloId && (
                        <div className="text-[red]">
                            Khách hàng không có Zalo ID.
                        </div>
                    )}
                </div>
            </Modal>
        </div>
    );
};

export default ModalDivertingConfirm;
