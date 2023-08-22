import { supabase } from 'services/supabse';

interface ExportCategoriesParams {
  start_date: string;
  end_date: string;
}

const getTopCategories = async (params: ExportCategoriesParams) => {
  const rpcParams = {
    start_date: params.start_date,
    end_date: params.end_date,
  };
  const { data: dataCategories, error: errorCategories } = await supabase.rpc(
    'total_statistic_count_category',
    rpcParams
  );

  return { dataCategories, errorCategories };
};

export { getTopCategories };
export type { ExportCategoriesParams };
