import {Feed} from '../models/Feed';
import {Pagination} from '../models/Pagination';
import {User} from '../models/User';

export type FeedState = {
  feeds: Feed[];
  pagination: Pagination | null;
  isRefreshing: boolean;
};

export type AccountState = {
  user: User | null;
  isRegistering: boolean;
};

export type SnackbarState = {
  type: number;
  message: string;
};
