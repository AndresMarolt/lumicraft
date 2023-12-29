export interface User {
  id?: number;
  username: string;
  email: string;
  password?: string;
  first_name: string;
  last_name: string;
  address: string | null;
  city: string | null;
  country: string | null;
  phone?: string | null;
  date_of_birth?: Date | null;
}
