import { Request } from "express";

export enum Role {
  Teacher = "TEACHER",
  Student = "STUDENT",
}

export type ILoginRequest = {
  email: string;
  password: string;
};

export type IRegisterRequest = ILoginRequest & {
  full_name: string;
  username: string;
  confirm_password: string;
  role: Role;
};

export type IJWTPayload = {
  id: number;
  email: string;
};

export interface AuthRequest extends Request {
  userId?: string;
}
