import { supabase } from "services/supabse";

interface ExportParams {
    start_date: string;
    end_date: string;
}

const getStaffStatistics = async (params: ExportParams) => {
    const { data: allStaffStatistics, error: errorAllStaffStatistics } =
        await supabase.rpc("total_statistic_staff", {
            start_date: params.start_date,
            end_date: params.end_date,
        });

    return { allStaffStatistics, errorAllStaffStatistics };
};

const getStaffAttendance = async (params: ExportParams) => {
    const { data: allStaffAttendance, error: errorAllStaffAttendance } =
        await supabase.rpc("total_statistic_staff_attendance", {
            start_date: params.start_date,
            end_date: params.end_date,
        });

    return { allStaffAttendance, errorAllStaffAttendance };
};

export { getStaffStatistics, getStaffAttendance };
