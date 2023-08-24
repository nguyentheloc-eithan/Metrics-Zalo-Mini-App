import dayjs from 'dayjs';
import { supabase } from 'services/supabse';

interface ExportServicesParams {
  start_date: string;
  end_date: string;
}

const getTopServices = async (params: ExportServicesParams) => {
  const { data: dataServices, error: errorServices } = await supabase.rpc(
    'total_statistic_service',
    {
      start_date: dayjs(params.start_date).format('YYYY-MM-DD'),
      end_date: dayjs(params.end_date).format('YYYY-MM-DD'),

      sort_by: 'revenue',
    }
  );
  return { dataServices, errorServices };
};

const getTopServiceBookings = async (params: ExportServicesParams) => {
  const { data: dataServiceBookings, error: errorServiceBookings } =
    await supabase.rpc('total_statistic_count_service', {
      start_date: dayjs(params.start_date).format('YYYY-MM-DD'),
      end_date: dayjs(params.end_date).format('YYYY-MM-DD'),
    });
  return { dataServiceBookings, errorServiceBookings };
};

export { getTopServices, getTopServiceBookings };
