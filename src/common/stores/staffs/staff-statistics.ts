import { create } from 'zustand';

type State = {
  allStaffStatistics: any;
};

type Action = {
  setAllStaffStatistics: (_clinic: State['allStaffStatistics']) => void;
};

const useStaffsStore = create<State & Action>((set) => ({
  allStaffStatistics: [],
  setAllStaffStatistics: (_clinic) =>
    set(() => ({ allStaffStatistics: _clinic })),
}));

function useFetchStaffStatistics() {
  let allStaffStatistics = useStaffsStore((state) => state.allStaffStatistics);
  let setAllStaffStatistics = useStaffsStore(
    (state) => state.setAllStaffStatistics
  );
  return { allStaffStatistics, setAllStaffStatistics };
}

export default useFetchStaffStatistics;
