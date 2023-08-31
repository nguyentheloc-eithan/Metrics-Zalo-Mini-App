interface IClinic {
    clinic_address: string;
    clinic_avatar: string;
    clinic_name: string;
    customer_paid: number;
    debit: number;
    revenue: number;
}

interface IClinicSelect {
    label: string;
    value: any;
}

export type { IClinic, IClinicSelect };
