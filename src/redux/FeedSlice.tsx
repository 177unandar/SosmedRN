import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {BaseResponse} from '../api/response/BaseResponse';
import {Feed} from '../models/Feed';
import {PaginationResponse} from '../api/response/PaginationResponse';
import {FeedState} from './redux.types';

const initialState: FeedState = {
  feeds: [],
  pagination: null,
  isRefreshing: true,
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    updateFeeds: (
      state,
      action: PayloadAction<BaseResponse<PaginationResponse<Feed>>>,
    ) => {
      let response = action.payload;
      if (response.success) {
        if (response.data.pagination.currentPage > 1) {
          state.feeds = state.feeds.concat(response.data.rows);
        } else {
          state.feeds = response.data.rows;
        }
        state.pagination = response.data.pagination;
        state.isRefreshing = false;
      }
    },
    setRefreshing: (state, action: PayloadAction<boolean>) => {
      state.isRefreshing = action.payload;
    },
  },
});
