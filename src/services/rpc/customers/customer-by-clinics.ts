// total_statistic_booking_clinic;
// total_statistic_order_clinic;
import { supabase } from 'services/supabse';

interface ExportParams {
  start_date: string;
  end_date: string;
}

const getCustomerByClinic = async (params: ExportParams) => {
  const rpcParams = {
    start_date: params.start_date,
    end_date: params.end_date,
  };
  const { data: dataCustomerByClinic, error: errorCustomerByClinic } =
    await supabase.rpc('total_statistic_user_clinic', rpcParams);

  return { dataCustomerByClinic, errorCustomerByClinic };
};

const getCountUserPhone = async () => {
  const { data: allUserHasPhone, error: errorAllUserHasPhone } =
    await supabase.rpc('count_users_phone');
  return { allUserHasPhone, errorAllUserHasPhone };
};

export { getCustomerByClinic, getCountUserPhone };
