import { ExportParams } from 'services/rpc/clinic-revenue';
import { create } from 'zustand';

type State = {
  dateFilter: ExportParams;
};

type Action = {
  setDateFilter: (_clinic: State['dateFilter']) => void;
};

const useCustomerStore = create<State & Action>((set) => ({
  dateFilter: {
    start_date: '',
    end_date: '',
  },
  setDateFilter: (_clinic) => set(() => ({ dateFilter: _clinic })),
}));

function useDateFilter() {
  let dateFilter = useCustomerStore((state) => state.dateFilter);
  let setDateFilter = useCustomerStore((state) => state.setDateFilter);
  return { dateFilter, setDateFilter };
}

export default useDateFilter;
