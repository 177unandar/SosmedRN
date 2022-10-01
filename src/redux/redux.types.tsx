import {Feed} from '../models/Feed';
import {Pagination} from '../models/Pagination';

export type FeedState = {
  feeds: Feed[];
  pagination: Pagination | null;
  isRefreshing: boolean;
};
