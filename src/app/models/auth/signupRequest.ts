export interface SignupRequest {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  date_of_birth: Date;
  email: string;
  address: string;
  city: string;
  country: string;
  phone?: string;
}
