export interface UserDetail {
  id: string;
  fullName: string;
  email: string;
  roles: string[];
  phoneNumber: string;
  phoneNumberConfirmed: true;
  password?: string;
  passwordConfirmed?: string;
}
