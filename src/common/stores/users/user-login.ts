import { create } from 'zustand';

type State = {
  userLogin: any;
};

type Action = {
  setUserLogin: (user: State['userLogin']) => void;
};

const useUserStore = create<State & Action>((set) => ({
  userLogin: [],
  setUserLogin: (user) => set(() => ({ userLogin: user })),
}));

function useFetchZaloUser() {
  let userLogin = useUserStore((state) => state.userLogin);
  let setUserLogin = useUserStore((state) => state.setUserLogin);
  return { userLogin, setUserLogin };
}

export default useFetchZaloUser;
