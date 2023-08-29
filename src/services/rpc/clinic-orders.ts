// total_statistic_order_clinic;
import { supabase } from "services/supabse";

interface ExportParams {
    start_date: string;
    end_date: string;
}

const getClinicOrders = async (params: ExportParams) => {
    const rpcParams = {
        start_date: params.start_date,
        end_date: params.end_date,
    };
    const { data: dataClinicOrders, error: errorClinicOrders } =
        await supabase.rpc("total_statistic_order_clinic", rpcParams);

    return { dataClinicOrders, errorClinicOrders };
};

export { getClinicOrders };
