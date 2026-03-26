export interface CreateUser {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  age: number;
  bio: string;
}
export interface UserData {
  id: string;
  name: string;
  email: string;
  age: number;
  bio: string;
}
