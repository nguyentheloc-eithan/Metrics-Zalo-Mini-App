import { create } from "zustand";

type State = {
    clinicBookings: any;
};

type Action = {
    setClinicBookings: (_clinic: State["clinicBookings"]) => void;
};

const useClinicStore = create<State & Action>((set) => ({
    clinicBookings: [],
    setClinicBookings: (_clinic) => set(() => ({ clinicBookings: _clinic })),
}));

function useFetchClinicBookings() {
    let clinicBookings = useClinicStore((state) => state.clinicBookings);
    let setClinicBookings = useClinicStore((state) => state.setClinicBookings);
    return { clinicBookings, setClinicBookings };
}

export default useFetchClinicBookings;
