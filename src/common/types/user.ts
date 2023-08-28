interface IBase {
  id: string;
}

interface IUser extends IBase {
  name: string;
  image: string;
  department: string;
  email: string;
  job: string;
  date_start: string;
  date_of_birth: string;
  phone: string;
  address: string;
}
export type { IUser };
