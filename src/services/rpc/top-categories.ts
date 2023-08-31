import dayjs from "dayjs";
import { supabase } from "services/supabase";

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
        "total_statistic_category",
        {
            start_date: dayjs(params.start_date).format("YYYY-MM-DD"),
            end_date: dayjs(params.end_date).format("YYYY-MM-DD"),

            sort_by: "revenue",
        },
    );

    return { dataCategories, errorCategories };
};

export { getTopCategories };
export type { ExportCategoriesParams };
