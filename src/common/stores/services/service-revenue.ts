import { create } from 'zustand';

type State = {
  servicesRevenue: any;
  sumServiceRevenue: number;
  sumServiceCustomerPaid: number;
  sumServiceDebit: number;
  sumServiceTotalBookings: number;
};

type Action = {
  setServicesRevenue: (service: State['servicesRevenue']) => void;
  setSumServiceRevenue: (service: State['sumServiceRevenue']) => void;
  setSumServiceCustomerPaid: (service: State['sumServiceCustomerPaid']) => void;
  setSumServiceDebit: (service: State['sumServiceDebit']) => void;
  setSumServiceTotalBookings: (
    service: State['sumServiceTotalBookings']
  ) => void;
};

const useServiceStore = create<State & Action>((set) => ({
  servicesRevenue: [],
  sumServiceRevenue: 0,
  sumServiceCustomerPaid: 0,
  sumServiceDebit: 0,
  sumServiceTotalBookings: 0,

  setSumServiceRevenue: (service: number) =>
    set(() => ({ sumServiceRevenue: service })),
  setServicesRevenue: (service) => set(() => ({ servicesRevenue: service })),

  setSumServiceCustomerPaid: (service) =>
    set(() => ({ sumServiceCustomerPaid: service })),
  setSumServiceDebit: (service) => set(() => ({ sumServiceDebit: service })),
  setSumServiceTotalBookings: (service) =>
    set(() => ({ sumServiceTotalBookings: service })),
}));

function useFetchServicesRevenue() {
  let servicesRevenue = useServiceStore((state) => state.servicesRevenue);
  let setServicesRevenue = useServiceStore((state) => state.setServicesRevenue);

  let sumServiceRevenue = useServiceStore((state) => state.sumServiceRevenue);
  let setSumServiceRevenue = useServiceStore(
    (state) => state.setSumServiceRevenue
  );

  let setSumServiceCustomerPaid = useServiceStore(
    (state) => state.setSumServiceCustomerPaid
  );
  let sumServiceCustomerPaid = useServiceStore(
    (state) => state.sumServiceCustomerPaid
  );

  let setSumServiceDebit = useServiceStore((state) => state.setSumServiceDebit);
  let sumServiceDebit = useServiceStore((state) => state.sumServiceDebit);

  let setSumServiceTotalBookings = useServiceStore(
    (state) => state.setSumServiceTotalBookings
  );
  let sumServiceTotalBookings = useServiceStore(
    (state) => state.sumServiceTotalBookings
  );

  return {
    servicesRevenue,
    setServicesRevenue,
    sumServiceRevenue,
    setSumServiceRevenue,
    sumServiceCustomerPaid,
    setSumServiceCustomerPaid,
    sumServiceDebit,
    setSumServiceDebit,
    sumServiceTotalBookings,
    setSumServiceTotalBookings,
  };
}

export default useFetchServicesRevenue;
