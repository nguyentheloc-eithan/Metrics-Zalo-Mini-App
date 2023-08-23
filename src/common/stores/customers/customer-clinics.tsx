import { ICustomer } from 'common/types/customer';
import { create } from 'zustand';

type State = {
  clinicCustomers: any;
};

type Action = {
  setClinicCustomers: (_clinic: State['clinicCustomers']) => void;
};

const useCustomerStore = create<State & Action>((set) => ({
  clinicCustomers: [],
  setClinicCustomers: (_clinic) => set(() => ({ clinicCustomers: _clinic })),
}));

function useFetchClinicCustomers() {
  let clinicCustomers = useCustomerStore((state) => state.clinicCustomers);
  let setClinicCustomers = useCustomerStore(
    (state) => state.setClinicCustomers
  );
  return { clinicCustomers, setClinicCustomers };
}

export default useFetchClinicCustomers;
