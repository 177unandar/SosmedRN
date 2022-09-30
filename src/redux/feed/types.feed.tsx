import { Feed } from '../../models/Feed';
import { Pagination } from '../../models/Pagination';

export const ACTION_LOAD_FEEDS = 'LOAD_FEEDS';

export type FeedState = {
  feeds: Feed[];
  pagination: Pagination | null;
};

export type FeedAction = {
  type: string;
  page: number;
};

export type FeedDispatch = (args: FeedAction) => FeedAction;
