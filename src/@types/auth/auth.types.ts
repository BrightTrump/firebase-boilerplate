export interface CreateUser {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
  bio: string;
}
export interface UserData {
  id: string;
  name: string;
  email: string;
  age?: number;
  bio: string;
  address?: string;
}

export interface LoginRequestBody {
  username: string;
  email: string;
  password: string;
  rememberMe: boolean;
}
