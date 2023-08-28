import { ExportParams } from 'services/rpc/clinic-revenue';
import { temp } from 'utils/date-params-default';
import { create } from 'zustand';

type State = {
  dateFilter: ExportParams;
};

type Action = {
  setDateFilter: (_clinic: State['dateFilter']) => void;
};

const useCustomerStore = create<State & Action>((set) => ({
  dateFilter: {
    start_date: temp.start_date,
    end_date: temp.end_date,
  },
  setDateFilter: (_clinic) => set(() => ({ dateFilter: _clinic })),
}));

function useDateFilter() {
  let dateFilter = useCustomerStore((state) => state.dateFilter);
  let setDateFilter = useCustomerStore((state) => state.setDateFilter);
  return { dateFilter, setDateFilter };
}

export default useDateFilter;
