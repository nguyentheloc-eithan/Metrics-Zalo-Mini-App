import dayjs from 'dayjs';
import { ExportParams } from 'services/rpc/clinic-revenue';

const startMonth = dayjs().startOf('month').format('YYYY-MM-DD');
const currentDate = dayjs().format('YYYY-MM-DD');

export const temp: ExportParams = {
  start_date: startMonth,
  end_date: currentDate,
};
