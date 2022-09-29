import {Feed} from '../../models/Feed';
import {ACTION_LOAD_FEEDS, FeedAction, FeedDispatch} from './types.feed';

export const loadFeeds = (feeds: Feed[]) => {
  const action: FeedAction = {
    type: ACTION_LOAD_FEEDS,
    feeds: feeds,
  };
  return dispatchFeedAction(action);
};

export const dispatchFeedAction = (action: FeedAction) => {
  return (dispatch: FeedDispatch) => {
    setTimeout(() => {
      dispatch(action);
    }, 500);
  };
};
