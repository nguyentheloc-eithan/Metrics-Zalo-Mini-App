interface ICustomer {
  clinic_name?: string;
  customer_avatar?: string;
  customer_name: string;
  customer_paid: number;
  debit: number;
  revenue: number;
}

interface ICustomerZalo {
  id: string;
  name: string;
  avatar: string;
  zalo_id: string;
  phone: string;
}
export type { ICustomer, ICustomerZalo };
