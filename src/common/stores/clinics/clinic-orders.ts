import { IClinic } from 'common/types/clinic';
import { create } from 'zustand';

type State = {
  clinicOrders: any;
};

type Action = {
  setClinicOrders: (_clinic: State['clinicOrders']) => void;
};

const useClinicStore = create<State & Action>((set) => ({
  clinicOrders: [],
  setClinicOrders: (_clinic) => set(() => ({ clinicOrders: _clinic })),
}));

function useFetchClinicOrders() {
  let clinicOrders = useClinicStore((state) => state.clinicOrders);
  let setClinicOrders = useClinicStore((state) => state.setClinicOrders);
  return { clinicOrders, setClinicOrders };
}

export default useFetchClinicOrders;
