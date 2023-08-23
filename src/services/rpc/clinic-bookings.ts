// total_statistic_booking_clinic;
// total_statistic_order_clinic;
import { supabase } from 'services/supabse';

interface ExportParams {
  start_date: string;
  end_date: string;
}

const getClinicBookings = async (params: ExportParams) => {
  const rpcParams = {
    start_date: params.start_date,
    end_date: params.end_date,
  };
  const { data: dataClinicBookings, error: errorClinicBookings } =
    await supabase.rpc('total_statistic_booking_clinic', rpcParams);

  return { dataClinicBookings, errorClinicBookings };
};

export { getClinicBookings };
