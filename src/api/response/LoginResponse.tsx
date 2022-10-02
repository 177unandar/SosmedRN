import {User} from '../../models/User';

export interface LoginResponse {
  token: string;
  user: User;
}
