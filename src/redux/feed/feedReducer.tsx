import {getFeeds} from '../../api/feedApi';
import {
  ACTION_LOAD_FEEDS,
  ACTION_LOAD_MORE_FEEDS,
  FeedAction,
  FeedState,
} from './types.feed';

const initialState: FeedState = {
  feeds: [],
  nextPage: null,
};

const feedReducer = async (
  state: FeedState = initialState,
  action: FeedAction,
): Promise<FeedState> => {
  switch (action.type) {
    case ACTION_LOAD_FEEDS:
      let response = await getFeeds(1);
      return {
        feeds: response.data.rows,
        nextPage: response.data.nextPage,
      };
    case ACTION_LOAD_MORE_FEEDS:
      if (state.nextPage != null) {
        let responseLoadMore = await getFeeds(state.nextPage);
        return {
          feeds: state.feeds.concat(responseLoadMore.data.rows),
          nextPage: responseLoadMore.data.nextPage,
        };
      }
  }
  return state;
};
