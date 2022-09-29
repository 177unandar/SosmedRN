import {Feed} from '../../models/Feed';

export const ACTION_LOAD_FEEDS = 'LOAD_FEEDS';
export const ACTION_LOAD_MORE_FEEDS = 'LOAD_MORE_FEEDS';

export type FeedState = {
  feeds: Feed[];
  nextPage: number | null;
};

export type FeedAction = {
  type: string;
  feeds: Feed[];
};

export type FeedDispatch = (args: FeedAction) => FeedAction;
