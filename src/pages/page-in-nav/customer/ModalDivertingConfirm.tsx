import React from "react";
import { openChat, showToast } from "zmp-sdk/apis";
import { Modal } from "zmp-ui";

type ModalDivertingProps = {
    customer: any;
    active: boolean;
    setActiveCustomerDiverting: (e: boolean) => void;
};

const ModalDivertingConfirm = (props: ModalDivertingProps) => {
    const { customer, active, setActiveCustomerDiverting } = props;
    console.log("ModalDivertingConfirm", customer);
    const contactCustomers = async (zalo_id: any) => {
        if (zalo_id) {
            try {
                await openChat({
                    type: "user",
                    id: zalo_id,
                    message: "Xin chào bạn",
                });
            } catch (error) {
                showToast({
                    message:
                        "Đã có lỗi xảy ra trong quá trình liên hệ với khách hàng",
                });
                console.log(
                    "lỗi xảy ra trong quá trình liên hệ với khách hàng",
                    error,
                );
            }
        }
    };
    return (
        <div>
            <Modal
                visible={active}
                title="Chuyển hướng"
                onClose={() => {
                    contactCustomers(customer.zalo_id);
                    setActiveCustomerDiverting(false);
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
                </div>
            </Modal>
        </div>
    );
};

export default ModalDivertingConfirm;
