// getTopServiceBookings;
import { create } from 'zustand';

type State = {
  topServiceBookings: any;
};

type Action = {
  setTopServiceBookings: (_clinic: State['topServiceBookings']) => void;
};

const useTopTenStore = create<State & Action>((set) => ({
  topServiceBookings: [],
  setTopServiceBookings: (_clinic) =>
    set(() => ({ topServiceBookings: _clinic })),
}));

function useFetchTopServiceBookings() {
  let topServiceBookings = useTopTenStore((state) => state.topServiceBookings);
  let setTopServiceBookings = useTopTenStore(
    (state) => state.setTopServiceBookings
  );
  return { topServiceBookings, setTopServiceBookings };
}

export default useFetchTopServiceBookings;
