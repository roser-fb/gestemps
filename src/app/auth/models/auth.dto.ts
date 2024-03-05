export interface Auth {
  username: string;
  password: string;
  token?: string;
}
export class Auth implements Auth {
  constructor(public username: string, public password: string) {}
}
