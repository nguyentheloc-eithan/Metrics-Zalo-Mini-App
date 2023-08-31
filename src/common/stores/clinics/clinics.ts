import { IClinicSelect } from "common/types/clinic";
import { create } from "zustand";

type State = {
    allClinicSelects: IClinicSelect[];
};

type Action = {
    setAllClinicSelects: (_clinic: State["allClinicSelects"]) => void;
};

const useClinicStore = create<State & Action>((set) => ({
    allClinicSelects: [],
    setAllClinicSelects: (_clinic) =>
        set(() => ({ allClinicSelects: _clinic })),
}));

function useFetchClinicSelects() {
    let allClinicSelects = useClinicStore((state) => state.allClinicSelects);
    let setAllClinicSelects = useClinicStore(
        (state) => state.setAllClinicSelects,
    );
    return { allClinicSelects, setAllClinicSelects };
}

export default useFetchClinicSelects;
