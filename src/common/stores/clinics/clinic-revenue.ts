import { IClinic } from "common/types/clinic";
import { create } from "zustand";

type State = {
    clinics: IClinic[];
};

type Action = {
    setClinics: (_clinic: State["clinics"]) => void;
};

const useClinicStore = create<State & Action>((set) => ({
    clinics: [],
    setClinics: (_clinic) => set(() => ({ clinics: _clinic })),
}));

function useFetchClinic() {
    let clinics = useClinicStore((state) => state.clinics);
    let setClinics = useClinicStore((state) => state.setClinics);
    return { clinics, setClinics };
}

export default useFetchClinic;
