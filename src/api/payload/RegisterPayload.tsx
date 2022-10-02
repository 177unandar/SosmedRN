export class RegisterPayload {
  username: string;
  fullname: string;
  password: string;

  constructor(username: string, fullname: string, password: string) {
    this.username = username.trim();
    this.fullname = fullname.trim();
    this.password = password.trim();
  }
}
