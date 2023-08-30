import { ICustomerZalo } from "common/types/customer";
import { create } from "zustand";

type State = {
    zalo_customers: ICustomerZalo[];
};

type Action = {
    setZaloCustomers: (customerZalo: State["zalo_customers"]) => void;
};

const useCustomerStore = create<State & Action>((set) => ({
    zalo_customers: [],
    setZaloCustomers: (customerZalo) =>
        set(() => ({ zalo_customers: customerZalo })),
}));

function useFetchZaloCustomers() {
    let zaloCustomers = useCustomerStore((state) => state.zalo_customers);
    let setZaloCustomers = useCustomerStore((state) => state.setZaloCustomers);
    return { zaloCustomers, setZaloCustomers };
}

export default useFetchZaloCustomers;
