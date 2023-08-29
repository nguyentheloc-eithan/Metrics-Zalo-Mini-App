import { create } from "zustand";

type State = {
    topTenServices: any;
};

type Action = {
    setTopTenServices: (_clinic: State["topTenServices"]) => void;
};

const useTopTenStore = create<State & Action>((set) => ({
    topTenServices: [],
    setTopTenServices: (_clinic) => set(() => ({ topTenServices: _clinic })),
}));

function useFetchTopTenServices() {
    let topTenServices = useTopTenStore((state) => state.topTenServices);
    let setTopTenServices = useTopTenStore((state) => state.setTopTenServices);
    return { topTenServices, setTopTenServices };
}

export default useFetchTopTenServices;
