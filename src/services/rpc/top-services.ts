import { supabase } from 'services/supabse';

interface ExportServicesParams {
  start_date: string;
  end_date: string;
}

const getTopServices = async (params: ExportServicesParams) => {
  const rpcParams = {
    start_date: params.start_date,
    end_date: params.end_date,
  };
  const { data: dataServices, error: errorServices } = await supabase.rpc(
    'total_statistic_count_service',
    rpcParams
  );
  return { dataServices, errorServices };
};

export { getTopServices };
export type { ExportServicesParams };
