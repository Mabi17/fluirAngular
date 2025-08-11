export interface UserDetail {
  id: string;
  fullName: string;
  email: string;
  roles: string[];
  phoneNumber: string;
  phoneNumberConfirmed: string;
  password?: string;
  passwordConfirmed?: string;
}
