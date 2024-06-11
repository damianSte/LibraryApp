export type LoginRequest = {
  email: string;
  password: string;
};

export type AuthResponse = {
  token: string;
  refreshToken: String;
  user: UserDetails;
};

export type UserDetails = {
  id: string;
  name: string;
  email: string;
  username: string;
  role: Role;
};

export type RegisterRequest = {
  name: string;
  email: string;
  username: string;
  password: string;
};

export type LogoutRequest = {
  refreshToken: string;
  token: string;
};

export type Role = 'ADMIN' | 'READER';
