export interface AuthResponse {
  token: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  address?: string;
  city?: string;
  province?: string;
  zipCode?: number;
  date_of_birth?: Date;
  phone?: string;
}
