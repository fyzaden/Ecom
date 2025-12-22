export type UserRole = 'Admin' | 'Customer';

export interface AppUser {
  id: string;
  email: string;
  role: UserRole;
}
