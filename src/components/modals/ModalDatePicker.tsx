import dayjs from 'dayjs';
import React, { useState } from 'react';
import { ExportParams } from 'services/rpc/clinic-revenue';
import { DatePicker, Modal } from 'zmp-ui';

interface ModalDatePickerProps {
  open: boolean;
  onClose: any;
}
const ModalDatePicker = (props: ModalDatePickerProps) => {
  const { open, onClose } = props;
  const now = dayjs().format('YYYY-MM-DD');
  const startMonth = dayjs().startOf('month').format('YYYY-MM-DD');
  const [dateStart, setDateStart] = useState<string>(startMonth);
  const [dateEnd, setDateEnd] = useState<string>(now);

  return (
    <Modal
      visible={open}
      title="Hãy chọn khoảng thời gian"
      onClose={() => {
        onClose(dateStart, dateEnd);
      }}
      actions={[
        {
          text: 'Áp dụng',
          close: true,
          highLight: true,
        },
      ]}>
      <div className="flex flex-col gap-[15px]">
        <DatePicker
          onChange={(date) => {
            setDateStart(dayjs(date).format('YYYY-MM-DD'));
          }}
          dateFormat={'dd-mm-yyyy'}
          label="Ngày bắt đầu"
          title="Ngầy bắt đầu"
        />
        <DatePicker
          onChange={(date) => {
            setDateEnd(dayjs(date).format('YYYY-MM-DD'));
          }}
          dateFormat={'dd-mm-yyyy'}
          label="Ngày kết thúc"
          title="Ngầy kết thúc"
        />
      </div>
    </Modal>
  );
};

export default ModalDatePicker;
