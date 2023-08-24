import { ICustomer } from 'common/types/customer';
import { create } from 'zustand';

type State = {
  customers: any;
};

type Action = {
  setCustomers: (_clinic: State['customers']) => void;
};

const useCustomerStore = create<State & Action>((set) => ({
  customers: [],
  setCustomers: (_clinic) => set(() => ({ customers: _clinic })),
}));

function useFetchCustomers() {
  let customers = useCustomerStore((state) => state.customers);
  let setCustomers = useCustomerStore((state) => state.setCustomers);
  return { customers, setCustomers };
}

export default useFetchCustomers;
