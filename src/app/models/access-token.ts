import { Role } from "./role";

export type AccessToken = {
    exp: number;
    userId: string;
    userName: string;
    userRealName: string;
    roles?: Role[];
  }