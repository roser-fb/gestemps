export interface User {
    username: string;
    password: string;
}
export class User implements User {
    constructor(
      public username: string,
      public password: string
    ) {}
  }