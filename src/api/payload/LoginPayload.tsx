export class LoginPayload {
  username: string;
  password: string;

  constructor(username: string, password: string) {
    this.username = username.trim();
    this.password = password.trim();
  }
}
