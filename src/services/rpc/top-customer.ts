// total_statistic_top_paid
import { supabase } from "services/supabase";

interface ExportParams {
    start_date: string;
    end_date: string;
}

const getTopCustomer = async (params: ExportParams) => {
    const rpcParams = {
        start_date: params.start_date,
        end_date: params.end_date,
    };
    const { data: dataCustomer, error: errorCustomer } = await supabase.rpc(
        "total_statistic_top_paid",
        rpcParams,
    );

    return { dataCustomer, errorCustomer };
};

export { getTopCustomer };
