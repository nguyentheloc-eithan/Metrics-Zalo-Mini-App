import React from "react";
import { Modal } from "zmp-ui";

const ModalDivertingConfirm = () => {
    return (
        <div>
            <Modal
                visible={true}
                title="This is the title"
                // onClose={() => {
                //   setDialogVisible(false);
                // }}
                actions={[
                    {
                        text: "Button",
                    },
                    {
                        text: "Button",
                        close: true,
                        highLight: true,
                    },
                ]}
            >
                adasdasasd
            </Modal>
        </div>
    );
};

export default ModalDivertingConfirm;
