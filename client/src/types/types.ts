export type ILogin = {
  email: string;
  password: string;
};

export type IRegister = {
  email: string;
  password: string;
  confirm_password: string;
  username: string;
  full_name: string;
};

export type IUserData = {
  email: string;
  isAuthenticated: boolean;
  role: string;
  username: string;
  full_name: string;
  exp: number;
  id: number;
};
