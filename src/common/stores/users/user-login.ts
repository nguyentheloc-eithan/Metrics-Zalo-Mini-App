import { IUser } from "common/types/user";
import { create } from "zustand";

type State = {
    userLogin: any;
};

type Action = {
    setUserLogin: (user: State["userLogin"]) => void;
};

const useUserStore = create<State & Action>((set) => ({
    userLogin: {
        id: "",
        name: "",
        image: "",
        department: "",
        email: "",
        job: "",
        date_start: "",
        date_of_birth: "",
        phone: "",
        address: "",
    },
    setUserLogin: (user) => set(() => ({ userLogin: user })),
}));

function useFetchZaloUser() {
    let userLogin = useUserStore((state) => state.userLogin);
    let setUserLogin = useUserStore((state) => state.setUserLogin);
    return { userLogin, setUserLogin };
}

export default useFetchZaloUser;
