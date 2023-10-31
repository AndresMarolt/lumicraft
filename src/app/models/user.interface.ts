export interface User {
  username: string;
  email: string;
  password?: string;
  first_name: string;
  last_name: string;
  avatar?: string;
  address: string;
  city: string;
  country: string;
  phone?: string;
  date_of_birth?: Date;
}
