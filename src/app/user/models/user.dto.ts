import { Role } from "./roles.dto";

export interface User {
  id: string;
  username: string;
  mail: string;
  password: string;
  role: Role;
  token?: string;
}
export class User implements User {
  constructor(
    public id: string,
    public username: string,
    public mail: string,
    public password: string,
    public role: Role
  ) {}
}
