export interface User {
  token?(token: any): unknown;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  role?: string
}
