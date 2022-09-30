import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getFeeds } from "../../api/feedApi";
import { BaseResponse } from "../../models/BaseResponse";
import { Feed } from "../../models/Feed";
import { PaginationResponse } from "../../models/PaginationResponse";
import { FeedState, FeedAction } from "./types.feed";


const initialState: FeedState = {
    feeds: [],
    pagination: null,
};

export const feedSlice = createSlice(
    {
        name: 'feed',
        initialState,
        reducers: {
            updateFeeds: (state, action: PayloadAction<BaseResponse<PaginationResponse<Feed>>>) => {
                console.log('loadFeeds', state, action)
                let response = action.payload;
                if (response.status == "success") {
                    if (response.data.pagination.currentPage > 1)
                        state.feeds = state.feeds.concat(response.data.rows)
                    else
                        state.feeds = response.data.rows
                    state.pagination = response.data.pagination
                }
            },
        }
    }
);