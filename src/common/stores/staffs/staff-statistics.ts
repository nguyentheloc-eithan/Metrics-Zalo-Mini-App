import { create } from 'zustand';

type State = {
  allStaffStatistics: any;
  allStaffAttendances: any;
};

type Action = {
  setAllStaffStatistics: (staff: State['allStaffStatistics']) => void;
  setAllStaffAttendances: (staff: State['allStaffAttendances']) => void;
};

const useStaffsStore = create<State & Action>((set) => ({
  allStaffStatistics: [],
  allStaffAttendances: [],
  setAllStaffStatistics: (staff) => set(() => ({ allStaffStatistics: staff })),
  setAllStaffAttendances: (staff) =>
    set(() => ({ allStaffAttendances: staff })),
}));

function useFetchStaffStatistics() {
  let allStaffStatistics = useStaffsStore((state) => state.allStaffStatistics);
  let allStaffAttendances = useStaffsStore(
    (state) => state.allStaffAttendances
  );
  let setAllStaffStatistics = useStaffsStore(
    (state) => state.setAllStaffStatistics
  );
  let setAllStaffAttendances = useStaffsStore(
    (state) => state.setAllStaffAttendances
  );
  return {
    allStaffStatistics,
    setAllStaffStatistics,
    allStaffAttendances,
    setAllStaffAttendances,
  };
}

export default useFetchStaffStatistics;
