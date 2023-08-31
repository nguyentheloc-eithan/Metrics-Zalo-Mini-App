import { create } from "zustand";

type State = {
    isShow: boolean;
    toggleShow: (isShow: boolean) => void;
};

const useBottomNavigation = create<State>((set) => ({
    isShow: true,
    toggleShow: (isShow: boolean) => set({ isShow }),
}));

export default useBottomNavigation;
