import moment from 'moment';

export class User {
  username: string;
  fullname: string;
  created_at: Date;

  constructor(
    username: string,
    fullname: string,
    created_at: Date | undefined = undefined,
  ) {
    this.username = username.trim().toLowerCase();
    this.fullname = fullname.trim();
    this.created_at = created_at!! ? created_at : moment().toDate();
  }
}
