import useDateFilter from 'common/stores/date-filter';
import dayjs from 'dayjs';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { ExportParams } from 'services/rpc/clinic-revenue';
import { temp } from 'utils/date-params-default';
import { DatePicker, Modal } from 'zmp-ui';

interface ModalDatePickerProps {
  open: boolean;
  onClose: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const ModalDatePicker = (props: ModalDatePickerProps) => {
  const { open, onClose, setOpen } = props;
  const { dateFilter } = useDateFilter();

  const now = dayjs().format('YYYY-MM-DD');

  const [dateStart, setDateStart] = useState<string>(dateFilter.start_date);
  const [dateEnd, setDateEnd] = useState<string>(dateFilter.end_date);
  const [errorRangeSecond, setErrorRangeSecond] = useState<any>('');
  const [errorRangeFirst, setErrorRangeFirst] = useState<any>('');

  const formatTypeDate = (dateString: string) => {
    const dateFormat: Date = new Date(dateString);
    return dateFormat;
  };
  const cancelFilter = () => {
    const start_date = temp.start_date;
    const end_date = temp.end_date;

    onClose(start_date, end_date);
    setOpen(false);
  };
  console.log(formatTypeDate(dateFilter.start_date));
  console.log(formatTypeDate(dateFilter.end_date));
  const onCloseModalDatePiker = () => {
    const numericNow = parseInt(now.replace(/-/g, ''), 10);
    const numericDateStart = parseInt(dateStart.replace(/-/g, ''), 10);
    const numericDateEnd = parseInt(dateEnd.replace(/-/g, ''), 10);
    const check = numericDateEnd - numericDateStart;
    if (check < 0) {
      setErrorRangeSecond('error');
      if (numericDateStart - numericNow > 0) {
        console.log('Error: Start > Present');
        setErrorRangeFirst('error');
      } else {
        setErrorRangeFirst('');
      }
    } else if (check >= 0) {
      if (numericDateStart - numericNow > 0) {
        console.log('Error: Start > Present');
        setErrorRangeFirst('error');
      } else {
        setErrorRangeFirst('');
      }
      if (numericDateEnd - numericNow > 0) {
        console.log('Error: End > Present');
        setErrorRangeSecond('error');
      } else {
        setErrorRangeSecond('');
      }
    }
    if (check >= 0 && errorRangeSecond == '' && errorRangeSecond == '') {
      onClose(dateStart, dateEnd);
    }
  };

  return (
    <Modal
      visible={open}
      title="Hãy chọn khoảng thời gian"
      actions={[
        {
          text: 'Huỷ filter',
          close: true,
          highLight: false,
          onClick: () => {
            cancelFilter();
          },
        },
        {
          text: 'Áp dụng',
          close: true,
          highLight: true,

          onClick: () => {
            onCloseModalDatePiker();
          },
        },
      ]}>
      <div className="flex flex-col gap-[15px]">
        <DatePicker
          onChange={(date) => {
            setDateStart(dayjs(date).format('YYYY-MM-DD'));
          }}
          defaultValue={formatTypeDate(dateFilter.start_date)}
          status={errorRangeFirst}
          dateFormat={'dd-mm-yyyy'}
          label="Ngày bắt đầu"
          title="Ngầy bắt đầu"
        />
        <DatePicker
          onChange={(date) => {
            setDateEnd(dayjs(date).format('YYYY-MM-DD'));
          }}
          defaultValue={formatTypeDate(dateFilter.end_date)}
          status={errorRangeSecond}
          dateFormat={'dd-mm-yyyy'}
          label="Ngày kết thúc"
          title="Ngầy kết thúc"
        />
        {(errorRangeFirst == 'error' || errorRangeSecond == 'error') && (
          <div className="italic text-[10px] text-[red] font-[600]">
            Vui lòng chọn thời gian hợp lệ
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ModalDatePicker;
